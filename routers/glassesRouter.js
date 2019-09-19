const routes = require("../routes");
const express = require("express");
const glassesController = require("../controllers/glassesController");

const glassesRouter = express.Router(); //express 라우터

glassesRouter.post(routes.glasses, glassesController.Postglasses);
glassesRouter.get(routes.glasses, glassesController.getGlasses);

glassesRouter.get(routes.glassesImg, glassesController.glassesImg);

module.exports = glassesRouter;
