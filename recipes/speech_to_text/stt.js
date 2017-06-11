/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var RED_PIN = 11, GREEN_PIN = 13, BLUE_PIN = 15;
var LIGHT_PIN = 40;
var rpio = require('rpio');

var colorPalette = { //[r,g,b]
    "red": [1,0,0],
    "read": [1,0,0], // sometimes, STT hears "read" instead of "red"
    "right": [1,0,0], 
    "green": [0,1,0],
    "blue": [0,0,1],
    "do": [0,0,1],
    "purple": [1,0,1],
    "yellow": [1,1,0],
    "pink": [1,0,1],
    "orange": [1,1,0],
    "aqua": [0,1,1],
    "white": [1,1,1],
    "off": [0,0,0],
    "cool": [0,0,0],
    "on": [1,1,1]
}

console.log("Here are the keywords you can say to turn on the light!")
console.log(Object.keys(colorPalette))


/*Initialize the pins*/
var initPins = function(){
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

var TJBot = require('tjbot');
var config = require('./config');

// obtain our credentials from config.js
var credentials = config.credentials;

// these are the hardware capabilities that our TJ needs for this recipe
var hardware = ['led', 'microphone'];

// set up TJBot's configuration
var tjConfig = {
    log: {
        level: 'verbose'
    }
};

// instantiate our TJBot!
var tj = new TJBot(hardware, tjConfig, credentials);

// full list of colors that TJ recognizes, e.g. ['red', 'green', 'blue']
var tjColors = tj.shineColors();

console.log("I understand lots of colors.  You can tell me to shine my light a different color by saying 'turn the light red' or 'change the light to green' or 'turn the light off'.");

// uncomment to see the full list of colors TJ understands
// console.log("Here are all the colors I understand:");
// console.log(tjColors.join(", "));

// hash map to easily test if TJ understands a color, e.g. {'red': 1, 'green': 1, 'blue': 1}
var colors = {};
tjColors.forEach(function(color) {
    colors[color] = 1;
});

// listen for speech
tj.listen(function(msg) {
    var containsTurn = msg.indexOf("") >= 0;
    var containsChange = msg.indexOf("change") >= 0;
    var containsSet = msg.indexOf("set") >= 0;
    var containsLight = msg.indexOf("") >= 0;
    var containsDisco = msg.indexOf("rainbow") >= 0;
    
    
	if (containsDisco) {
        discoParty();
    }
    else if ((containsTurn || containsChange || containsSet) && containsLight) {
        // was there a color uttered?
        var words = msg.split(" ");
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if (colorPalette[word] != undefined || word == "on" || word == "off" || word =="read" ||word =="right") {
                // yes!
                //tj.shine(word);
                setLED(word);
                break;
            }
        }
    } 
});

// let's have a disco party!
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


// ----  reset LED before exit
process.on('SIGINT', function () {
    initPins();
    process.nextTick(function () { process.exit(0); });
});
