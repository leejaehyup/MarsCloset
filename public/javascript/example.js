//var ws = new WebSocket("ws://localhost:3000");
var ws = new WebSocket("wss://0400f682.ngrok.io/example");
const example = document.getElementById("example");

// 연결이 수립되면 서버에 메시지를 전송한다
ws.onopen = function(event) {
  ws.send("Client message: Hi!");
};

// 서버로 부터 메시지를 수신한다
ws.onmessage = function(event) {
  console.log("Server message: ", event.data);
  example.innerHTML = event.data;
};

// error event handler
ws.onerror = function(event) {
  console.log("Server error message: ", event.data);
};
