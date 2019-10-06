const express = require("express");
const morgan = require("morgan"); //logger middleware
const ejsLocals = require("ejs-locals");
const bodyParser = require("body-parser");
const helmet = require("helmet"); //보안 관련 module
const cors = require("cors");
//const db = require("./models").sequelize;
const routes = require("./routes");
//router//
const globalRouter = require("./routers/globalRouter");
const androidRouter = require("./routers/androidRouter");
const glassesRouter = require("./routers/glassesRouter");
const arduinoRouter = require("./routers/arduinoRouter");
const calendarRouter = require("./routers/calendarRouter");

//controller//
const socketController = require("./controllers/socketController");
const app = express(); //express 프레임워크
const expressWs = require("express-ws")(app);
app.use(cors());
//db.sync();
require("dotenv").config();
app.engine("ejs", ejsLocals); //ejs-locals추가
app.set("view engine", "ejs"); //템플릿 view engine ejs로 설정
app.use(helmet());
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(express.static("public")); //정적파일 서비스하기
app.use(morgan("dev"));

//app.use(localsMiddleware);
expressWs.getWss().on("connection", function(ws) {
  console.log("socket connection open");
});
app.ws("/uploadTag", socketController.socketTag);
app.ws("/closet", socketController.socket);
//app.ws("/", socketController.socket);

app.use(routes.home, globalRouter); //미들웨어 ->글로벌 라우터
app.use(routes.home, androidRouter);
app.use(routes.home, glassesRouter);
app.use(routes.home, arduinoRouter);
app.use(routes.home, calendarRouter);

module.exports = app;
