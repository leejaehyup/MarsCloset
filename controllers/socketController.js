const portSerial = require("../serial");
const clothes = require("../models").dcloset;
portSerial.serial();

var connections = {};
exports.socketTag = (ws, req) => {
  var timer;
  var sokcetId = Math.random();
  connections[sokcetId] = sokcetId;
  let data = portSerial.serialData;
  ws.on("message", async function(msg) {
    timer = setInterval(async function() {
      data = portSerial.serialData;
      try {
        let clotheData = await clothes.findOne({
          where: {rfid_number: data}
        });
        if (clotheData) {
          data = "RFID Tag duplicate";
        }
        ws.send(JSON.stringify(data)); //값 보내기
      } catch (err) {
        ws.close();
      }
    }, 1000);
  });
  ws.on("close", function(msg) {
    clearInterval(timer);
    delete connections[sokcetId];
    //ws.close();
    console.log("upload tag socket close");
  });
};

exports.socket = (ws, req) => {
  var timer;
  var sokcetId = Math.random();
  connections[sokcetId] = sokcetId;
  let data = portSerial.serialData;
  ws.on("message", async function(msg) {
    timer = setInterval(async function() {
      data = portSerial.serialData;
      let state = false;
      if (data != null) {
        let clotheData = await clothes.findAll({
          where: {rfid_number: data}
        });
        if (!clotheData) {
          state = true;
        }
        if (state == false) {
          let recData = await clothes.findOne({
            where: {rfid_number: data, status: 1}
          });
          if (recData) {
            console.log("delete clothe");
            await clothes.update({status: 0}, {where: {rfid_number: data}});
          } else {
            console.log("insert clothe");
            await clothes.update({status: 1}, {where: {rfid_number: data}});
          }
        }
      }
      let clothesAll = await clothes.findAll({where: {status: 1}});
      try {
        ws.send(JSON.stringify(clothesAll));
      } catch (err) {
        ws.close();
      }
    }, 2000);
  });

  ws.on("close", function(msg) {
    clearInterval(timer);
    delete connections[sokcetId];
    console.log("closet socket close");
  });

  /*
    ws.on("close", function() {
      console.log("The connection was closed!");
    });
    */
};

/*
data = portSerial.serialData;
      
      if (data != null) {
        //console.log(data);
        let state = true;
        for (let i = 0; i < tagNumber.length; i++) {
          if (tagNumber[i] == data) {
            state = false; //안나옴
            break;
          } else state = true; //옷 나옴
        }
        try {
          let clotheInfo = await clothes.findOne({
            where: { rfid_number: data }
          });
          //console.log(clotheInfo);
          if (!clotheInfo) {
            info = false;
            console.log("info false");
          }
        } catch (err) {
          console.log(err);
        }
        if (state == true) {
          tagNumber.unshift(data);
          try {
            await clothes.update(
              { status: 1 },
              { where: { rfid_number: data } }
            );
            console.log("insert clothes");
          } catch (err) {
            console.log(err);
          }
        } else {
          tagNumber.splice(tagNumber.indexOf(data), 1);
          try {
            let clotheData = await clothes.findOne({
              where: { rfid_number: data }
            });
            await clothes.update(
              { status: 0 },
              { where: { rfid_number: clotheData.rfid_number } }
            );
            console.log("delete clothes");
            //await clothes.destroy({ where: { tag: clotheData.tag } });
          } catch (err) {
            console.log(err);
          }
        }
      }
      let dataBaseData;
      let clothesAll;
      try {
        clothesAll = await clothes.findAll({ where: { status: 1 } });
        dataBaseData = clothesAll;
      } catch (err) {
        console.log(err);
      }
      for (let i = 0; i < clothesAll.length; i++) {
        tagNumber[i] = clothesAll[i].rfid_number;
        imageNumber[i] = clothesAll[i].cloImg;
      }
      try {
        ws.send(JSON.stringify(dataBaseData));
      } catch (err) {
        ws.close();
      }
      */
