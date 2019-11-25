const kakaoName = document.getElementsByClassName("kakaoName");
const kakaoImage = document.querySelectorAll(".kakaoImage");
const kakaopaths = document.querySelectorAll(".kakaopath");
(function() {
  for (let i = 0; i < kakaoImage.length; i++) {
    kakaoImage[i].addEventListener("click", handleClick);
  }
})();

function handleClick(e) {
  for (let i = 0; i < kakaoImage.length; i++) {
    kakaoImage[i].removeEventListener("click", handleClick);
  }
  let kakaoContainer = e.target.parentNode.id;
  let kakaoTitle = kakaoName[kakaoContainer].innerHTML;
  let kakaopath = kakaopaths[kakaoContainer].innerHTML;
  let tag = document.querySelectorAll(".tag")[kakaoContainer].innerHTML;
  console.log(kakaopath);
  console.log(kakaoTitle);
  var form = document.createElement("form");
  form.setAttribute("charset", "UTF-8");
  form.setAttribute("method", "Post"); //Post 방식
  form.setAttribute("action", "/saveImage"); //요청 보낼 주소
  var hiddenField = document.createElement("input");
  hiddenField.setAttribute("type", "hidden");
  hiddenField.setAttribute("name", "kakaopath");
  hiddenField.setAttribute("value", kakaopath);
  form.appendChild(hiddenField);
  var hiddenField2 = document.createElement("input");
  hiddenField2.setAttribute("type", "hidden");
  hiddenField2.setAttribute("name", "kakaoTitle");
  hiddenField2.setAttribute("value", kakaoTitle);
  form.appendChild(hiddenField2);
  var hiddenField3 = document.createElement("input");
  hiddenField3.setAttribute("type", "hidden");
  hiddenField3.setAttribute("name", "tag");
  hiddenField3.setAttribute("value", tag);
  form.appendChild(hiddenField3);
  document.body.appendChild(form);
  form.submit();
}
