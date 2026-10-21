# libraries
import RPi.GPIO as GPIO
import time


GPIO.setwarnings(False)
#define pins
pin=8
GPIO.setmode(GPIO.BOARD)
GPIO.setup(pin, GPIO.IN)


if __name__ == '__main__' :
    detect=False
    while not detect:
        #Read output from PIR motion sensor
        i=GPIO.input(pin)
        if i==1: #if detect
            detect=True
        time.sleep(1)

    print("movement detected")
    GPIO.cleanup() # cleanup all GPIO
