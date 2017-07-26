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

/*Initialize the pins*/
var initPins = function(){
  rpio.open(RED_PIN,rpio.OUTPUT, rpio.HIGH);
  rpio.open(GREEN_PIN,rpio.OUTPUT, rpio.HIGH);
  rpio.open(BLUE_PIN,rpio.OUTPUT, rpio.HIGH);
}



var colorPalette = { //[r,g,b]
    "red": [1,0,0],
    "green": [0,1,0],
    "blue": [0,0,1]
    //add more colors! You may try emotions too, such as "sad", "happy".
}

//console.log(Object.keys(colorPalette))

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
var hardware = ['led', 'microphone', 'servo'];

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

console.log("I understand colors and motion. You can tell me to shine my light by saying 'turn the color blue' or 'go green!' or 'turn the light off' or 'shake my hand!'.");
console.log("Here are the keywords you can try: red, purple, red, move, rainbow, disco!")
var colors = {};
tjColors.forEach(function(color) {
    colors[color] = 1;
});

// TJBot start listening for speech
tj.listen(function(msg) {
//    var containsTurn = msg.indexOf("") >= 0;
//    var containsChange = msg.indexOf("change") >= 0;
//    var containsSet = msg.indexOf("set") >= 0;
//    var containsLight = msg.indexOf("") >= 0;
//    var containsDisco = msg.indexOf("disco") >= 0;
//    var containsRainbow = msg.indexOf("rainbow") >= 0;
//    var containsShake = msg.indexOf("shake") >= 0;
//    var containsMove = msg.indexOf("move") >= 0;
    
//    if (containsDisco || containsRainbow) {		
//        discoParty();
//    }
    
//    else if ((containsTurn || containsChange || containsSet) && containsLight) {
    var words = msg.split(" "); 				// the message is split into different words
    for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if (word=="shake" || word =="move" || word == "hello") {    //if the word matches keywords "shake", "move". Try adding more words to be detected here! 
		console.log("Wave arms");
		tj.wave();}
            else if (colorPalette[word] != undefined) {
                setLED(word);
                break;}
	    else if (word =="disco" || word =="rainbow"){
	    	discoParty();
	    	break;}
	    
        }
//    } 
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
