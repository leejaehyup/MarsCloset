const clothes = require("../models").dcloset;
const closet = require("../models").closet;
const gimg = require("../models").gimg_analysis;
const calender = require("../models").calendar;

//상의 하의 개수 구하기
exports.clothNumber = async (req, res) => {
  let obj = new Object();
  let topData = await clothes.findAll({
    where: {status: 1, category: "top"}
  });
  let bottomData = await clothes.findAll({
    where: {status: 1, category: "bottoms"}
  });
  let number = [];
  number[0] = {top: topData.length, bottoms: bottomData.length};
  //let cloData = await clothes.findAll({ where: { category: "22219633111" } });
  obj.results = number;
  let recData = JSON.stringify(obj);
  //recData = "{results:" + recData + "}";
  cloData = JSON.parse(recData);
  console.log("안드에서 옷 개수 가져감");
  res.json(cloData);
};

exports.clotheAll = async (req, res) => {
  let obj = new Object();
  let cloData = await clothes.findAll({where: {status: 1}});
  //let cloData = await clothes.findAll({ where: { category: "22219633111" } });
  obj.results = cloData;
  let recData = JSON.stringify(obj);
  //recData = "{results:" + recData + "}";
  cloData = JSON.parse(recData);
  console.log("안드에서 다 가져감");
  res.json(cloData);
};

exports.clotheTop = async (req, res) => {
  let obj = new Object();
  let cloData = await clothes.findAll({
    where: {status: 1, category: "top"}
  });
  //let cloData = await clothes.findAll({ where: { category: "22219633111" } });
  obj.results = cloData;
  let recData = JSON.stringify(obj);
  //recData = "{results:" + recData + "}";
  cloData = JSON.parse(recData);
  console.log("안드에서 상의 가져감");
  res.json(cloData);
};

exports.clotheBottom = async (req, res) => {
  let obj = new Object();
  let cloData = await clothes.findAll({
    where: {status: 1, category: "bottoms"}
  });
  console.log("@@@@@@@@@@@@@@@@@@@@");
  //let cloData = await clothes.findAll({ where: { category: "22219633111" } });
  obj.results = cloData;
  let recData = JSON.stringify(obj);
  //recData = "{results:" + recData + "}";
  cloData = JSON.parse(recData);
  console.log("안드에서 하의 가져감");
  res.json(cloData);
};

exports.sensor = async (req, res) => {
  let obj = new Object();
  let sensor = await closet.findAll({
    where: {closetID: 1}
  });
  obj.results = sensor;
  let sensorData = JSON.stringify(obj);
  console.log("아두이노 센서 값 안드로이드에서 가져감");
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

exports.andCalendar = async (req, res) => {
  let obj = new Object();
  let calendar = await calender.findAll({});
  obj.results = calendar;
  let recData = JSON.stringify(obj);
  //recData = "{results:" + recData + "}";
  calData = JSON.parse(recData);
  console.log(calData);
  res.json(calData);
};
