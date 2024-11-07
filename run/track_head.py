#!/usr/bin/env python3.9
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from buddy_controller import SurvivorBuddySerial
import math

import time
import cv2
import numpy as np
import mediapipe as mp
import time
import serial
import matplotlib.pyplot as plt
from datetime import datetime
from face_detector import get_faces

survivor_buddy = SurvivorBuddySerial(
    baud_rate=115200,
    windows_default_address="COM4",
    linux_default_address="/dev/ttyUSB0",
    mac_default_address="/dev/tty.usbserial-2140",
    _disable_threading=True,
)

import cv2
import numpy as np
import mediapipe as mp
import time
import serial
import matplotlib.pyplot as plt
from datetime import datetime

# time.sleep(5)

# Analog to the arduino map function, maps a value from one range to another


def map_range(value, low1, high1, low2, high2):
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1)


def tripleDigitInttoString(num):
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

survivor_buddy.connection.write(b"1")
while cap.isOpened():
    print("Camera was opened.")
    if survivor_buddy.connection.in_waiting > 0:
        print(survivor_buddy.connection.readline())
        # pass
    sucess, image = cap.read()
    if not sucess:
        print("Error: Could not read frame from the camera.")
        break

    start = time.time()

    # Flip the image horizontally for a selfie view display
    # Also converting color space from BGR to RGB
    image = cv2.flip(image, 1)
    # image = cv2.cvtColor(cv2.flip(image, 1), cv2.COLOR_BGR2RGB)
    
    # To improve performance
    image.flags.writeable = False
    
    faces = get_faces(image)
    if len(faces) > 0:
        max_height = max([each.height for each in faces])
        for each in faces:
            if each.height == max_height:
                face = each
                survivor_buddy._immediate_dangerous_move(
                    torso_joint=0, # on hardware: larger = more forwards
                    neck_swivel=face.swivel,   # on hardware: smaller = OUR left, survivor buddy's right
                    head_tilt=face.tilt,     # on hardware: bigger = counterclockwise from OUR persepctive 
                    head_nod=face.nod,   # on hardware: bigger= down
                )
                # face.nod
                # face.swivel
                # face.tilt
                # print(face)
    
    cv2.imshow("Head pose estimation: ", image)

    if cv2.waitKey(5) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()