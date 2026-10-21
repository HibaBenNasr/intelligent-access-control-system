from websocket import create_connection
import json
def ws_start():
    ws = create_connection("ws://localhost:8080")
    ws.send(json.dumps({"connected": "done"}))
    #result =  ws.recv()
    ws.close()
def ws_qr_done():
    ws = create_connection("ws://localhost:8080")
    ws.send(json.dumps({"qr_done": "done"}))
    ws.close()
def ws_mask_start():
    ws = create_connection("ws://localhost:8080")
    ws.send(json.dumps({"mask_image": "start"}))
    ws.close()
def ws_mask_done():
    ws = create_connection("ws://localhost:8080")
    ws.send(json.dumps({"done": "done"}))
    ws.close()
