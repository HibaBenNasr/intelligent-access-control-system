#Import necessary libraries
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPT_DIR))

from flask import Flask, render_template, Response
import cv2
import json
from websocket import create_connection
import pyzbar.pyzbar as pyzbar
import os
from pytorch_infer import *
from ws import *
#Initialize the Flask app
app = Flask(__name__)

#QR code function
def qr_scanner(frame):
    ch=""
    #decode image
    decodedObjects = pyzbar.decode(frame)

    for obj in decodedObjects:
        ch=str(obj.data)
        ch=ch[2:len(ch)-1]

        try:
            json_object = json.loads(ch)#convert to json
            if json_object["verif_code"]=="722497":#verify the QR code
                cv2.putText(frame, "code valide", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1.7, (0, 255, 0, 0), 2)
                #send to ws server
                ws_qr_done()
                ws_mask_start()
                return True
            else :
                cv2.putText(frame, "code inccorrect", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1.7, (0, 0, 255),2)
                return False
        except ValueError as e :
            cv2.putText(frame, "code inccorrect", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1.7, (0, 0, 255),2)
            return False


def gen_frames():
    cap = cv2.VideoCapture(0)

    i=0#00000000000000000000
    if cap.isOpened():
        cont=0#000000000000
        t=False
        d=False
        f=False
        while True:
            _, frame = cap.read()
            img_raw = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            if not(t):
                t=qr_scanner(frame)
                d=t
                if t==False:
                    cont+=1
                if cont>=300:
                    t=True
                    #break
            if d :
                state=False

                state= inference(img_raw,
                        conf_thresh=0.5,
                        iou_thresh=0.5,
                        target_shape=(360, 360),
                        draw_result=True,
                        show_result=False)
                if state :
                    i+=1
                else:
                    i=0
                if i>=3:
                    state=True
                    cv2.putText(frame, "mask detected", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1.7, (0, 255, 0, 0), 2)
                    ws_mask_done()
                    break
            #cv2.imshow("Frame", frame)
            frame = cv2.imencode('.jpg', frame)[1].tobytes()
            yield (b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            key = cv2.waitKey(1)
            if key == 27:
                break

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    print("start")
    ws_start()
    app.debug = True
    #app.run(host="0.0.0.0")
    app.run(host=os.getenv('IP', '0.0.0.0'),
            port=int(os.getenv('PORT', 4440)))
