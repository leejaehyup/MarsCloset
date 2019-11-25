var ws = new WebSocket("ws://localhost:4000/closet/");
//var ws = new WebSocket("wss://082e0902.ngrok.io/");
const closeSocket = document.getElementById("closeSocket");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
btn1.addEventListener("click", click1);
btn2.addEventListener("click", click2);
btn3.addEventListener("click", click3);
btn4.addEventListener("click", click4);
btn5.addEventListener("click", click5);

function click1() {
  ws.onmessage = function(event) {
    let recData = JSON.parse(event.data);
    console.log("Server message: ", recData);
    $("#serialImage1").html("");
    for (let i = 0; i < recData.length; i++) {
      imageCreate(recData[i].cloImg, "#serialImage1");
    }
  };
  ws.onclose = function(event) {
    console.log("client socket close");
  };
}
function click2() {
  ws.onmessage = function(event) {
    let recData = JSON.parse(event.data);
    console.log("Server message: ", recData);
    $("#serialImage2").html("");

    for (let i = 0; i < recData.length; i++) {
      if (recData[i].category == "top") {
        imageCreate(recData[i].cloImg, "#serialImage2");
      }
    }
  };
  ws.onclose = function(event) {
    console.log("client socket close");
  };
}
function click3() {
  ws.onmessage = function(event) {
    let recData = JSON.parse(event.data);
    console.log("Server message: ", recData);
    $("#serialImage3").html("");

    for (let i = 0; i < recData.length; i++) {
      if (recData[i].category == "bottoms") {
        imageCreate(recData[i].cloImg, "#serialImage3");
      }
    }
  };
  ws.onclose = function(event) {
    console.log("client socket close");
  };
}
function click4() {
  console.log("4");
}
function click5() {
  console.log("5");
}
// 연결이 수립되면 서버에 메시지를 전송한다
ws.onopen = function(event) {
  ws.send("Client message: Hi!");
};
ws.onmessage = function(event) {
  let recData = JSON.parse(event.data);
  console.log("Server message: ", recData);
  $("#serialImage1").html("");
  for (let i = 0; i < recData.length; i++) {
    imageCreate(recData[i].cloImg, "#serialImage1");
  }
};
ws.onclose = function(event) {
  console.log(event);
  console.log("client socket close");
};
// 서버로 부터 메시지를 수신한다

// error event handler
ws.onerror = function(event) {
  console.log("Server error message: ", event.data);
};

function imageCreate(data, name) {
  $(name).append("<img id='" + data + "' src= " + data + " class='gallery'>");

  /*
  $("#serialImage").append(
    "<img id='" + data + "' src= upload/python/" + data + ".png>"
  );
  */
}

setInterval(function() {
  const image = document.querySelectorAll("img");
  for (let i = 0; i < image.length; i++) {
    image[i].addEventListener("click", redirectImage);
  }
}, 1000);

function redirectImage(e) {
  console.log(e.target.currentSrc);
  const url = e.target.currentSrc;
  window.location.href = "http://www.localhost:4000/imageInfo?image=" + url;
}
