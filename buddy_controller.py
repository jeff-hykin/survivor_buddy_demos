import os
import time
import math
import time

# 
# helpers
# 
logging = True
def clip_value(value, minimum, maximum):
    if value < minimum:
        value = minimum
    if value > maximum:
        value = maximum
    return value

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

class JointPositions(list):
    """
        Note:
            Everything is in degrees
    """
    def __init__(self, *args, **kwargs):
        super().__init__([0,0,0,0])
        while len(self) < 4:
            self.append(0)
            
        for each_key, each_value in kwargs.items():
            setattr(self, each_key, each_value)
        
        for index, each in enumerate(args):
            if index == 0:
                self.torso_joint = each
            elif index == 1:
                self.neck_swivel = each
            elif index == 2:
                self.head_tilt = each
            elif index == 3:
                self.head_nod = each
    
    torso_joint_max = 40 
    torso_joint_min = -40
    
    @property
    def torso_joint(self): return self[0]
    @torso_joint.setter
    def torso_joint(self, value):
        value = clip_value(value, minimum=self.torso_joint_min, maximum=self.torso_joint_max)
        # if logging and value != self[0]:
        #     print(f"   torso_joint: {self[0]:.0f}° => {value:.0f}°")
        self[0] = value
    
    neck_swivel_max = 40 
    neck_swivel_min = -40 
    @property
    def neck_swivel(self): return self[1]
    @neck_swivel.setter
    def neck_swivel(self, value):
        value = clip_value(value, minimum=self.neck_swivel_min, maximum=self.neck_swivel_max)
        # if logging and value != self[1]:
        #     print(f"   neck_swivel: {self[1]:.0f}° => {value:.0f}°")
        self[1] = value
    
    head_tilt_max = 40 
    head_tilt_min = -40
    @property
    def head_tilt(self): return self[2]
    @head_tilt.setter
    def head_tilt(self, value):
        value = clip_value(value, minimum=self.head_tilt_min, maximum=self.head_tilt_max)
        # if logging and value != self[2]:
        #     print(f"   head_tilt: {self[2]:.0f}° => {value:.0f}°")
        self[2] = value
    
    # more negative = face the cieling
    head_nod_max = 40 
    head_nod_min = -25
    @property
    def head_nod(self): return self[3]
    @head_nod.setter
    def head_nod(self, value):
        value = clip_value(value, minimum=self.head_nod_min, maximum=self.head_nod_max)
        # if logging and value != self[3]:
        #     print(f"   head_nod: {self[3]:.0f}° => {value:.0f}°")
        self[3] = value
    
    def __repr__(self):
        return f"[ torso_joint={self.torso_joint:.0f}°, neck_swivel={self.neck_swivel:.0f}°, head_tilt={self.head_tilt:.0f}°, head_nod={self.head_nod:.0f}°,  ]"

# 
# 
# Setup the serial port
# 
# 
class SurvivorBuddySerial:
    """
    Example:
        survivor_bud = SurvivorBuddySerial()
        survivor_bud.set_absolute_joints(
            # NOTE: - "pitch" is a motion like nodding your head "yes"
            #       - "yaw" is a motion like nodding your head "no"
            #       - "roll" is motion like tilting your head to one side in confusion/questioning
            torso_pitch=90, bigger = more forwards
            torso_yaw=90, smaller = OUR left, survivor buddy's right
            head_roll=90, bigger = counterclockwise from OUR persepctive 
            head_pitch=90, bigger= down
            speed=4, # out of 10
        )
    """
    torso_pitch_min = 35;torso_pitch_max = 150; # bigger = more forwards
    torso_yaw_min   = 20;torso_yaw_max   = 160; # smaller = OUR left, survivor buddy's right
    head_roll_min   = 0 ;head_roll_max   = 180; # bigger = counterclockwise from OUR persepctive 
    head_pitch_min  = 30;head_pitch_max  = 120; # bigger= down
    
    movement_limiter = 5 # 5 degrees per movement

    
    # phone pass: 3112
    # phone code: 3112
    def __init__(
        self,
        port_address=None,
        baud_rate=115200,
        windows_default_address="COM4",
        linux_default_address="/dev/ttyUSB0",
        mac_default_address=None, # mac auto-detects name
        inital_positions=[90,90,90,90],
        hardware_offset_compensation=[-15, -15, -12, -35],
        logging=logging,
        include_legacy_survivor_buddy_support=True,
        _disable_threading=False,
    ):
        import threading
        import serial
        
        self._disable_threading = _disable_threading
        self.hardware_offset_compensation = hardware_offset_compensation
        for index,offset in enumerate(hardware_offset_compensation):
            inital_positions[index] -= offset
        
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
            (inital_positions, initial_delay_time, time.time())
        ]
        
        try:
            self.connection = serial.Serial(connection_path, baud_rate)
        except serial.serialutil.SerialException as error:
            import subprocess
            print(f'''trying to give self access to the serial port since I got an error: {error}''')
            subprocess.check_output(['sudo', 'chmod', '777', connection_path ]).decode('utf-8')[0:-1]
            self.connection = serial.Serial(connection_path, baud_rate)
        
        # thread is only needed for move_joint_slowly (otherwise the sleep() in the thread would slow everything else down)
        self.still_running = True
        
        def thread_function():
            while self.still_running:
                while self.connection.in_waiting:
                    response = self.connection.readline()
                    try:
                        # example response: Base: 90, Torso: 75, Rot: 78, Tilt: 66
                        each_joint = response.split(",")
                        if len(each_joint) == 4:
                            self.positions = [ int(each.split(": ")[1]) for each in each_joint ]
                    except Exception as error:
                        pass
                    # if logging:
                    #     print("connection.in_waiting:", response.decode('utf-8').replace("\r\n","\n").replace("\n",""))
                
                # This little section is only needed to handle survivor buddy arduino code that
                # 1. expects a "1" at the start
                # 2. randomly, despite what the code says, will reset itself and expect a 1 again
                # as long as it has a \n, sending the 1 every time shouldn't have adverse affects (the arduino code ignores emtpy/incomplete lines)
                if include_legacy_survivor_buddy_support:
                    self.connection.write(b"1\n")
                    while self.connection.in_waiting:
                        response = self.connection.readline()
                        # if logging:
                        #     if "print" not in response.decode('utf-8') and response != b"1":
                        #         print(response.decode('utf-8').replace("\r\n","\n").replace("\n",""))
                
                if len(self.scheduled_actions) > 1:
                    positions, wait_time, scheduled_time = self.scheduled_actions.pop(0)
                    torso_pitch, torso_yaw, head_roll, head_pitch = positions 
                    torso_pitch = clip_value(torso_pitch, maximum=self.positions[0]+self.movement_limiter, minimum=self.positions[0]-self.movement_limiter)
                    torso_yaw   = clip_value(torso_yaw,   maximum=self.positions[1]+self.movement_limiter, minimum=self.positions[1]-self.movement_limiter)
                    head_roll   = clip_value(head_roll,   maximum=self.positions[2]+self.movement_limiter, minimum=self.positions[2]-self.movement_limiter)
                    head_pitch  = clip_value(head_pitch,  maximum=self.positions[3]+self.movement_limiter, minimum=self.positions[3]-self.movement_limiter)
                    torso_pitch  = f"{int(90)}".rjust(3, "0") # FIXME: DEBUGGING only
                    torso_yaw    = f"{int(torso_yaw)}".rjust(3, "0")
                    head_roll    = f"{int(head_roll)}".rjust(3, "0")
                    head_pitch   = f"{int(head_pitch)}".rjust(3, "0")
                    self.connection.write(bytes(f"""{torso_pitch}{torso_yaw}{head_roll}{head_pitch}\n""", "utf-8"))
                    self.positions = positions
                    # without this sleep, even 1000 scheduled actions get executed more or less instantly
                    delay_amount = scheduled_time-time.time()
                    logging and print(f"executing action: {positions}, {wait_time}, {scheduled_time}, {scheduled_time-time.time()}", flush=True)
                    if delay_amount > 0:
                        time.sleep(delay_amount)
        if not self._disable_threading:
            self.thread = threading.Thread(target=thread_function)
            self.thread.start()
    
    def __del__(self):
        self.still_running = False
        try:
            self.thread.join()
        except Exception as error:
            pass
    
    def _immediate_dangerous_move(
        self, 
        torso_joint=0,
        neck_swivel=0,
        head_tilt=0,
        head_nod=0,
    ):
        """
            joint_positions: list of floats
        """
        joint_positions = JointPositions(
            torso_joint=torso_joint,
            neck_swivel=neck_swivel,
            head_tilt=head_tilt,
            head_nod=head_nod,
        )
        torso_pitch=joint_positions.torso_joint+90  # on hardware: larger = more forwards
        torso_yaw=joint_positions.neck_swivel+90    # on hardware: smaller = OUR left, survivor buddy's right
        head_roll=joint_positions.head_tilt+90      # on hardware: bigger = counterclockwise from OUR persepctive 
        head_pitch=joint_positions.head_nod+90      # on hardware: bigger= down
        
        torso_pitch += self.hardware_offset_compensation[0]
        torso_yaw   += self.hardware_offset_compensation[1]
        head_roll   += self.hardware_offset_compensation[2]
        head_pitch  += self.hardware_offset_compensation[3]
        
        torso_pitch  = f"{int(torso_pitch)}".rjust(3, "0")
        torso_yaw    = f"{int(torso_yaw)}".rjust(3, "0")
        head_roll    = f"{int(head_roll)}".rjust(3, "0")
        head_pitch   = f"{int(head_pitch)}".rjust(3, "0")
        self.connection.write(bytes(f"""{torso_pitch}{torso_yaw}{head_roll}{head_pitch}\n""", "utf-8"))
        self.positions = [torso_pitch, torso_yaw, head_roll, head_pitch]
        
    
    # NOTE: values are from 0 to 180 (degrees)
    def set_absolute_joints(self, torso_pitch, torso_yaw, head_roll, head_pitch, speed=6):
        """
            torso_pitch: leaning forward/back, bigger = more forwards
            torso_yaw: left and right swivel, smaller = more to OUR left, survivor buddy's right
            head_roll: top of the head goes to the left, bottom of the head goes to the right, bigger = counterclockwise from MY persepctive 
            head_pitch: nodding head up down, bigger = down
            speed: 1 to 100
        """
        # NOTE: survivor buddy can actually move a bit faster than speed 1, but it very very very much risks damage to the parts from whiplash
        # logging and print(f'''speed check''')
        assert speed <= 100 and speed >= 0.1, "Speed of an action must be in the range 0.1 to 100" 
        # compensation for hardware 0,0,0,0 not being calibrated
        torso_pitch += self.hardware_offset_compensation[0]
        torso_yaw   += self.hardware_offset_compensation[1]
        head_roll   += self.hardware_offset_compensation[2]
        head_pitch  += self.hardware_offset_compensation[3]
        # logging and print("after compensation:")
        # logging and print("    absolute torso_pitch: ",torso_pitch)
        # logging and print("    absolute torso_yaw: ",torso_yaw)
        # logging and print("    absolute head_roll: ",head_roll)
        # logging and print("    absolute head_pitch: ",head_pitch)
        assert torso_pitch >= SurvivorBuddySerial.torso_pitch_min and torso_pitch <= SurvivorBuddySerial.torso_pitch_max, f"{torso_pitch} torso_pitch >= torso_pitch_min {SurvivorBuddySerial.torso_pitch_min} and torso_pitch <= {SurvivorBuddySerial.torso_pitch_max}" 
        assert torso_yaw   >= SurvivorBuddySerial.torso_yaw_min   and torso_yaw   <= SurvivorBuddySerial.torso_yaw_max,   f"{torso_yaw} torso_yaw   >= torso_yaw_min {SurvivorBuddySerial.torso_yaw_min}   and torso_yaw   <= {SurvivorBuddySerial.torso_yaw_max}" 
        assert head_roll   >= SurvivorBuddySerial.head_roll_min   and head_roll   <= SurvivorBuddySerial.head_roll_max,   f"{head_roll} head_roll   >= head_roll_min {SurvivorBuddySerial.head_roll_min}   and head_roll   <= {SurvivorBuddySerial.head_roll_max}" 
        assert head_pitch  >= SurvivorBuddySerial.head_pitch_min  and head_pitch  <= SurvivorBuddySerial.head_pitch_max,  f"{head_pitch} head_pitch  >= head_pitch_min {SurvivorBuddySerial.head_pitch_min}  and head_pitch  <= {SurvivorBuddySerial.head_pitch_max}" 
        # logging and print(f'''passed check''')
        
        
        positions = list(self.positions)
        self.scheduled_actions.clear() # interrupt any existing actions
        scheduled_actions = []
        
        diffs = [ (each1 - each2) for each1, each2 in zip((torso_pitch, torso_yaw, head_roll, head_pitch),positions)]
        torso_pitch_diff, torso_yaw_diff, head_roll_diff, head_pitch_diff = diffs
        new_torso_pitch, new_torso_yaw, new_head_roll, new_head_pitch = positions
        
        now = time.time()
        for index in range(math.ceil(max(abs(each) for each in diffs))):
            # torso_pitch, torso_yaw, head_roll, head_pitch = self.positions = [ base+change for change, base in zip(diffs, self.positions) ]
            new_torso_pitch = _increment_joint_value(torso_pitch_diff, new_torso_pitch, torso_pitch)
            new_torso_yaw   = _increment_joint_value(torso_yaw_diff, new_torso_yaw, torso_yaw)
            new_head_roll   = _increment_joint_value(head_roll_diff, new_head_roll, head_roll)
            new_head_pitch  = _increment_joint_value(head_pitch_diff, new_head_pitch, head_pitch)
            
            delay = 0.002/(speed/100)
            scheduled_actions.append(
                (
                    (
                        new_torso_pitch, new_torso_yaw, new_head_roll, new_head_pitch
                    ),
                    delay,
                    now + (index+1)*delay,
                    # ex: speed=100    => 0.002 wait time
                    # ex: speed= 50    => 0.004 wait time
                    # ex: speed= 0.1   => 2.000 wait time (2 full seconds, times the number of sub-steps; insanely slow)
                )
            )
        
        # add all of them at the end to reduce thread-locking overhead
        self.scheduled_actions += scheduled_actions
    
    # NOTE: values are from -90 to 90 (degrees)
    def safe_set_joints(
        self,
        torso_joint=0, # on hardware: larger = more forwards
        neck_swivel=0, # on hardware: smaller = OUR left, survivor buddy's right
        head_tilt=0, # on hardware: bigger = counterclockwise from OUR persepctive 
        head_nod=0, # on hardware: bigger= down
        speed=4, # out of 10
    ):
        joint_positions = JointPositions(
            torso_joint=torso_joint,
            neck_swivel=neck_swivel,
            head_tilt=head_tilt,
            head_nod=head_nod,
        )
        self.set_absolute_joints(
            torso_pitch=joint_positions.torso_joint+90, # on hardware: larger = more forwards
            torso_yaw=joint_positions.neck_swivel+90,   # on hardware: smaller = OUR left, survivor buddy's right
            head_roll=joint_positions.head_tilt+90,     # on hardware: bigger = counterclockwise from OUR persepctive 
            head_pitch=joint_positions.head_nod+90,     # on hardware: bigger= down
            speed=speed,
        )
        time.sleep(0.2)