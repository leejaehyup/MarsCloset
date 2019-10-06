const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline; //serial통신 값오는거 \n으로 구분해서 가져오기

const serialPort = new SerialPort("COM4", {baudRate: 9600});
const parser = new Readline();
serialPort.pipe(parser);
const serial = () => {
  serialPort.open(function() {
    console.log("접속되었습니다!");
    parser.on("data", function(data) {
      let serialData = data.trim();
      if (serialData == "") {
        serialData = null;
      }
      module.exports.serialData = serialData;
      // console.log("my data:" + serialData);
    });
  });
};
module.exports.serial = serial;
