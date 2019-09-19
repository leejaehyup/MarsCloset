window.URL = window.URL || window.webkitURL;

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

const timer = document.getElementById("timer");
var video = document.querySelector("video");
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var localMediaStream = null;
const imgButton = document.querySelector("#imgButton");

console.log($("#timer").val());

function submit(data) {
  var form = document.createElement("form");
  form.setAttribute("charset", "UTF-8");
  form.setAttribute("method", "Post"); //Post 방식
  form.setAttribute("action", "/uploadTag"); //요청 보낼 주소
  var hiddenField = document.createElement("input");
  hiddenField.setAttribute("type", "hidden");
  hiddenField.setAttribute("name", "image");
  hiddenField.setAttribute("value", data);
  form.appendChild(hiddenField);
  document.body.appendChild(form);
  form.submit();
}
function snap() {
  let timer = $("#timer").val() * 1000;
  console.log(timer);
  setTimeout(function() {
    snapshot();
  }, timer);
  imgButton.removeEventListener("click");
}
function snapshot() {
  if (localMediaStream) {
    ctx.drawImage(video, 0, 0, 400, 300);
    //var img = document.querySelector('img');
    var snapshots = document.querySelector("#snapshots");
    var img = document.createElement("img");
    img.src = canvas.toDataURL("image/webp");
    img.width = 400;
    img.height = 300;
    submit(canvas.toDataURL());
    /*
    $.ajax({
      type: "post",
      url: "./uploadImage",
      dataType: "json",
      data: { data: canvas.toDataURL() },
      success: function(data) {
        console.log(data.data);
        submit(data.data);
      }
    });
    */
    //snapshots.appendChild(img);
    snapshots.insertBefore(img, snapshots.firstChild);
  }
}

imgButton.addEventListener("click", snap, false);

var onFailSoHard = function(e) {
  console.log("Rejected!", e);
};

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(function(stream) {
    // Older browsers may not have srcObject
    if ("srcObject" in video) {
      video.srcObject = stream;
      localMediaStream = stream;
    } else {
      // Avoid using this in new browsers, as it is going away.
      video.src = window.URL.createObjectURL(stream);
    }
    video.onloadedmetadata = function(e) {
      video.play();
    };
  })
  .catch(function(err) {
    console.log(err.name + ": " + err.message);
  });
/*
navigator.getUserMedia(
  { video: true },
  function(stream) {
    video.srcObject = stream;
    localMediaStream = stream;
  },
  (video.onloadedmetadata = function(e) {
    video.play();
  })
);
/*
function init() {
  setInterval(function() {
    $.ajax({
      type: "get",
      url: "./test",
      dataType: "json",
      success: function(data) {
        console.log(data);
      }
    });
  }, 10000);
}
init();
*/
