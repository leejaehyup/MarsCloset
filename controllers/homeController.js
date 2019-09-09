const portSerial = require("../serial");
const request = require("request");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const clothes = require("../models").dcloset;
const sharp = require("sharp"); //이미지 조절
portSerial.serial();

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

exports.saveImage = async (req, res) => {
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

    // Generate random string
    var crypto = require("crypto");
    var seed = crypto.randomBytes(20);
    var uniqueSHA1String = crypto
      .createHash("sha1")
      .update(seed)
      .digest("hex");

    var base64Data = img;

    var imageBuffer = decodeBase64Image(base64Data);
    var userUploadedFeedMessagesLocation = "public/upload/image/";

    var uniqueRandomImageName = "image-" + uniqueSHA1String;
    // This variable is actually an array which has 5 values,
    // The [1] value is the real image extension
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
  let options = {
    mode: "text",
    pythonPath: "",
    pythonOptions: ["-u"], // get print results in real-time
    scriptPath: "",
    args: [userUploadedImagePath, tag]
  };
  PythonShell.run("python2.py", options, async function(err, results) {
    if (err) throw err;
    for (let i = 0; i < results.length; i++) {
      console.log(results[i]);
    }
    try {
    } catch (err) {
      console.log(err);
    } finally {
      res.render("saveImage", {
        tag: tag,
        clotheType: results[1],
        clotheColor: results[0]
      });
    }
  });
};

exports.test = (req, res) => {
  let data = portSerial.serialData;
  console.log(data);
  res.render("test", {title: "test!!", data: data});
};

exports.uploadTag = (req, res) => {
  const img = req.body.image;
  res.render("uploadTag", {data: img});
};

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
    region: "ap-northeast-2"
  });
  var param = {
    Bucket: "marscloset",
    Key: "image/" + tag,
    ACL: "public-read",
    Body: fs.createReadStream(
      "C:/Users/dlwog/Desktop/My Node Js (0820심사최종)/public/upload/python/" +
        tag +
        ".png"
    ),
    ContentType: "image/png"
  };
  s3.upload(param, function(err, data) {
    if (err) {
      console.log(err);
    }
    console.log(data);
  });
  const S3url =
    "https://marscloset.s3.ap-northeast-2.amazonaws.com/image/" + tag;
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
      status: 1
    });
  } catch (err) {
    console.log(err);
  }

  res.status(200);
  res.redirect("/");
};

exports.example = async (req, res) => {
  try {
    console.log(clothes);
    let wow = await clothes.findAll({});
    res.render("example", {data: wow});
    console.log(wow[0].id);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
  console.log(wow);
};