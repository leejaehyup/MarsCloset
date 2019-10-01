const closet = require("../models").closet;
const axios = require("axios");
const clothes = require("../models").dcloset;
const temp = require("../models").LeeJaeHyup;

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

exports.wifiLED = async (req, res) => {
  try {
    const data = await axios.get("http://192.168.0.21/LED");
    console.log(data.data.trim());
    res.send(data.data.trim());
  } catch (err) {
    console.log(err);
  }
};
exports.wifiTag = async (req, res) => {
  const data = req.body;
  console.log(data.RFID, data.Hanger_ID);
  let hangerID = "http://" + data.Hanger_ID;
  let rfid = data.RFID;
  console.log(hangerID, rfid);
  let state = true;
  let clotheData = await clothes.findAll({
    where: {rfid_number: rfid}
  });
  if (!clotheData) {
    state = true; //옷등록 해야됨
  }
  if (state == false) {
    try {
      let recData = await clothes.findOne({
        where: {rfid_number: rfid, status: 1}
      });
      if (recData) {
        console.log("delete clothe");
        await clothes.update({status: 0}, {where: {rfid_number: rfid}});
      } else {
        console.log("insert clothe");
        await clothes.update(
          {status: 1},
          {hangerID: hangerID},
          {where: {rfid_number: rfid}}
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
  res.send("succes");
};

exports.wifiCloset = async (req, res) => {
  const data = req.body;
  console.log(data.RFID, data.Hanger_ID);
  let hangerID = "http://" + data.Hanger_ID;
  let rfid = data.RFID;
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
