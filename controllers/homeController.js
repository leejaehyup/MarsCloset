const portSerial = require("../serial");
const request = require("request");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const clothes = require("../models").dcloset;
const temp = require("../models").LeeJaeHyup;
const gicloset = require("../models").gicloset;
const fs = require("fs");
const calender = require("../models").calendar;
const sharp = require("sharp"); //이미지 조절

const axios = require("axios"); //ajax

portSerial.serial();

exports.exam = async (req, res) => {
  let bottom = await clothes.findAll({
    where: {status: 1, category: "bottom"}
  });
  res.json(bottom);
};

exports.getImageInfo = async (req, res) => {
  const info = req.query.image;
  let imageInfo = await clothes.findOne({where: {cloImg: info}});
  console.log(imageInfo);
  res.render("imageInfo", {imageInfo});
};

exports.getCoordiImage = async (req, res) => {
  const hangerID = req.query.hangerID + "/LED";
  console.log(hangerID);
  try {
    const data = await axios.get(hangerID);
    console.log(data.data.trim());
    res.send(data.data.trim());
  } catch (err) {
    console.log(err);
  }
};

exports.coordi = async (req, res) => {
  const {PythonShell} = require("python-shell");
  let coordi = [];
  let kakaoOptions = {
    mode: "text",
    pythonPath: "",
    pythonOptions: ["-u"], // get print results in real-time
    scriptPath: ""
  };
  PythonShell.run("./python/final.py", kakaoOptions, async function(
    err,
    results
  ) {
    if (err) throw err;
    for (let i = 0; i < results.length; i++) {
      coordi[i] = JSON.parse(results[i]);
      console.log(results[i]);
    }
    let topData = [];
    let bottomData = [];
    for (let i = 0; i < coordi.length; i++) {
      topData[i] = await clothes.findOne({where: {rfid_number: coordi[i].Top}});
      bottomData[i] = await clothes.findOne({
        where: {rfid_number: coordi[i].Bottom}
      });
    }
    //console.log(topData, bottomData);
    console.log(topData[0].cloImg);

    res.render("coordi", {
      topData: topData,
      bottomData: bottomData
    });
    /*
    res.render("coordi", {
      data: coordi
    });
    */
    //let temp = coordi[0].replace(/'/g, '"').trim();
    //let data = JSON.parse(temp);
    //console.log(data.data.length);
    /*
    res.render("coordi", {
      data: data
    });
    */
  });

  /*
  let top = await clothes.findAll({
    where: {
      status: 1,
      category: "top"
    }
  });

  let bottom = await clothes.findAll({
    where: {status: 1, category: "bottoms"}
  });
  
  res.render("coordi", {
    topData: top,
    bottomData: bottom
  });
  */
};

exports.closet = (req, res) => {
  res.render("closet");
};

exports.home = async (req, res) => {
  let obj = new Object();
  let cal = await calender.findAll();
  obj.results = cal;
  let recData = JSON.stringify(obj);
  var requestOptions = {
    method: "GET",
    uri: "http://men-shoppingmall-rank.com/bbs/board.php?bo_table=B11",
    headers: {"User-Agent": "Mozilla/5.0"},
    encoding: null
  };
  try {
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
            product: arr_product,
            data: recData
          });
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.kakaoImage = async (req, res) => {
  let tag = req.body.tag;
  let img = req.body.image;
  if (tag === undefined || tag === "" || tag === null) tag = "tagnull";
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
  console.log(userUploadedImagePath, tag);
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
      console.log("kakaoImage->>>>" + results[i]);
    }
    if (kakao[0] == "'objects'") {
      console.log("카카오 api에서 이미지 인식을 하지 못했습니다.");
      res.redirect("test");
    } else {
      res.render("kakaoImg", {kakao: kakao, tag: tag});
    }
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
  PythonShell.run("python3.py", cutOptions, async function(err, results) {
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
  let a = false;
  if (rfid.length > 0) {
    console.log(rfid[0].rfid);
    try {
      let clotheData = await clothes.findOne({
        where: {rfid_number: rfid[0].rfid}
      });
      if (clotheData) {
        rfid = "RFID Tag duplicate";
        a = true;
      }
    } catch (err) {
      console.log(err);
    }
    if (a == true) {
      res.status(200).send(rfid);
    } else {
      res.status(200).send(rfid[0].rfid);
    }
  } else {
    res.status(200).send("");
  }
};

exports.uploadTag = async (req, res) => {
  const img = req.body.image;
  res.render("uploadTag", {data: img});
};
//db값 저장
exports.savePostHome = async (req, res) => {
  let clotheType = req.body.clo_type;
  let tag = req.body.tag;
  let category = req.body.category;
  let style = req.body.style;
  let subclass = req.body.subclass;
  let pattern = req.body.pattern;
  let length = req.body.length;
  let seasons = req.body.season;
  let season = "";
  if (category == "bottom") {
    category = "bottoms";
  }
  if (pattern == "graphic") {
    pattern = "printing";
  }

  for (let i = 0; i < seasons.length; i++) {
    season = season + seasons[i];
  }
  if (season === null || season === "" || season === undefined) season = "WSFU";
  console.log("저장되는 값들->>>", clotheType, category, style, season);

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

  //사진들 지우기.
  /*
  fs.unlink(
    process.env.MYROUTE + "/public/upload/python/" + tag + ".png",
    err => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
*/
  //옷 등록
  try {
    console.log(tag);
    await clothes.create({
      rfid_number: tag,
      cloImg: S3url,
      category: category,
      subclass1: clotheType,
      subclass2: length,
      Color: style,
      subclass3: subclass,
      subclass4: pattern,
      season: season,
      status: 0
    });
  } catch (err) {
    console.log(err);
  }
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
  res.status(200);
  res.redirect("/");
};

exports.calendar = async (req, res) => {
  /*
  const data = req.body;
  console.log(data);
  res.send("success");
*/

  res.render("calendar");
};
