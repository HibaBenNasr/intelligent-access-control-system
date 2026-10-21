# libraries
import time
import RPi.GPIO as GPIO

GPIO.setwarnings(False)
#define pins
GPIO.setmode(GPIO.BOARD)
# Define GPIO signals to use Pins 18,22,24,26 GPIO24,GPIO25,GPIO8,GPIO7
StepPins = [7,11,13,15]
# Set all pins as output
for pin in StepPins:
        GPIO.setup(pin,GPIO.OUT)
        GPIO.output(pin, False)
# Define some settings
WaitTime = 0.005


# Define advanced half-step sequence
StepCount = 8
Seq = []
Seq = [i for i in range(0, StepCount)]
Seq[0] = [1,0,0,0]
Seq[1] = [1,1,0,0]
Seq[2] = [0,1,0,0]
Seq[3] = [0,1,1,0]
Seq[4] = [0,0,1,0]
Seq[5] = [0,0,1,1]
Seq[6] = [0,0,0,1]
Seq[7] = [1,0,0,1]


def steps(nb):
        StepCounter = 0
        for i in range(nb):
                for pin in range(4):
                        xpin = StepPins[pin]
                        if Seq[StepCounter][pin]!=0:
                                GPIO.output(xpin, True)
                        else:
                                GPIO.output(xpin, False)
                StepCounter += 1
        # If we reach the end of the sequence
        # start again
                if (StepCounter==StepCount):
                        StepCounter = 0
                if (StepCounter<0):
                        StepCounter = StepCount-1
                # Wait before moving on
                time.sleep(WaitTime)
# Start main loop
nbStepsPerRev=1024
if __name__ == '__main__' :

    steps(nbStepsPerRev)# turn 1/4 lap
    time.sleep(1)
    print("Stop motor")
    for pin in StepPins:
            GPIO.output(pin, False)
