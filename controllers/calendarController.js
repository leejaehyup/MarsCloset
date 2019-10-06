const calender = require("../models").calendar;
exports.calenderDelete = async (req, res) => {
  let obj = new Object();

  var reg_date = req.param("reg_date");
  var day = req.param("day");

  console.log("regdate : " + reg_date);
  console.log("day : " + day);

  await calender.destroy({where: {date: reg_date, day: day}});
  let cal = await calender.findAll();
  //let cloData = await clothes.findAll({ where: { category: "22219633111" } });
  obj.results = cal;
  console.log(obj);
  let recData = JSON.stringify(obj);
  //recData = "{results:" + recData + "}";
  /*cal = JSON.parse(recData);
    console.log(cal);
  
    console.log("cal !!! : "+typeof(recData));
  
    res.json(cal);*/

  console.log("recData : " + recData);

  res.render("home", {data: recData});
};

exports.calenderInsert = async (req, res) => {
  var date = req.body.regdate;
  var day = req.body.day;
  var content = req.body.content;
  try {
    console.log(date);
    console.log(day);
    console.log(content);
    await calender.create({
      date: date,
      day: day,
      content: content
    });
  } catch (err) {
    console.log(err);
  }
  res.send("suc");
};

exports.calenderFind = async (req, res) => {
  let obj = new Object();

  let cal = await calender.findAll();
  //let cloData = await clothes.findAll({ where: { category: "22219633111" } });
  obj.results = cal;

  let recData = JSON.stringify(obj);
  //recData = "{results:" + recData + "}";
  /*cal = JSON.parse(recData);
    console.log(cal);
  
    console.log("cal !!! : "+typeof(recData));
  
    res.json(cal);*/

  res.render("calendar", {data: recData});
};
