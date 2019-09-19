const clothes = require("../models").dcloset;
const closet = require("../models").closet;
const gimg = require("../models").gimg_analysis;

exports.clotheAll = async (req, res) => {
  let obj = new Object();
  let cloData = await clothes.findAll({where: {status: 1}});
  //let cloData = await clothes.findAll({ where: { category: "22219633111" } });
  obj.results = cloData;
  console.log(obj);
  let recData = JSON.stringify(obj);
  //recData = "{results:" + recData + "}";
  cloData = JSON.parse(recData);
  console.log(cloData);
  res.json(cloData);
};

exports.clotheTop = async (req, res) => {
  let obj = new Object();
  let cloData = await clothes.findAll({
    where: {status: 1, category: "top"}
  });
  //let cloData = await clothes.findAll({ where: { category: "22219633111" } });
  obj.results = cloData;
  console.log(obj);
  let recData = JSON.stringify(obj);
  //recData = "{results:" + recData + "}";
  cloData = JSON.parse(recData);
  console.log(cloData);
  res.json(cloData);
};

exports.clotheBottom = async (req, res) => {
  let obj = new Object();
  let cloData = await clothes.findAll({
    where: {status: 1, category: "bottom"}
  });
  console.log("@@@@@@@@@@@@@@@@@@@@");
  //let cloData = await clothes.findAll({ where: { category: "22219633111" } });
  obj.results = cloData;
  console.log(obj);
  let recData = JSON.stringify(obj);
  //recData = "{results:" + recData + "}";
  cloData = JSON.parse(recData);
  console.log(cloData);
  res.json(cloData);
};

exports.sensor = async (req, res) => {
  let obj = new Object();
  let sensor = await closet.findAll({
    where: {closetID: 1}
  });
  obj.results = sensor;
  console.log("###### " + sensor);
  let sensorData = JSON.stringify(obj);
  senor = JSON.parse(sensorData);
  res.json(senor);
};

exports.and_gimg = async (req, res) => {
  let obj = new Object();

  let glasses = await gimg.findAll({});

  obj.results = glasses;
  console.log("###### " + glasses);
  let glassesData = JSON.stringify(obj);
  glasses = JSON.parse(glassesData);
  res.json(glasses);
};
