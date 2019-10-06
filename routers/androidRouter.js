const routes = require("../routes");
const express = require("express");
const androidController = require("../controllers/androidController");

const androidRouter = express.Router();

androidRouter.get(routes.clotheAll, androidController.clotheAll);
androidRouter.get(routes.clotheTop, androidController.clotheTop);
androidRouter.get(routes.clotheBottom, androidController.clotheBottom);
androidRouter.get(routes.sensor, androidController.sensor);
androidRouter.get(routes.and_gimg, androidController.and_gimg);
androidRouter.get(routes.andCalendar, androidController.andCalendar);
androidRouter.get(routes.andClothNumber, androidController.clothNumber);

module.exports = androidRouter;
