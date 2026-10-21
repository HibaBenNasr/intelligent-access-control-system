const WebSocketServer = require('ws');

// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8080 })

// Creating connection using websocket
wss.on('connection', function connection(ws) {
  console.log('A new client Connected!');

  ws.on('message', function incoming(message) {
// Afficher message du client
    console.log('received: %s', message);
    var msg ='';
    msg=msg.concat(message);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocketServer.OPEN) {
   client.send(msg);
      }
    });
  });
});
console.log("The WebSocket server is running on port 8080");
