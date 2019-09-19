const routes = require("../routes");
const express = require("express");
const arduinoController = require("../controllers/arduinoController");

const arduinoRouter = express.Router(); //express 라우터

arduinoRouter.post(routes.glasses, arduinoController.arduino);
arduinoRouter.get(routes.hanger, arduinoController.hanger);

module.exports = arduinoRouter;
