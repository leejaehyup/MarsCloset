var ws = new WebSocket("ws://localhost:4000/uploadTag/");
const tagNumber = document.getElementById("TagNumber");
const saveDBbutton = document.getElementById("saveDBbutton");
const image = $("#image").attr("src");
//var ws = new WebSocket("wss://082e0902.ngrok.io/");
const serialYes = document.getElementById("serialYes");

setInterval(() => {
  $.ajax({
    url: "/uploadTag",
    method: "GET",
    dataType: "json"
  })
    .done(function(data) {
      let recData = data;
      tagNumber.innerHTML = recData;
    })
    .fail(function(status) {
      console.log(status.responseText);
      tagNumber.innerHTML = status.responseText;
    });
}, 1000);

// 연결이 수립되면 서버에 메시지를 전송한다
ws.onopen = function(event) {
  ws.send("Client message: Hi!");
};

// 서버로 부터 메시지를 수신한다
ws.onmessage = function(event) {
  let recData = JSON.parse(event.data);
  console.log("Server message: ", recData);
  if (recData != null) {
    tagNumber.innerHTML = recData;
  }
};
ws.onclose = function(event) {
  console.log(event);
  console.log("client socket close");
};

// error event handler
ws.onerror = function(event) {
  console.log("Server error message: ", event.data);
};

saveDBbutton.addEventListener("click", saveDB);

function saveDB() {
  saveDBbutton.removeEventListener("click", saveDB);
  const tagNum = $("#TagNumber").text();
  if (!tagNum) {
    swal("RFID TAG를 찍어주세요!");
    saveDBbutton.addEventListener("click", saveDB);
    return;
  }
  var form = document.createElement("form");
  form.setAttribute("charset", "UTF-8");
  form.setAttribute("method", "Post"); //Post 방식
  form.setAttribute("action", "/kakaoImg"); //요청 보낼 주소
  var hiddenField = document.createElement("input");
  hiddenField.setAttribute("type", "hidden");
  hiddenField.setAttribute("name", "image");
  hiddenField.setAttribute("value", image);
  form.appendChild(hiddenField);
  var hiddenField1 = document.createElement("input");
  hiddenField1.setAttribute("type", "hidden");
  hiddenField1.setAttribute("name", "tag");
  hiddenField1.setAttribute("value", tagNum);
  form.appendChild(hiddenField1);
  document.body.appendChild(form);
  form.submit();
  saveDBbutton.removeEventListener("click", saveDB);
}
