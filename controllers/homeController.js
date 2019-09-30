const portSerial = require("../serial");
const request = require("request");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const clothes = require("../models").dcloset;
const temp = require("../models").LeeJaeHyup;

const sharp = require("sharp"); //이미지 조절
const axios = require("axios");

portSerial.serial();

exports.exam = async (req, res) => {
  let bottom = await clothes.findAll({
    where: {status: 1, category: "bottom"}
  });
  res.json(bottom);
};

exports.coordi = async (req, res) => {
  let top = await clothes.findAll({
    where: {
      status: 1,
      category: "top",
      Color: ["white", "black", "green", "blue"]
    }
  });

  let bottom = await clothes.findAll({
    where: {status: 1, category: "bottom"}
  });
  res.render("coordi", {
    topData: top,
    bottomData: bottom
  });
};

exports.closet = (req, res) => {
  res.render("closet");
};

exports.home = (req, res) => {
  var requestOptions = {
    method: "GET",
    uri: "http://men-shoppingmall-rank.com/bbs/board.php?bo_table=B11",
    headers: {"User-Agent": "Mozilla/5.0"},
    encoding: null
  };

  request.get(requestOptions, function(error, response, html) {
    var strContents = new Buffer(html);
    strContents = iconv.decode(strContents, "EUC-KR").toString();

    var $ = cheerio.load(strContents);
    var rank_text;
    var arr_rank = new Array();
    var arr_link = new Array();
    var arr_click = new Array();
    var i = 0;
    $(".mw_basic_list_subject > .mw_basic_list_subject_desc > a > span").each(
      function() {
        var rank = $(this);
        rank_text = rank.text();
        arr_rank[i] = rank_text;
        i++;
      }
    );
    i = 0;
    $(".mw_basic_list_subject > .mw_basic_list_link > a").each(function() {
      var rank = $(this);
      rank_text = rank.text();
      arr_link[i] = rank_text;
      i++;
    });
    i = 0;
    $(".mw_basic_list_click").each(function() {
      var rank = $(this);
      rank_text = rank.text();
      arr_click[i] = rank_text;
      i++;
    });

    var requestOptions = {
      method: "GET",
      uri: "http://women-shoppingmall-rank.com/bbs/board.php?bo_table=B11",
      headers: {"User-Agent": "Mozilla/5.0"},
      encoding: null
    };

    request.get(requestOptions, function(error, response, html) {
      var strContents = new Buffer(html);
      strContents = iconv.decode(strContents, "euc-kr").toString();
      var $ = cheerio.load(strContents);
      var rank_text1;
      var arr_rank1 = new Array();
      var arr_link1 = new Array();
      var arr_click1 = new Array();
      var i = 0;

      $(".mw_basic_list_subject_desc > a > span").each(function() {
        var rank = $(this);
        rank_text1 = rank.text();
        arr_rank1[i] = rank_text1;
        i++;
      });
      i = 0;
      $(".mw_basic_list_link > a").each(function() {
        var rank = $(this);
        rank_text1 = rank.text();
        arr_link1[i] = rank_text1;
        i++;
      });
      i = 0;
      $(".mw_basic_list_click").each(function() {
        var rank = $(this);
        rank_text1 = rank.text();
        arr_click1[i] = rank_text1;
        i++;
      });

      var requestOptions = {
        method: "GET",
        uri: "https://store.musinsa.com/app/",
        headers: {"User-Agent": "Mozilla/5.0"},
        encoding: null
      };

      request.get(requestOptions, function(error, response, html) {
        var $ = cheerio.load(html);
        var rank_text2;
        var arr_product = new Array();
        var i = 0;

        $(".word").each(function() {
          var rank = $(this);
          rank_text2 = rank.text();
          arr_product[i] = rank_text2;
          i++;
        });
        let data = portSerial.serialData;

        res.render("home", {
          title: "hello!!",
          data: data,
          shopping: arr_link,
          name: arr_rank,
          click: arr_click,
          shopping2: arr_link1,
          name2: arr_rank1,
          click2: arr_click1,
          product: arr_product
        });
      });
    });
  });
};

exports.kakaoImage = async (req, res) => {
  let tag = req.body.tag;
  let img = req.body.image;
  try {
    function decodeBase64Image(dataString) {
      var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      var response = {};

      if (matches.length !== 3) {
        return new Error("Invalid input string");
      }

      response.type = matches[1];
      response.data = new Buffer(matches[2], "base64");

      return response;
    }

    // Regular expression for image type:
    // This regular image extracts the "jpeg" from "image/jpeg"
    var imageTypeRegularExpression = /\/(.*?)$/;

    var base64Data = img;

    var imageBuffer = decodeBase64Image(base64Data);
    var userUploadedFeedMessagesLocation = "public/upload/image/";

    var imageTypeDetected = imageBuffer.type.match(imageTypeRegularExpression);

    var userUploadedImagePath =
      userUploadedFeedMessagesLocation + tag + "." + imageTypeDetected[1];

    try {
      sharp(imageBuffer.data)
        .resize(400, 300)
        .toFile(userUploadedImagePath, (err, info) => {
          if (err) {
            console.log("sharp is error!!");
          } else console.log(info);
        });
    } catch (err) {
      console.log(err);
    }

    // Save decoded binary image to disk
    /*
    try {
      require("fs").writeFile(userUploadedImagePath, imageBuffer.data, function(
        err
      ) {
        if (err) throw err;
        console.log(
          "DEBUG - feed:message: Saved to disk image attached by user:",
          userUploadedImagePath
        );
      });
    } catch (error) {
      console.log("ERROR:", error);
    }
    */
  } catch (error) {
    console.log("ERROR:", error);
  }
  const {PythonShell} = require("python-shell");
  let kakao = [];
  let kakaoOptions = {
    mode: "text",
    pythonPath: "",
    pythonOptions: ["-u"], // get print results in real-time
    scriptPath: "",
    args: [userUploadedImagePath, tag]
  };
  PythonShell.run("kakao_vision.py", kakaoOptions, async function(
    err,
    results
  ) {
    if (err) throw err;
    for (let i = 0; i < results.length; i++) {
      kakao[i] = results[i];
      console.log(results[i]);
    }
    res.render("kakaoImg", {kakao: kakao, tag: tag});
  });
};

exports.saveImage = async (req, res) => {
  let kakaoTitle = req.body.kakaoTitle.trim();
  let kakaopath = "public/" + req.body.kakaopath;
  let tag = req.body.tag;
  console.log(kakaopath);

  const {PythonShell} = require("python-shell");

  let cutOptions = {
    mode: "text",
    pythonPath: "",
    pythonOptions: ["-u"], // get print results in real-time
    scriptPath: "",
    args: [kakaopath, tag, kakaoTitle]
  };
  PythonShell.run("python2.py", cutOptions, async function(err, results) {
    if (err) throw err;
    for (let i = 0; i < results.length; i++) {
      console.log(results[i]);
    }
    let clotheDataString = results[0].replace(/'/g, '"');
    let clotheDataJson = JSON.parse(clotheDataString);
    res.render("saveImage", {
      tag: tag,
      clotheCategory: clotheDataJson.category,
      clotheType: clotheDataJson.type,
      clotheSubclass: clotheDataJson.subclass,
      clothePattern: clotheDataJson.pattern,
      clotheStyle: clotheDataJson.style,
      clotheLength: clotheDataJson.length,
      clotheColor: ""
    });
  });
};

exports.test = async (req, res) => {
  let data = portSerial.serialData;
  await temp.destroy({where: {}});
  console.log(data);
  res.render("test", {title: "test!!", data: data});
};

exports.getUploadTag = async (req, res) => {
  let rfid = await temp.findAll({});
  if (rfid.length > 0) {
    console.log(rfid[0].rfid);
    try {
      let clotheData = await clothes.findOne({
        where: {rfid_number: rfid[0].rfid}
      });
      if (clotheData) {
        rfid = "RFID Tag duplicate";
        res.send(rfid); //값 보내기
      }
    } catch (err) {
      console.log(err);
    }
    res.send(rfid[0].rfid);
  } else {
    res.send("");
  }
};

exports.uploadTag = async (req, res) => {
  const img = req.body.image;
  res.render("uploadTag", {data: img});
};
//db값 저장
exports.savePostHome = async (req, res) => {
  let clotheType = req.body.clo_type;
  let clotheColor = req.body.clo_color;
  let category = null;
  const tag = req.body.tag;

  const AWS = require("aws-sdk");
  const fs = require("fs");
  require("dotenv").config({path: __dirname + "\\" + ".env"});
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION
  });
  var param = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: "image/" + tag,
    ACL: "public-read",
    Body: fs.createReadStream(
      process.env.MYROUTE + "/public/upload/python/" + tag + ".png"
    ),
    ContentType: "image/png"
  };
  s3.upload(param, function(err, data) {
    if (err) {
      console.log(err);
    }
    console.log(data);
  });
  const S3url = process.env.AWS_S3_URL + tag;
  // let imgFile = req.file;
  //console.log(imgFile);
  console.log(req.body.clo_type);
  console.log(req.body.clo_color);
  console.log(req.body.tag);
  if (clotheType == "t-shirts") {
    category = "top";
  } else if (clotheType == "pants") {
    category = "bottom";
  } else {
    category = outer;
  }
  try {
    console.log(tag);
    await clothes.create({
      rfid_number: tag,
      cloImg: S3url,
      category: category,
      subclass: clotheType,
      Color: clotheColor,
      season: "w",
      status: 1
    });
  } catch (err) {
    console.log(err);
  }

  res.status(200);
  res.redirect("/");
};

exports.example = async (req, res) => {
  /*
  const data = req.body;
  console.log(data);
  res.send("success");
*/

  try {
    const data = await axios.get("http://192.168.0.48/LED");
    console.log(data.data.trim());
    res.send(data.data.trim());
  } catch (err) {
    console.log(err);
  }
};
