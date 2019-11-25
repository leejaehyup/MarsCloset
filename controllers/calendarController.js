const calender = require("../models").calendar;
exports.calenderDelete = async (req, res) => {
  let obj = new Object();

  var reg_date = req.param("reg_date");
  var day = req.param("day");

  await calender.destroy({where: {date: reg_date, day: day}});
  let cal = await calender.findAll();
  obj.results = cal;

  let recData = JSON.stringify(obj);

  res.render("calendar", {data: recData});
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

  console.log("insert calendar");

  res.send("suc");
};

exports.calenderFind = async (req, res) => {
  let obj = new Object();

  let cal = await calender.findAll();
  obj.results = cal;

  let recData = JSON.stringify(obj);

  console.log("recData : " + recData);

  res.render("calendar", {data: recData});
};
