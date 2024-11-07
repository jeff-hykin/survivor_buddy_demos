import sys
import os
from os.path import isabs, isfile, isdir, join, dirname, basename, exists, splitext
from os import remove, getcwd, makedirs, listdir, rename, rmdir
from shutil import move
import glob
import numpy as np
import random
import math
import time
import cv2

class Position(list):
    @property
    def x(self): return self[0]
    
    @x.setter
    def x(self, value): self[0] = value
    
    @property
    def y(self): return self[1]
    
    @y.setter
    def y(self, value): self[1] = value
    
    @property
    def z(self): return self[2]
    
    @z.setter
    def z(self, value): self[2] = value
    
    def __repr__(self):
        if len(self) >= 3:
            return f'(x={self.x},y={self.y},z={self.z})'
        elif len(self) == 2:
            return f'(x={self.x},y={self.y})'
        elif len(self) == 1:
            return f'(x={self.x})'
        else:
            return '[]'

class BoundingBox(list):
    """
    x_top_left, y_top_left, width, height format
    """
    
    @classmethod
    def from_points(cls, *points, top_left=None, bottom_right=None,):
        max_x = -float('Inf')
        max_y = -float('Inf')
        min_x = float('Inf')
        min_y = float('Inf')
        for each in [*points, top_left, bottom_right]:
            if type(each) != type(None):
                if max_x < each[0]:
                    max_x = each[0]
                if max_y < each[1]:
                    max_y = each[1]
                if min_x > each[0]:
                    min_x = each[0]
                if min_y > each[1]:
                    min_y = each[1]
        top_left = Position(min_x, min_y)
        bottom_right = Position(max_x, max_y)
        width  = abs(top_left.x - bottom_right.x)
        height = abs(top_left.y - bottom_right.y)
        return BoundingBox([ top_left.x, top_left.y, width, height ])
    
    @classmethod
    def from_array(cls, max_x, max_y, min_x, min_y):
        width  = abs(max_x - min_x)
        height = abs(max_y - min_y)
        return BoundingBox([ min_x, min_y, width, height ])
    
    @property
    def x_top_left(self): return self[0]
    
    @x_top_left.setter
    def x_top_left(self, value): self[0] = value
    
    @property
    def y_top_left(self): return self[1]
    
    @y_top_left.setter
    def y_top_left(self, value): self[1] = value
    
    @property
    def x_bottom_right(self): return self.x_top_left + self.width
    
    @property
    def y_bottom_right(self): return self.y_top_left + self.height
    
    @property
    def width(self): return self[2]
    
    @width.setter
    def width(self, value): self[2] = value
    
    @property
    def height(self): return self[3]
    
    @height.setter
    def height(self, value): self[3] = value
    
    @property
    def center(self):
        return Position([
            self.x_top_left + (self.width / 2),
            self.y_top_left + (self.height / 2),
        ])
    
    @property
    def area(self):
        return self.width * self.height
    
    def contains(self, point):
        point = Position(point)
        return (
            self.x_top_left     < point.x and
            self.x_bottom_right > point.x and
            self.y_top_left     < point.y and
            self.y_bottom_right > point.y
        )
        
    def __repr__(self):
        return f'[x_top_left={f"{self.x_top_left:.2f}".rjust(5)},y_top_left={f"{self.y_top_left:.2f}".rjust(5)},width={f"{self.width:.2f}".rjust(5)},height={f"{self.height:.2f}".rjust(5)}]'

def bgr_to_rgb(image):  
    # converting BGR to RGB
    return cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# Download models from: https://github.com/deepinsight/insightface/issues/1896#issuecomment-1023867304
insightface_app = None
def init_insightface_app_if_needed():
    import insightface
    from insightface.app import FaceAnalysis
    global insightface_app
    if insightface_app == None:
        insightface_app = FaceAnalysis(name="buffalo_s", providers=['TensorrtExecutionProvider', 'CUDAExecutionProvider', 'CPUExecutionProvider'])
        insightface_app.prepare(ctx_id=1, det_size=(640,640))

def get_faces(image):
    init_insightface_app_if_needed()
    return [ Face(each_face, image) for each_face in insightface_app.get(image) ]

class Face:
    def __init__(self, insight_face, image):
        init_insightface_app_if_needed()
        self.image = image
        self.insight = insight_face
        # arrive in DEGREES
        pitch, yaw, roll = insight_face.pose
        self.nod    = pitch  # negative is down
        self.swivel = yaw    # left of the image is negative
        self.tilt   = roll   # if the person's face was a clock, then its negative when counter-clockwise
        self.width  = abs(self.insight.bbox[2] - self.insight.bbox[0])
        self.height = abs(self.insight.bbox[3] - self.insight.bbox[1])
    
    def __repr__(self):
        relative_x, relative_y = self.relative_position
        return f"Face(age={self.insight.age},nod={self.nod:.2f},swivel={self.swivel:.2f},tilt={self.tilt:.2f},height={self.height:.0f},width={self.width:.0f},relative_x={relative_x*100:.0f},relative_y={relative_y*100:.0f},)"
    
    @property
    def bounding_box(self):
        leftmost_x = self.insight.bbox[0]
        topmost_y = self.insight.bbox[1]
        return BoundingBox([ leftmost_x, topmost_y, self.width, self.height ])
    
    @property
    def relative_position(self):
        """
            Example:
                relative_x, relative_y = face.relative_position
                # the position is returned as a proportion, from -1 to 1
                # an x value of -1 means all the way to the right side of the picture
                # an y value of -1 means all the way to the top
        """
        face_x, face_y = self.bounding_box.center
        height, width, *channels = self.image.shape
        x_center = width/2
        y_center = height/2
        relative_x = (face_x - x_center)/x_center
        relative_y = (face_y - y_center)/y_center
        return relative_x, relative_y