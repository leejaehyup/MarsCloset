const app = require("./app");

const PORT = 4000; //포트 번호

const startServer = () => {
  //콜백함수a
  console.log(`startServer->port number:${PORT}`);
};

app.listen(PORT, startServer); //서버 시작
