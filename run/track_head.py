#!/usr/bin/env python3.9
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from buddy_controller import SurvivorBuddySerial

import time
import cv2
import numpy as np
import mediapipe as mp
import time
import serial
import matplotlib.pyplot as plt
from datetime import datetime

survivor_buddy = SurvivorBuddySerial(
    baud_rate=115200,
    windows_default_address="COM4",
    linux_default_address="/dev/ttyUSB0",
    mac_default_address="/dev/tty.usbserial-2140",
)


# Analog to the arduino map function, maps a value from one range to another
def map_range(value, low1, high1, low2, high2):
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1)


def triple_digit_int_to_string(num):
    if num < 10:
        return "00" + str(num)
    elif num < 100:
        return "0" + str(num)
    else:
        return str(num)


def process_running_average(running_vals: list, new_val: int):
    running_vals.append(new_val)
    if len(running_vals) > 10:
        running_vals.pop(0)
    return sum(running_vals) / len(running_vals)


# grabbing the face mesh ml solution from mediapipe
mp_face_mesh = mp.solutions.face_mesh

# setting face mesh detection parameters
face_mesh = mp_face_mesh.FaceMesh(
    min_detection_confidence=0.5, min_tracking_confidence=0.5
)

# useful for visualizing landmarks later on
mp_drawing = mp.solutions.drawing_utils
drawing_spec = mp_drawing.DrawingSpec(thickness=1, circle_radius=1)

# starting the video capture with opencv
cap = cv2.VideoCapture(0)
# cap.set(cv2.CAP_PROP_FPS, 60)
# cap.set(cv2.CAP_PROP_BUFFERSIZE, 60)

starting_x = 0
starting_y = 0

headRotationRunning: list[int] = []
headTiltRunning: list[int] = []
torsoRotRunning: list[int] = []

while cap.isOpened():
    sucess, image = cap.read()
    if not sucess:
        print("Error: Could not read frame from the camera.")
        break

    start = time.time()

    # Flip the image horizontally for a selfie view display
    # Also converting color space from BGR to RGB
    image = cv2.cvtColor(cv2.flip(image, 1), cv2.COLOR_BGR2RGB)

    # To improve performance
    image.flags.writeable = False

    # Get the result
    results = face_mesh.process(image)

    # To improve performance
    image.flags.writeable = True

    # Convert the color space from RGB to BGR
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    img_h, img_w, img_c = image.shape
    face_3d = []
    face_2d = []

    if results.multi_face_landmarks:
        for face_landmarks in results.multi_face_landmarks:
            for idx, lm in enumerate(face_landmarks.landmark):
                if idx == 1:
                    nose_2d = (lm.x * img_w, lm.y * img_h)
                    nose_3d = (lm.x * img_w, lm.y * img_h, lm.z * 3000)

                if idx == 0:
                    mouth_2d = (lm.x * img_w, lm.y * img_h)
                    mouth_3d = (lm.x * img_w, lm.y * img_h, lm.z * 3000)

                x, y = int(lm.x * img_w), int(lm.y * img_h)

                # Get the 2D coordinates
                face_2d.append([x, y])

                # Get the 3D coordinates
                face_3d.append([x, y, lm.z])

        # Convert it to numpy array
        face_2d = np.array(face_2d, dtype=np.float64)
        face_3d = np.array(face_3d, dtype=np.float64)

        mouth_2d = np.array(mouth_2d, dtype=np.float64)
        mouth_3d = np.array(mouth_3d, dtype=np.float64)

        # The camera matrix
        focal_length = 1 * img_w

        cam_matrix = np.array(
            [[focal_length, 0, img_h / 2], [0, focal_length, img_w / 2], [0, 0, 1]]
        )

        # The distortion parameters
        dist_matrix = np.zeros((4, 1), dtype=np.float64)

        # Solve PnP
        success, rot_vec, trans_vec = cv2.solvePnP(
            face_3d, face_2d, cam_matrix, dist_matrix
        )

        # Get rotational matrix
        rmat, jac = cv2.Rodrigues(rot_vec)

        # Get angles
        angles, mtxR, mtxQ, Qx, Qy, Qz = cv2.RQDecomp3x3(rmat)

        # Get the y rotation degrees
        if starting_x == 0:
            starting_x = angles[0] * 360
        if starting_y == 0:
            starting_y = angles[1] * 360

        x = (angles[0] * 360) - starting_x
        y = (angles[1] * 360) - starting_y
        z = angles[2] * 360

        # See where the user's head tilting
        if y < -10:
            text = "Looking left"
        elif y > 10:
            text = "Looking right"
        elif x < -10:
            text = "Looking down"
        elif x > 10:
            text = "Looking up"
        else:
            text = "Forward"

        # Display the nose direction and mouth direction
        nose_3d_projection, jacobian = cv2.projectPoints(
            nose_3d, rot_vec, trans_vec, cam_matrix, dist_matrix
        )
        mouth_3d_projection, jacobian = cv2.projectPoints(
            mouth_3d, rot_vec, trans_vec, cam_matrix, dist_matrix
        )

        p1 = (int(nose_2d[0]), int(nose_2d[1]))
        p2 = (int(nose_2d[0] + y * 10), int(nose_2d[1] - x * 10))

        # Draw line going outwards from mouth
        m1 = (int(mouth_2d[0]), int(mouth_2d[1]))
        m2 = (int(mouth_2d[0] + y * 10), int(mouth_2d[1] - x * 10))

        # Get points from nose to mouth for head rotation calculation
        nose2Mouth1 = (int(nose_2d[0]), int(nose_2d[1]))
        nose2Mouth2 = (int(mouth_2d[0]), int(mouth_2d[1]))

        # Actually calculate and map the rotation angles sent to Arduino
        # Once calculated and mapped, take running average to smooth data
        headRotationAngle = int(
            np.arctan2(nose2Mouth2[1] - nose2Mouth1[1], nose2Mouth2[0] - nose2Mouth1[0])
            * 180
            / np.pi
        )
        headRotationAngle = int(map_range(headRotationAngle, 0, 180, 180, 0))
        headRotationAngle = int(
            process_running_average(headRotationRunning, headRotationAngle)
        )
        headTiltAngle = int(map_range(x, -20, 20, 120, 30))
        headTiltAngle = int(process_running_average(headTiltRunning, headTiltAngle))
        torsoRotAngle = int(map_range(y, -20, 20, 50, 180))
        torsoRotAngle = int(process_running_average(torsoRotRunning, torsoRotAngle))

        # Then construct output string for Arduino
        survivor_buddy.set_joints(
            torso_pitch=90,  # 90 is neutral
            torso_yaw=torsoRotAngle,
            head_roll=headRotationAngle,
            head_pitch=headTiltAngle,
            speed=60,  # out of 100
        )
        # print("HeadRot: ", headRotationAngle)
        # print("TorsoRot: ", torsoRotAngle)
        # print("x: ", x, " y: ", y)
        # print(nose_3d)

        cv2.line(image, p1, p2, (255, 0, 0), 3)
        cv2.line(image, m1, m2, (0, 255, 0), 3)
        cv2.line(image, nose2Mouth1, nose2Mouth2, (0, 0, 255), 3)

        # Add the text on the image
        cv2.putText(image, text, (20, 50), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 255, 0), 2)
        cv2.putText(
            image,
            "x: " + str(np.round(x, 2)),
            (500, 50),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 0, 255),
            2,
        )
        cv2.putText(
            image,
            "y: " + str(np.round(y, 2)),
            (500, 100),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 0, 255),
            2,
        )
        cv2.putText(
            image,
            "z: " + str(np.round(z, 2)),
            (500, 150),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 0, 255),
            2,
        )
        cv2.putText(
            image,
            "HeadRot: " + str(headRotationAngle),
            (500, 200),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.5,
            (0, 0, 255),
            2,
        )
        cv2.putText(
            image,
            "HeadTilt: " + str(headTiltAngle),
            (500, 250),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.5,
            (0, 0, 255),
            2,
        )
        cv2.putText(
            image,
            "TorsoRot: " + str(torsoRotAngle),
            (500, 300),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.5,
            (0, 0, 255),
            2,
        )

        end = time.time()
        totalTime = end - start

        fps = 1 / totalTime
        # print("FPS: ", fps)
        cv2.putText(
            image,
            "FPS: " + str(np.round(fps, 2)),
            (500, 350),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.5,
            (0, 0, 255),
            2,
        )

        mp_drawing.draw_landmarks(
            image=image,
            landmark_list=face_landmarks,
            connections=mp_face_mesh.FACEMESH_CONTOURS,
            landmark_drawing_spec=drawing_spec,
            connection_drawing_spec=drawing_spec,
        )

    cv2.imshow("Head pose estimation: ", image)

    if cv2.waitKey(5) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()