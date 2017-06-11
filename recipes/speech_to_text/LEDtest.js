
var RED_PIN = 11, GREEN_PIN = 13, BLUE_PIN = 15;
var LIGHT_PIN = 40;
//On terminal
//$ npm install rpio
var rpio = require('rpio');


var colorPalette = { //[r,g,b]
    "red": [1,0,0],
    "read": [1,0,0], // sometimes, STT hears "read" instead of "red"
    "green": [0,1,0],
    "blue": [0,0,1],
    "purple": [1,0,1],
    "yellow": [1,1,0],
    "pink": [1,0,1],
    "orange": [1,1,0],
    "aqua": [0,1,1],
    "white": [1,1,1],
    "off": [0,0,0],
    "on": [1,1,1]
}

/*Initialize the pins*/
var initPins = function(){
  //Pins: 11,13,15
  rpio.open(RED_PIN,rpio.OUTPUT, rpio.HIGH);
  rpio.open(GREEN_PIN,rpio.OUTPUT, rpio.HIGH);
  rpio.open(BLUE_PIN,rpio.OUTPUT, rpio.HIGH);
}

var rpioVal = {
  1 : rpio.HIGH,
  0 : rpio.LOW
}

var turnLight = function (colorConfig){
  initPins();
  rpio.write(RED_PIN,rpioVal[colorConfig[0]]);
  rpio.write(GREEN_PIN,rpioVal[colorConfig[1]]);
  rpio.write(BLUE_PIN,rpioVal[colorConfig[2]]);

}

var switchLight = function(command){
  rpio.open(LIGHT_PIN,rpio.OUTPUT,rpio.LOW);
  switch (command) {
    case 'on':
      console.log('vao on');
      rpio.write(LIGHT_PIN,rpio.HIGH);
      break;
    case 'off':
      rpio.write(LIGHT_PIN,rpio.LOW);
      break;
    default:
      rpio.write(LIGHT_PIN,rpio.LOW);
  }
}
// ----  reset LED before exit
process.on('SIGINT', function () {
    initPins();
    process.nextTick(function () { process.exit(0); });
});

function setLED(msg){
    var words = msg.split(" ");
    var color = [0,0,0]; //red

   for(var i=0; i < words.length; i++){
     if (words[i] in colorPalette){
       color = colorPalette[words[i]];
       /*inject code to switch lamp*/
       if (['on','off'].indexOf(words[i]) > -1){
         console.log(words[i]);
         switchLight(words[i]);
       }

     }
   }
    turnLight(color);
    console.log('color = ', color);
}

var x = 1;

setInterval(function() {
	var answer = x % 3;
	if (answer == 1) {
		setLED("red");
		}
	if (answer == 2) {
		setLED("blue");
		}
	if (answer == 0) {
		setLED("green");
		}
	x = x+1;
  
}, 2000);
