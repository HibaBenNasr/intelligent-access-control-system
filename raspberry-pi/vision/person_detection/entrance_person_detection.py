#Libraries
import RPi.GPIO as GPIO
import time
import cv2
import os
from picamera import PiCamera
from pathlib import Path


# loading the MobileNet SSD model
SCRIPT_DIR = Path(__file__).resolve().parent

classFile = str(SCRIPT_DIR / "coco.names")
configPath = str(SCRIPT_DIR / "ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt")
weightsPath = str(SCRIPT_DIR / "frozen_inference_graph.pb")



#GPIO Mode (BOARD)
GPIO.setmode(GPIO.BOARD)

#set GPIO Pins
GPIO_TRIGGER = 16
GPIO_ECHO = 18

GPIO.setwarnings(False)
#set GPIO direction (IN / OUT)
GPIO.setup(GPIO_TRIGGER, GPIO.OUT)
GPIO.setup(GPIO_ECHO, GPIO.IN)

camera = PiCamera()

#get distance function
def distance():
    # set Trigger to HIGH
    GPIO.output(GPIO_TRIGGER, True)
    # set Trigger after 0.01ms to LOW
    time.sleep(0.00001)
    GPIO.output(GPIO_TRIGGER, False)
    StartTime = time.time()
    StopTime = time.time()
    # save StartTime
    while GPIO.input(GPIO_ECHO) == 0:
        StartTime = time.time()
    # save time of arrival
    while GPIO.input(GPIO_ECHO) == 1:
        StopTime = time.time()
    # time difference between start and arrival
    TimeElapsed = StopTime - StartTime
    # multiply with the sonic speed (34300 cm/s) and divide by 2, because there and back
    distance = (TimeElapsed * 34300) / 2
    return distance

if __name__ == '__main__':
    try:
        while True:
            dist = distance() # get distance
            #print (dist)
            if dist>=40.0 and dist <=60.0: #if distance between 40 and 60

                #capture image
                camera.start_preview()
                camera.capture('/home/pi/Pictures/img.jpg')
                camera.stop_preview()

                #read image
                img=cv2.imread('/home/pi/Pictures/img.jpg')

                # setting the bounding box
                net = cv2.dnn_DetectionModel(weightsPath, configPath)
                #resizing and extracting dimensions of the frame
                net.setInputSize(320, 320)
                net.setInputScale(1.0 / 127.5)
                net.setInputMean((127.5, 127.5, 127.5))
                net.setInputSwapRB(True)

                #detect objects in the image (with overlay)
                classIds, confs, bbox = net.detect(img, confThreshold=0.5)
                #delete image
                os.remove('/home/pi/Pictures/img.jpg')
                try:
                    #if the class of the object is not defined in the coco ssd classification
                    if(not classIds.any()):
                        print('no')
                    #else if the object detected is person
                    elif((classIds==[1]).any()):
                        print('person')
                        camera.close()
                        break
                except:
                    print('no')
                time.sleep(2)

            time.sleep(1)

    except KeyboardInterrupt:
        print("Measurement stopped by User")
        GPIO.cleanup()
        camera.close()
