#!/usr/bin/env python3.8
import os
import time

# 
# helpers
# 
def ask_user_select_item(items):
    for index, item in enumerate(items):
        print(f"{index + 1}. {item}")
    while True:
        try:
            choice = int(input("Please select an item by entering its number: "))
            if 1 <= choice <= len(items):
                return items[choice - 1]
            else:
                print("Invalid choice. Please try again.")
        except ValueError:
            print("Invalid input. Please enter a number.")

# this function probably makes no sense out of context
def _increment_joint_value(each_diff, running_value, target_value):
    if each_diff == 0:
        pass
    if each_diff > 0:
        running_value += 1
        if running_value > target_value:
            running_value = target_value
    else:
        running_value -= 1
        if running_value < target_value:
            running_value = target_value
    
    return running_value
# 
# 
# Setup the serial port
# 
# 
class SurvivorBuddy:
    """
    Example:
        survivor_bud = SurvivorBuddy()
        survivor_bud.set_joints(
            # NOTE: - "pitch" is a motion like nodding your head "yes"
            #       - "yaw" is a motion like nodding your head "no"
            #       - "roll" is motion like tilting your head to one side in confusion/questioning
            neck_pitch=90, # 90 is neutral
            neck_yaw=90,
            head_roll=90,
            head_pitch=90,
            speed=40, # out of 100
        )
    """
    neck_pitch_min = 35;neck_pitch_max = 150; # bigger = more forwards
    neck_yaw_min   = 20;neck_yaw_max   = 160; # smaller = MY left, survivor buddy's right
    head_roll_min  = 0 ;head_roll_max  = 180; # bigger = counterclockwise from MY persepctive 
    head_pitch_min = 30;head_pitch_max = 120; # bigger= down
    
    # phone pass: 3112
    def __init__(
        self,
        port_address=None,
        baud_rate=115200,
        windows_default_address="COM4",
        linux_default_address="/dev/ttyUSB0",
        mac_default_address=None, # mac auto-detects name
        inital_positions=[90,90,90,90],
        logging=False,
        include_legacy_survivor_buddy_support=True,
    ):
        import threading
        import serial
        connection_path = ""
        if port_address != None:
            connection_path = port_address
        else:
            import platform
            is_windows_os = platform.system().lower() == 'nt'
            is_mac_os = platform.system().lower() == 'darwin'
            if is_windows_os:
                # note: might need to try different COM ports
                connection_path = windows_default_address
            elif is_mac_os:
                # List all files in the directory
                usb_serial_paths =  [ f"/dev/{file_name}" for file_name in os.listdir('/dev') if file_name.startswith("tty.usbserial-") ]
                if len(usb_serial_paths) == 0:
                    raise Exception(f'''[SurvivorBuddy Controller] I don't see any available USB connections (e.g. nothing matches /dev/tty.usbserial-XXXX)''')
                if len(usb_serial_paths) == 1:
                    connection_path = usb_serial_paths[0]
                else:
                    if mac_default_address in usb_serial_paths:
                        connection_path = mac_default_address
                    else:
                        print("Which USB connection do you think it is?")
                        print("(Note: you can have this auto-default)")
                        print("(just add SurvivorBuddy(mac_default_address=/dev/somethin'))")
                        connection_path = ask_user_select_item(usb_serial_paths)
            else:
                connection_path = linux_default_address
        
        self.connection_path = connection_path
        self.positions = inital_positions
        initial_delay_time = 0.004 # seconds
        self.scheduled_actions = [
            # move to initial positions
            (initial_delay_time, inital_positions)
        ]
        
        self.connection = serial.Serial(connection_path, baud_rate)
        
        # thread is only needed for move_joint_slowly (otherwise the sleep() in the thread would slow everything else down)
        self.still_running = False
        def thread_function():
            while self.still_running:
                while self.connection.in_waiting:
                    response = self.connection.readline()
                    if logging:
                        print(response.decode('utf-8'))
                
                # This little section is only needed to handle survivor buddy arduino code that
                # 1. expects a "1" at the start
                # 2. randomly, despite what the code says, will reset itself and expect a 1 again
                # as long as it has a \n, sending the 1 every time shouldn't have adverse affects (the arduino code ignores emtpy/incomplete lines)
                if include_legacy_survivor_buddy_support:
                    self.connection.write(b"1\n")
                    while self.connection.in_waiting:
                        response = self.connection.readline()
                        if logging:
                            print(response.decode('utf-8'))
                
                if len(self.scheduled_actions) > 1:
                    action, positions = self.scheduled_actions.pop(0)
                    neck_pitch, neck_yaw, head_roll, head_pitch = positions
                    neck_pitch  = f"{int(neck_pitch)}".rjust(3, "0")
                    neck_yaw    = f"{int(neck_yaw)}".rjust(3, "0")
                    head_roll   = f"{int(head_roll)}".rjust(3, "0")
                    head_pitch  = f"{int(head_pitch)}".rjust(3, "0")
                    self.connection.write(bytes(f"""{neck_pitch}{neck_yaw}{head_roll}{head_pitch}\n""", "utf-8"))
                    self.positions = positions
                    # without this sleep, even 1000 scheduled actions get executed more or less instantly
                    time.sleep(wait_time)
        
        self.thread = threading.Thread(target=thread_function)
        self.thread.start()
    
    def __del__(self):
        self.still_running = False
        self.thread.join()
    
    def set_joints(self, neck_pitch, neck_yaw, head_roll, head_pitch, speed=40):
        """
            neck_pitch: leaning forward/back, bigger = more forwards
            neck_yaw: left and right swivel, smaller = more to OUR left, survivor buddy's right
            head_roll: top of the head goes to the left, bottom of the head goes to the right, bigger = counterclockwise from MY persepctive 
            head_pitch: nodding head up down, bigger = down
            speed: 1 to 100
        """
        # NOTE: survivor buddy can actually move a bit faster than speed 1, but it very very very much risks damage to the parts from whiplash
        assert speed <= 100 and speed >= 0.1, "Speed of an action must be in the range 0.1 to 100" 
        assert neck_pitch >= SurvivorBuddy.neck_pitch_min and neck_pitch <= SurvivorBuddy.neck_pitch_max 
        assert neck_yaw   >= SurvivorBuddy.neck_yaw_min   and neck_yaw   <= SurvivorBuddy.neck_yaw_max   
        assert head_roll  >= SurvivorBuddy.head_roll_min  and head_roll  <= SurvivorBuddy.head_roll_max  
        assert head_pitch >= SurvivorBuddy.head_pitch_min and head_pitch <= SurvivorBuddy.head_pitch_max
        
        positions = list(self.positions)
        self.scheduled_actions.clear() # interrupt any existing actions
        scheduled_actions = []
        
        diffs = [ (each1 - each2) for each1, each2 in zip((neck_pitch, neck_yaw, head_roll, head_pitch),positions)]
        neck_pitch_diff, neck_yaw_diff, head_roll_diff, head_pitch_diff = diffs
        new_neck_pitch, new_neck_yaw, new_head_roll, new_head_pitch = positions
        
        for _ in range(int(max(abs(each) for each in diffs))):
            # neck_pitch, neck_yaw, head_roll, head_pitch = self.positions = [ base+change for change, base in zip(diffs, self.positions) ]
            new_neck_pitch = _increment_joint_value(neck_pitch_diff, new_neck_pitch, neck_pitch)
            new_neck_yaw   = _increment_joint_value(neck_yaw_diff, new_neck_yaw, neck_yaw)
            new_head_roll  = _increment_joint_value(head_roll_diff, new_head_roll, head_roll)
            new_head_pitch = _increment_joint_value(head_pitch_diff, new_head_pitch, head_pitch)
            
            scheduled_actions.append(
                (
                    new_neck_pitch, new_neck_yaw, new_head_roll, new_head_pitch
                ),
                0.002/(speed/100)
                # ex: speed=100    => 0.002 wait time
                # ex: speed= 50    => 0.004 wait time
                # ex: speed= 0.1   => 2.000 wait time (2 full seconds, times the number of sub-steps; insanely slow)
            )
        
        # add all of them at the end to reduce thread-locking overhead
        self.scheduled_actions += scheduled_actions

import cv2
import numpy as np
import mediapipe as mp
import time
import serial
import matplotlib.pyplot as plt
from datetime import datetime

survivor_buddy = SurvivorBuddy(
    baud_rate=115200,
    windows_default_address="COM4",
    linux_default_address="/dev/ttyUSB0",
    mac_default_address="/dev/tty.usbserial-2140",
)

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

while cap.isOpened():
    print("Camera was opened.")
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
        focal_length = 1*img_w

        cam_matrix = np.array([[focal_length, 0, img_h/2],
                              [0, focal_length, img_w/2],
                              [0, 0, 1]])

        # The distortion parameters
        dist_matrix = np.zeros((4, 1), dtype=np.float64)

        # Solve PnP
        success, rot_vec, trans_vec = cv2.solvePnP(
            face_3d, face_2d, cam_matrix, dist_matrix)

        # Get rotational matrix
        rmat, jac = cv2.Rodrigues(rot_vec)

        # Get angles
        angles, mtxR, mtxQ, Qx, Qy, Qz = cv2.RQDecomp3x3(rmat)

        # Get the y rotation degrees
        if (starting_x == 0):
            starting_x = angles[0] * 360
        if (starting_y == 0):
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
            nose_3d, rot_vec, trans_vec, cam_matrix, dist_matrix)
        mouth_3d_projection, jacobian = cv2.projectPoints(
            mouth_3d, rot_vec, trans_vec, cam_matrix, dist_matrix)

        p1 = (int(nose_2d[0]), int(nose_2d[1]))
        p2 = (int(nose_2d[0] + y*10), int(nose_2d[1] - x * 10))

        # Draw line going outwards from mouth
        m1 = (int(mouth_2d[0]), int(mouth_2d[1]))
        m2 = (int(mouth_2d[0] + y*10), int(mouth_2d[1] - x * 10))

        # Get points from nose to mouth for head rotation calculation
        nose2Mouth1 = (int(nose_2d[0]), int(nose_2d[1]))
        nose2Mouth2 = (int(mouth_2d[0]), int(mouth_2d[1]))

        # Actually calculate and map the rotation angles sent to Arduino
        # Once calculated and mapped, take running average to smooth data
        headRotationAngle = int(np.arctan2(
            nose2Mouth2[1] - nose2Mouth1[1], nose2Mouth2[0] - nose2Mouth1[0]) * 180 / np.pi)
        headRotationAngle = int(map_range(headRotationAngle, 0, 180, 180, 0))
        headRotationAngle = int(process_running_average(
            headRotationRunning, headRotationAngle))
        headTiltAngle = int(map_range(x, -20, 20, 120, 30))
        headTiltAngle = int(process_running_average(
            headTiltRunning, headTiltAngle))
        torsoRotAngle = int(map_range(y, -20, 20, 50, 180))
        torsoRotAngle = int(process_running_average(
            torsoRotRunning, torsoRotAngle))

        # Then construct output string for Arduino
        survivor_buddy.set_joints(
            neck_pitch=90, # 90 is neutral
            neck_yaw=torsoRotAngle,
            head_roll=headRotationAngle,
            head_pitch=headTiltAngle,
            speed=60, # out of 100
        )
        print("HeadRot: ", headRotationAngle)
        print("TorsoRot: ", torsoRotAngle)
        print("x: ", x, " y: ", y)
        # print(nose_3d)

        cv2.line(image, p1, p2, (255, 0, 0), 3)
        cv2.line(image, m1, m2, (0, 255, 0), 3)
        cv2.line(image, nose2Mouth1, nose2Mouth2, (0, 0, 255), 3)

        # Add the text on the image
        cv2.putText(image, text, (20, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 255, 0), 2)
        cv2.putText(image, "x: " + str(np.round(x, 2)), (500, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
        cv2.putText(image, "y: " + str(np.round(y, 2)), (500, 100),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
        cv2.putText(image, "z: " + str(np.round(z, 2)), (500, 150),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
        cv2.putText(image, "HeadRot: " + str(headRotationAngle),
                    (500, 200), cv2.FONT_HERSHEY_SIMPLEX, .5, (0, 0, 255), 2)
        cv2.putText(image, "HeadTilt: " + str(headTiltAngle),
                    (500, 250), cv2.FONT_HERSHEY_SIMPLEX, .5, (0, 0, 255), 2)
        cv2.putText(image, "TorsoRot: " + str(torsoRotAngle),
                    (500, 300), cv2.FONT_HERSHEY_SIMPLEX, .5, (0, 0, 255), 2)

        end = time.time()
        totalTime = end - start

        fps = 1 / totalTime
        print("FPS: ", fps)
        cv2.putText(image, "FPS: " + str(np.round(fps, 2)),
                    (500, 350), cv2.FONT_HERSHEY_SIMPLEX, .5, (0, 0, 255), 2)

        mp_drawing.draw_landmarks(image=image,
                                  landmark_list=face_landmarks,
                                  connections=mp_face_mesh.FACEMESH_CONTOURS,
                                  landmark_drawing_spec=drawing_spec,
                                  connection_drawing_spec=drawing_spec)

    cv2.imshow("Head pose estimation: ", image)

    if (cv2.waitKey(5) & 0xFF == 27):
        break

cap.release()
cv2.destroyAllWindows()
