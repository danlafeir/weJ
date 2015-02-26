# weJ

Simply, this is an app that allows you to listen to music collaboratively. 

But I had a couple more goals. 

**Goals:** 
  * To experiment with a design concept that I have been thinking about (I will explain in detail below). 
  * Try to give back to the Open Source Community which has been instrumental (music get it) in my life.
  * Make listening to music collabortively more then just suggesting songs. 
  
**All I ask** is give credit where credit is due. If you fork this or use it credit the pieces you use to the people who have worked on it. Programming is an art and as artists we like signning our work too!

### Structure 

The structure of this application was built on the idea of seperation of concern. I love this idea down to individual functions. So I currently have what I will call **interfaces**. I choose this convention based on how Java interfaces have definitions that you have to follow  

Web interface - This is the piece that people see and use to add songs or whatever you add functionality for people to use.  

Logic interface - This handles all of the logic for playing music. All it has are endpoints for talking to other interfaces like the Web. 

### Going Forward 

I am want to make the music playing interface not only so I can make it not dependent on spoitfy. I would love to put this on a rasberry pi or hummingboard to cut out the need for a computer. 

I would also like to add mobile as well. Mobile apps will have their own interface but as long as they are using the same endpoints as the logic interface. 

I am looking to make this a project that builds with vagrant and adding a testing component so people can develop in a TTD way.

### How to add to ths

Along with making interfaces I am also trying to utilize a methodology I have seen in PHP frameworks. I have a **core** code section and **features** that you can add. But unlike those frameworks I encourage you to hack the core. I am ok with having multiple cores (however I will name a *"OG core"*). Over time things I would love to merge things into the *"OG core"* (whether they be other cores or features). 

### The "Grand Design" 

Like I mentioned earlier I really enjoy and strive for seperation of concern. I think this is the best way to track down bugs when you program. So from interface to interface or function to function there is a concept of "this is what I take" and "this is what I will give you". And making each of these minimizes how much it needs to worry about. This might seem simple but JavaScript plays the game fast and loose where you can pass whatever you want and get whatever you want. I want to enforce the classical strongly type ruling. 

### How to set it up 

Currently you should be able to fork main cores for both the logic interface and the web interface. You will need node and npm installed to run this. You should probably run **npm update** if you have it for good measure.

For logic interface: You should only need to run **npm install** and it should work when you run **sails lift** if you are missing something it should tell you what package you are missing and you can run npm install <package name> to fix it.

For web interface: You have to run both **npm install** and **bower install** I am trying to leave dependency handling up to bower and npm to make setting up the app easier. Once you run both these commands you should be able to run **grunt serve** and the project should start up. 

This also uses the spotify api to play the music so you will need to register an app with them and populate AppConfig with:
* client_id: // Your client id
* client_secret: // Your client client_secret
* redirect_uri: // Your registered callback uri with the Spotify App
  
  
### Shout outs

Like I mentioned earlier I want to give credit where credit is due. Check out some of the cool stuff that made this app possible.

[Yeoman](http://yeoman.io/) - for the scaffolding of the frontend app 

[AngularJS](https://angularjs.org/) - for frontend greatness

[Bower](http://bower.io/) - managing packages for me 

[Grunt](http://gruntjs.com/) - setting up the server in a easy way 

[SailsJS](http://sailsjs.org/#!/) - for doing the heavy lifting building a web API

APIs:

[Spotify Web API](https://developer.spotify.com/web-api/) - for bring the music to the party






