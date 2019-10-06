var today = new Date(); // 오늘 날짜
var date = new Date();
var dateday = new Array();
var ct = new Array();
var jsondata;
var datemonth = new Array();
var regdate = "";

function beforem() {
  //이전 달을 today에 값을 저장
  today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  build(); //만들기
}

function nextm() {
  //다음 달을 today에 저장
  today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  build();
}

function build() {
  var regdate2;
  var nMonth = new Date(today.getFullYear(), today.getMonth(), 1); //현재달의 첫째 날
  var lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); //현재 달의 마지막 날
  var tbcal = document.getElementById("calendar"); // 테이블 달력을 만들 테이블
  var yearmonth = document.getElementById("yearmonth"); //  년도와 월 출력할곳
  yearmonth.innerHTML =
    today.getFullYear() + "년 " + (today.getMonth() + 1) + "월"; //년도와 월 출력

  if (today.getMonth() + 1 == 12) {
    //  눌렀을 때 월이 넘어가는 곳
    before.innerHTML = today.getMonth() + "월";
    next.innerHTML = "1월";
  } else if (today.getMonth() + 1 == 1) {
    //  1월 일때
    before.innerHTML = "12월";
    next.innerHTML = today.getMonth() + 2 + "월";
  } //   12월 일 때
  else {
    before.innerHTML = today.getMonth() + "월";
    next.innerHTML = today.getMonth() + 2 + "월";
  }

  // 남은 테이블 줄 삭제
  while (tbcal.rows.length > 2) {
    tbcal.deleteRow(tbcal.rows.length - 1);
  }
  var row = null;
  row = tbcal.insertRow();
  var cnt = 0;

  // 1일 시작칸 찾기
  for (i = 0; i < nMonth.getDay(); i++) {
    cell = row.insertCell();
    cnt = cnt + 1;
  }

  // 달력 출력
  for (
    i = 1;
    i <= lastDate.getDate();
    i++ // 1일부터 마지막 일까지
  ) {
    cell = row.insertCell();
    cell.innerHTML = i;

    for (var a = 0; a < jsondata.results.length; a++) {
      if (today.getMonth() + 1 == datemonth[a].split("-")[1]) {
        if (i == dateday[a]) {
          cell.innerHTML += "<br><font size=4>" + ct[a];
        }
      }
    }
    cell.align = "left";
    cell.className = "dateNum";
    cell.style.cursor = "pointer";
    cnt = cnt + 1;
    if (cnt % 7 == 1) {
      //일요일 계산
      cell.innerHTML = "<font color=#FF9090>" + i; //일요일에 색
      for (var a = 0; a < jsondata.results.length; a++) {
        if (today.getMonth() + 1 == datemonth[a].split("-")[1]) {
          if (i == dateday[a]) {
            cell.innerHTML += "<br><font size=4>" + ct[a];
          }
        }
      }
    }
    if (cnt % 7 == 0) {
      // 1주일이 7일 이므로 토요일 계산
      cell.innerHTML = "<font color=#7ED5E4>" + i; //토요일에 색
      row = calendar.insertRow(); // 줄 추가
      for (var a = 0; a < jsondata.results.length; a++) {
        if (today.getMonth() + 1 == datemonth[a].split("-")[1]) {
          if (i == dateday[a]) {
            cell.innerHTML += "<br><font size=4>" + ct[a];
          }
        }
      }
    }
    if (
      today.getFullYear() == date.getFullYear() &&
      today.getMonth() == date.getMonth() &&
      i == date.getDate()
    ) {
      cell.bgColor = "#BCF1B1"; //오늘날짜배경색
    }
  }
  for (let i = 2; i < tbcal.rows.length; i++) {
    for (let j = 0; j < tbcal.rows[i].cells.length; j++) {
      tbcal.rows[i].cells[j].addEventListener("click", function(e) {
        document.getElementById("modal").style.display = "block"; //모달창 나오도록 css display 수정
        const day = document.getElementById("dayNum"); //년 월 일 출력(변수명 수정)
        if (e.target.innerHTML.length < 3) {
          regdate2 = e.target.innerHTML;
        } else {
          regdate2 = e.target.innerHTML.split("<")[0];
        }
        console.log("regdate2: " + regdate2);
        day.innerHTML =
          today.getFullYear() +
          "년 " +
          (today.getMonth() + 1) +
          "월 " +
          regdate2 +
          "일";
      });

      document.getElementById("modal_close_btn").onclick = function() {
        document.getElementById("modal").style.display = "none"; //모달창 꺼지도록 css display 수정
      };

      document.getElementById("modal_add_btn").onclick = function() {
        var content = "";
        regdate = "";
        var day = "";
        content = document.getElementById("title01").value;
        regdate =
          String(today.getFullYear()) + "-" + String(today.getMonth() + 1);
        day = String(regdate2);
        $.ajax({
          type: "POST",
          url: "/calenderInsert",
          data: {regdate: regdate, day: day, content: content},
          success: function(data) {
            console.log("성공");
            location.href = "/calenderFind";
          },
          error: function(data) {
            console.log("error");
          }
        });
      };
      document.getElementById("modal_delete_btn").onclick = function() {
        regdate =
          String(today.getFullYear()) + "-" + String(today.getMonth() + 1);
        day = String(regdate2);
        location.href = "/calenderDelete?reg_date=" + regdate + "&day=" + day;
      };
    }
  }
}
