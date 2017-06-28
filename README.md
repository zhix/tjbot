# Using TJBot with common-cathode tri-color LED & servo motor 

This is a 3-hour workshop designed for upper-primary and secondary school students to explore on Raspberry Pi, Watson API, JavaScript and basic electronics. By the end of the workshop, students will be able to assemble their own TJBot and get it running with Watson API, controlling tri-color LED & servo motor by speech.

#### Make sure you have the followings before you start: 
* Monitor 
* Keyboard 
* Mouse
* Power supply (5V 2A) 
* Raspberry Pi with microSD card attached
* VGA-HDMI Converter
* USB Microphone 
-------
* Cardboard Model parts 
-------
* 3 Male-Female Jumper Cables
* 4 Female-Female Jumper Cables
* Tri-color LED 
* Micro Servo Motor
-------
* Hot Glue Gun 

### 1) [Setup] Powering up Raspberry Pi as the computer

1.	Get ready with the following items: 

![alt text][assemble]

2.	Hook up all the items into the correct ports on Raspberry Pi. 

![alt text][structure]

3.	When everything is in place, you may then turn on the Monitor and Raspberry Pi. 

4.  When you see this on your screen, you are in safe hands! 
![alt text][desktop] 

Wait for a few seconds, you will see the destop like this. 
![alt text] [desktop2] 

Before we move on, go to the Web Browser to access this website: github.com/zhix/tjbot 
This website will be your guidance from now on. 
![alt text] [desktop3] 


[assemble]: https://github.com/zhix/tjbot/images/AssembleRPi.png "Powering Up Raspberry Pi"
[structure]: https://github.com/zhix/tjbot/images/StructureRPi.png "Powering Up Raspberry Pi" 
[desktop]: https://github.com/zhix/tjbot/images/Startup.png 
[desktop2]: https://github.com/zhix/tjbot/images/pixelDestop.png 
[desktop3]: https://github.com/zhix/tjbot/images/desktop3.png 


### 2) [Origami] Fold your own TJBot! 

Build your own robot following the instructions [here](http://www.instructables.com/id/Build-TJ-Bot-Out-of-Cardboard/) starting from Step 3. Alternatively, you can watch the [YouTube video here](https://www.youtube.com/watch?v=bLt3Cf2Ui3o) 


<a href="http://www.youtube.com/watch?feature=player_embedded&v=bLt3Cf2Ui3o" target="_blank"><img src="https://i.ytimg.com/vi/k928MQmD0oc/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCVSTfddZpY0j1g2WF_bCXSU_4JWg" 
alt="YouTube Video Here" width="240" height="180" border="10" /></a>

### 3) [Electronics] Follow the diagram to set up the electronic components 


### 4) [Programming] Follow the instructions in order to get the TJBot working. 



## Setting up the environment
1) Read the original instructable [here](http://www.instructables.com/id/Use-Your-Voice-to-Control-a-Light-With-Watson/)

2) Prepare the correct environment 

```bash 
sudo apt-get -y update
sudo apt-get -y dist-upgrade
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y alsa-base alsa-utils libasound2-dev
```

3) Get the tjbot repository from [Github](https://github.com/zhix/tjbot) 
```git 
git clone https://github.com/zhix/tjbot.git
cd tjbot/recipes/speech_to_text/
sudo npm install  
```

###### (if **_sudo npm install_** produces error such as **_WARN EACCES user "root" does not have permission to access the dev dir ..._**, go to home directory (**_cd /home/pi/_**) and delete the folder **_.npm/_** by **_rm -rf .npm/_** .) 

4) Install rpio package

```bash
sudo npm install rpio 
```

5) Test the microphone

To check the existence of the device:

```bash
lsusb
```

After checking the device is available, make sure you reboot Raspberry Pi to make the device available on alsamixer. 
Next on choose the recording device (USB PnP) on alsamixer, change the "gain". 

```bash 
alsamixer
arecord -l
```

Finally, try recording: ```arecord a.wav -D sysdefault:CARD=1```

When done, "CTRL+C" to exit. Replay the recording with omxplayer by ```omxplayer a.wav```. You need to adjust the noise settings of the microphone through ```alsamixer```. 

6) Edit the config.js file as noted in the Instructables [Step 5](http://www.instructables.com/id/Use-Your-Voice-to-Control-a-Light-With-Watson/).

7) Test "LEDtest.js" to see if your tricolor LED is working. 

```bash
sudo node LEDtest.js 
```

8) Test "MICtest.js" to see if your microphone is sending signals to IBM Watson.

```bash
sudo node MICtest.js 
```

9) Test "SERVOtest.js" to see if your servo motor is working fine.


```bash
sudo node SERVOtest.js 
```

10) When ready, run "stt.js" with ```sudo node stt.js``` and get the fun begin. 


# IBM TJBot
<img src="/images/tjbot.jpg" width="85%">

[IBM Watson Maker Kits](http://ibm.biz/mytjbot) are a collection of DIY open source templates to connect to [Watson services](https://www.ibm.com/watson/developercloud/services-catalog.html) in a fun way. [IBM TJBot](http://ibm.biz/mytjbot) is the first maker kit in the collection. You can 3D print or laser cut the robot frame, then use one of the available [recipes](recipes) to bring him to life!

Better still, you can create your own custom recipes to bring exciting ideas to life using any combination of Watson's Cognitive API's!

**TJBot will only run on Raspberry Pi.**

# Get TJBot
You can download [the design files](https://ibmtjbot.github.io/#gettj) and 3D print or laser cut TJBot. 
[Here is an instructable](http://www.instructables.com/id/Build-TJ-Bot-Out-of-Cardboard/) to help you with the details.

# Bring TJBot to life
[Recipes](recipes) are step by step instructions to help you connect your TJBot to [Watson services](https://www.ibm.com/watson/developercloud/services-catalog.html).
The [recipes](recipes) are designed based on a Raspberry Pi. You can either run one of the available [recipes](recipes) or create your own recipe that brings sweet ideas to life using any combination of [Watson API](https://www.ibm.com/watson/developercloud/services-catalog.html)!

We have provided three initial [recipes](recipes) for you:
- Use your voice to control a light with Watson [[instructions](http://www.instructables.com/id/Use-Your-Voice-to-Control-a-Light-With-Watson/)] [[github](https://github.com/ibmtjbot/tjbot/tree/master/recipes/speech_to_text)]
- Make your robot respond to emotions using Watson [[instructions](http://www.instructables.com/id/Make-Your-Robot-Respond-to-Emotions-Using-Watson/)] [[github](https://github.com/ibmtjbot/tjbot/tree/master/recipes/sentiment_analysis)]
- Build a talking robot with Watson Conversation [[instructions](http://www.instructables.com/id/Build-a-Talking-Robot-With-Watson-and-Raspberry-Pi/)] [[github](https://github.com/ibmtjbot/tjbot/tree/master/recipes/conversation)]

Here are some of the featured recipes created by TJBot enthusiasts:
- Fun controller recipe for TJBot's servo arm [[instructions](http://www.instructables.com/id/Build-a-Waving-Robot-Using-Watson-Services/)] [[github](https://github.com/victordibia/tjwave)]
- SwiftyTJ that enables TJBot’s LED to be controlled from a Swift program [[github](https://github.com/jweisz/swifty-tj)]
- Build a TJBot that cares [[instructions](https://medium.com/ibm-watson-developer-cloud/build-a-chatbot-that-cares-part-1-d1c273e17a63#.6sg1yfh4w)] [[github](https://github.com/boxcarton/tjbot-raspberrypi-nodejs)]
- Project Intu, not a recipe but a middleware that can be installed on TJBot and be used to architect more complex interactions for your robot [[developercloud](http://www.ibm.com/watson/developercloud/project-intu.html)] [[github](https://github.com/watson-intu/self-sdk#raspberry-pi)]

# Contribute to TJBot
TJBot is open source and we'd love to see what you can make with him. Here are some ideas to get you started.

    - Visual recognition. TJBot has a placeholder behind his left eye to insert a Raspberry Pi camera. Try connecting the camera to the Watson Visual Recognition API so TJ can say hello when he sees you.

    - IoT. The Watson IoT service lets you control smart home devices (e.g. Philips Hue, LIFX lights, etc. ). Connect TJBot to IoT and have him control your home.

    - Connected robots. You can program multiple TJBots to send messages to each other using the Watson IoT platform.

If you have created your own recipe, we would love to include it as a [featured recipe](featured/README.md)! Just submit a pull request for your receipe instructions and code and send a link to a demo video to tjbot@us.ibm.com (Vimeo & YouTube preferred). We will review it and if we decide to include it in our repository, you'll be listed as the developer. See [CONTRIBUTING.md](CONTRIBUTING.md).

We cannot wait to see what you build with [TJBot](http://ibm.biz/mytjbot)!

# About TJBot
[TJ](http://ibm.biz/mytjbot) is affectionately named after Thomas J. Watson, the first Chairman and CEO of IBM. TJBot was born at IBM Research as an experiment to find the best practices in the design and implementation of cognitive objects.

Feel free to contact TJBot at tjbot@us.ibm.com

## License
This library uses the [Apache License Version 2.0 software license] (LICENSE).
