#!/usr/bin/env python3.9
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from buddy_controller import SurvivorBuddySerial

if __name__ == '__main__':
    print("testing survivor_buddy connection")
    survivor_bud = SurvivorBuddySerial(
        port_address=None,
        baud_rate=115200,
        windows_default_address="COM4",
        linux_default_address="/dev/ttyUSB0",
        mac_default_address=None, # mac auto-detects name
        inital_positions=[90,90,90,90],
        hardware_offset_compensation=[-15, -15, -12, -35],
        logging=False,
        include_legacy_survivor_buddy_support=False,
    )
    # 
    # cli loop 
    #
    survivor_bud.safe_set_joints(*[0,0,0,0], speed=4)
    print(f'''Type q [Enter] to quit''')
    while 1:
        response = input("\nEnter joint positions. Units=degrees. (space or comma separated)\n")
        if response.lower() == 'q' or response.lower() == 'quit' or response.lower() == 'exit':
            break
        
        chunks = [""]
        for each in response:
            is_valid = each == "." or each == "-" or each.isdigit()
            if not is_valid and chunks[-1] != "":
                chunks.append("")
            if is_valid:
                chunks[-1]+=each
        
        if len(chunks[-1]) == 0:
            chunks.pop()
        
        try:
            new_joints = [ int(each) for each in chunks ]
            print(f'''going to {new_joints}''')
            survivor_bud.safe_set_joints(*new_joints, speed=5)
        except Exception as error:
            print(error)
            print()
    
    survivor_bud.__del__()
    print("done")