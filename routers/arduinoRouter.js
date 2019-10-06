const routes = require("../routes");
const express = require("express");
const arduinoController = require("../controllers/arduinoController");

const arduinoRouter = express.Router(); //express 라우터

arduinoRouter.post(routes.arduino, arduinoController.arduino);
arduinoRouter.get(routes.wifiLED, arduinoController.wifiLED);
arduinoRouter.post(routes.wifiTag, arduinoController.wifiTag);
arduinoRouter.post(routes.wifiCloset, arduinoController.wifiCloset);

module.exports = arduinoRouter;
