//const clothes = require("../models").dcloset;
const gimg = require("../models").gimg_analysis;
const axios = require("axios");

exports.glassesImg = async (req, res) => {
  try {
    var recData = await gimg.findAll();
  } catch (err) {
    console.log(err);
  }
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
    relData = JSON.parse(data3);
  } catch (err) {
    console.log(err);
  }
  console.log(relData);
  console.log(typeof relData); //object
  console.log(relData.length);
  let asd = relData[0].replace(/'/g, '"');
  console.log(asd);
  category = asd.category;
  subclass = asd.subclass;
  pattern = asd.pattern;
  type = asd.type;
  style = asd.style;
  length = asd.length;

  if (category == "bottom") {
    category = "bottoms";
  }
  if (pattern == "graphic") {
    pattern = "printing";
  }
  if (subclass == "tube") {
    subclass = "tube_skirt";
  }
  if (clotheType == "skirt") {
    length = "skirt";
  }
  if (subclass == "man_to_man") {
    subclass = "mantoman";
  }

  console.log(category, subclass, pattern, type, style, length);
  var base64Data = req.body.test2.replace(/^data:image\/png;base64,/, "");
  require("fs").writeFileSync(
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
  //require("dotenv").config();
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION
  });
  var param = {
    Bucket: "marscloset",
    Key: "glasses/" + data1,
    ACL: "public-read",
    Body: fs.createReadStream(
      process.env.MYROUTE + "/public/upload/glasses/" + data1 + ".png"
    ),
    ContentType: "image/png"
  };

  s3.upload(param, function(err, data2) {
    if (err) {
      console.log("err         !!!!!!!!!            " + err);
    }
    console.log(data2);
  });
  const S3url = process.env.AWS_S3_GLASSES_URL + data1;

  let leeData = data1.toString().substring(5, 12);
  await gimg.create({
    gimgNum: leeData,
    gImg: S3url,
    gCategorize: category,
    gsubclass: subclass,
    gstyle: style,
    gtype: type,
    pattern: pattern,
    glength: length,
    id: leeData
  });

  //우호 코디 실행
  try {
    const {PythonShell} = require("python-shell");
    let options = {
      mode: "text",
      pythonPath: "",
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: ""
    };
    PythonShell.run("./python/gsavedb.py", options, async function(
      err,
      results
    ) {
      if (err) throw err;
      for (let i = 0; i < results.length; i++) {
        console.log("우호코디->>>>" + results[i]);
      }
    });
  } catch (err) {
    console.log(err);
  }

  res.send("suc");
};

exports.getGlasses = (req, res) => {
  res.render("glasses");
};
