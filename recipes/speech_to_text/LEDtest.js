
var RED_PIN = 11, GREEN_PIN = 13, BLUE_PIN = 15;
var LIGHT_PIN = 40;
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

console.log(Object.keys(colorPalette))

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
         //console.log(words[i]);
         switchLight(words[i]);
       }

     }
   }
    turnLight(color);
    //console.log('color = ', color);
}



function discoParty() {
	var x = 1;
	for (i = 0; i < 30; i++) {
	setTimeout(function() {
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
  
}, i*200);

}
setLED("off");}


discoParty();

var pin = 12;           /* P12/GPIO18 */
var range = 1024;       /* LEDs can quickly hit max brightness, so only use */
var max = 500;          /*   the bottom 8th of a larger scale */
var clockdiv = 128;       /* Clock divider (PWM refresh rate), 128 == 19.2M == 2.4MHz */
var interval = 2;       /* setInterval timer, speed of pulses */
var times = 5;          /* How many times to pulse before exiting */
 
/*
 * Enable PWM on the chosen pin and set the clock and range.
 */

rpio.init({gpiomem:false});
rpio.open(pin, rpio.PWM);
rpio.pwmSetClockDivider(clockdiv);
rpio.pwmSetRange(pin, range);
 
/*
 * Repeatedly pulse from low to high and back again until times runs out.
 */
var direction = 10;
var data = 0;
var pulse = setInterval(function() {
        rpio.pwmSetData(pin, data);
        if (data === 0) {
                direction = 1;
                if (times-- === 0) {
                        clearInterval(pulse);
                        rpio.open(pin, rpio.INPUT);
                        return;
                }
        } else if (data === max) {
                direction = -10;
        }
        data += direction;
        console.log(data);
}, interval, data, direction, times);
