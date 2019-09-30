const closet = require("../models").closet;
const axios = require("axios");

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
exports.wifiTag = (req, res) => {
  const data = req.body;
  console.log(data);
  res.send("success");
};
