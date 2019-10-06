const routes = require("../routes");
const express = require("express");
const calendarController = require("../controllers/calendarController");

const calendarRouter = express.Router(); //express 라우터

calendarRouter.post(routes.calenderInsert, calendarController.calenderInsert);

calendarRouter.get(routes.calenderFind, calendarController.calenderFind);
calendarRouter.get(routes.calenderDelete, calendarController.calenderDelete);

module.exports = calendarRouter;
