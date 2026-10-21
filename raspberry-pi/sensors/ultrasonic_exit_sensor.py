#Libraries
import RPi.GPIO as GPIO
import time

#GPIO Mode (BOARD)
GPIO.setmode(GPIO.BOARD)

#set GPIO Pins
GPIO_TRIGGER = 33
GPIO_ECHO = 31

GPIO.setwarnings(False)
#set GPIO direction (IN / OUT)
GPIO.setup(GPIO_TRIGGER, GPIO.OUT)
GPIO.setup(GPIO_ECHO, GPIO.IN)


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
            dist = distance() #get distance
            if dist>=15.0 and dist <=20.0: #if distance between 40 and 60
                print("object detected")
                break
            time.sleep(1)

    except KeyboardInterrupt:
        GPIO.cleanup()
