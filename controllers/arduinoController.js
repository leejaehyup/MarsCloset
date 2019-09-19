const closet = require("../models").closet;
const request = require("request");

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
exports.hanger = (req, res) => {
  request.get({ url: url }, function(err, response, body) {

   });
  res.render("hanger", { Hanger_url: "http://192.168.3.5:333" });
};
