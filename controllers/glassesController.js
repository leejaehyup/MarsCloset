const clothes = require("../models").dcloset;
const multer = require("multer");
const gimg = require("../models").gimg_analysis;

exports.glassesImg = async (req, res) => {
  let recData = await gimg.findAll();

  res.render("glassesImg", {recData: recData});
};

exports.Postglasses = async (req, res) => {
  let data1 = req.body.test;
  let data2 = req.body.test2;
  let data3 = req.body.test3;
  let category = "asd";
  let subclass = "asd";
  let pattern = "asd";
  let recData;
  let relData;
  try {
    recData = JSON.stringify(data3);
    relData = JSON.parse(recData);
  } catch (err) {
    console.log(err);
  }
  console.log(typeof relData); //object
  console.log(relData);
  console.log(relData[0]);
  console.log(typeof relData[0]);
  let asd = relData[0].replace(/'/g, '"');
  console.log(asd);
  let LEE = JSON.parse(asd);
  console.log(LEE);
  console.log(LEE.category);
  console.log(LEE.type);
  category = LEE.category;
  subclass = LEE.subclass;
  pattern = LEE.pattern;
  type = LEE.type;
  style = LEE.style;
  length = LEE.length;

  var base64Data = req.body.test2.replace(/^data:image\/png;base64,/, "");
  require("fs").writeFile(
    "public/upload/glasses/" + data1 + ".png",
    base64Data,
    "base64",
    function(err) {
      console.log(err);
    }
  );

  const AWS = require("aws-sdk");
  const fs = require("fs");
  require("dotenv").config({path: __dirname + "\\" + ".env"});
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

    region: "ap-northeast-2"
  });
  var param = {
    Bucket: "marscloset",
    Key: "glasses/" + data1,
    ACL: "public-read",
    Body: fs.createReadStream(
      "C:/Users/dlwog/Desktop/My Node Js (0820심사최종)/public/upload/glasses/" +
        data1 +
        ".png"
    ),
    ContentType: "image/png"
  };

  console.log("param @@@@@@@@@@  " + param);

  s3.upload(param, function(err, data2) {
    if (err) {
      console.log("err         !!!!!!!!!            " + err);
    }
    console.log(data2);
  });
  const S3url =
    "https://marscloset.s3.ap-northeast-2.amazonaws.com/glasses/" + data1;

  let leeData = data1.toString().substring(5, 12);
  await gimg.create({
    gimgNum: leeData,
    gImg: S3url,
    gCategorize: category,
    gsubclass: subclass,
    gstyle: style,
    gtype: type,
    pattern: pattern,
    glength: length
  });

  res.send("suc");
};

exports.getGlasses = (req, res) => {
  res.render("glasses");
};
