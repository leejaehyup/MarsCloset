const closet = require("../models").closet;
const axios = require("axios");
const clothes = require("../models").dcloset;
const temp = require("../models").LeeJaeHyup;

//온습도 함수
exports.arduino = async (req, res) => {
  var temp = req.body.temp;
  var hum = req.body.hum;
  var weight = req.body.weight;
  var closetID = req.body.closetID;
  try {
    console.log(temp);
    console.log(hum);
    console.log(weight);
    console.log(closetID);
    await closet.create({
      closetID: closetID,
      dehumidfyingWeight: hum,
      deodorizationWeight: temp,
      Weight: weight
    });
  } catch (err) {
    console.log(err);
  }
  res.send("suc");
};
//필요없는 함수
exports.wifiLED = async (req, res) => {
  try {
    const data = await axios.get("http://192.168.0.21/LED");
    console.log(data.data.trim());
    res.send(data.data.trim());
  } catch (err) {
    console.log(err);
  }
};

//옷걸이에 rfid를 찍으면 실행되는 함수
exports.wifiTag = async (req, res) => {
  //const data = req.body;
  const data = req.query;
  //console.log(data.RFID, data.Hanger_ID);
  let hangerID = "http://" + data.Hanger_ID;
  let rfid = data.rfid;
  console.log(hangerID, rfid);
  try {
    //rfid 체킹
    let checkingData = await clothes.findOne({
      where: {rfid_number: rfid}
    });
    // hangerID 체킹
    let checkingHangerData = await clothes.findOne({
      where: {hangerID: hangerID}
    });

    if (!checkingData) {
      //rfid 값이 등록되지 않을때
      console.log("등록되지 않은 rfid태그값입니다.");
    } else {
      if (checkingHangerData) {
        //옷걸이에 다른옷이 등록되어있는데 그 옷걸이에 또 다른 옷을 등록 하려고할 때
        await clothes.update(
          //전 옷걸이 hangerID 0으로 초기화하고 status 0으로 초기화해서 옷장에서 안보이게
          {status: 0, hangerID: "0"},
          {where: {hangerID: hangerID}}
        );
        console.log("옷걸이 초기화");
      }
      let recData = await clothes.findOne({
        where: {rfid_number: rfid, status: 1}
      }); //status 값에 따라 1이면 보여지고 0이면 안보여짐
      if (recData) {
        console.log("delete clothe");
        await clothes.update({status: 0}, {where: {rfid_number: rfid}});
      } else {
        console.log("insert clothe");
        await clothes.update(
          {status: 1, hangerID: hangerID},
          {where: {rfid_number: rfid}}
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
  res.send("success");
};

//옷장 내부에 있는 nodemcu
exports.wifiCloset = async (req, res) => {
  //const data = req.body;
  const data = req.query;
  console.log(req.query.rfid);
  //console.log(data.RFID, data.Hanger_ID);
  let hangerID = "http://" + data.Hanger_ID;
  let rfid = data.rfid;
  try {
    await temp.destroy({where: {}});
    await temp.create({
      rfid: rfid
    });
  } catch (err) {
    console.log(err);
  }

  res.send("success");
};
