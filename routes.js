//closet
const HOME = "/";
const TEST = "/test";
const UPLOADTAG = "/uploadTag";
const CLOSET = "/closet";
const COORDI = "/coordi";
const CLOTHEALL = "/and_clotheAll";
const CLOTHETOP = "/and_clotheTop";
const CLOTHEBOTTOM = "/and_clotheBottom";
const SENSOR = "/and_sensor";
const ANDGLASS = "/and_glasses";
const KAKAOIMAGE = "/kakaoImg";

//glasses
const GLASSES = "/glasses";
const GLASSESIMG = "/glassesImg";
//arduino
const ARDUINO = "/arduino";
const WIFILED = "/wifiLED";
const WIFITAG = "/wifiTag";
const WIFICLOSET = "/wifiCloset";

//calendar
const CALINT = "/calenderInsert";
const CALFIND = "/calenderFind";
const CALDEL = "/calenderDelete";
const ANDCAL = "/and_calendar";

const routes = {
  home: HOME,
  test: TEST,
  uploadTag: UPLOADTAG,
  closet: CLOSET,
  clotheAll: CLOTHEALL,
  glasses: GLASSES,
  arduino: ARDUINO,
  coordi: COORDI,
  glassesImg: GLASSESIMG,
  clotheTop: CLOTHETOP,
  clotheBottom: CLOTHEBOTTOM,
  sensor: SENSOR,
  and_gimg: ANDGLASS,
  kakaoImg: KAKAOIMAGE,
  wifiLED: WIFILED,
  wifiTag: WIFITAG,
  wifiCloset: WIFICLOSET,
  calenderInsert: CALINT,
  calenderFind: CALFIND,
  and_calender: ANDCAL,
  calenderDelete: CALDEL
};

module.exports = routes;
