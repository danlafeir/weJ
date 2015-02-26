/**
* AppConfig.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var events = require('events');

var Loop = function(time) {
    this.time = time;
    var that;
    events.EventEmitter.call(this);
    this.init = function()
    {
        that = this;
        setInterval(that.run,that.time);
    };

    this.run = function()
    {
       that.emit('Event');
    };
}

Loop.prototype.__proto__ = events.EventEmitter.prototype;


module.exports = {

	attributes: {},

	client_id: sails.config.spotifyWebAPIConfig.client_id,
	client_secret: sails.config.spotifyWebAPIConfig.client_secret,
	redirect_uri: sails.config.spotifyWebAPIConfig.redirect_uri,
	scope: 'user-read-private playlist-modify-public playlist-modify-private',
	access_token: '',
	refresh_token: '',

	startTokenRefreshLoop: function(){
		var u = new Loop(20000);
		u.init();
		u.on('Event',function () {
			console.log('event loop triggered');
		    AppConfig.refreshToken();
		});
	},

	refreshToken : function(req, res){
		console.log("refresh token")
		var request = require('request');
		var self = this;
		// requesting access token from refresh token
		var options = {
		    url: 'https://accounts.spotify.com/api/token',
		    headers: { 'Authorization': 'Basic ' + (new Buffer(self.client_id + ':' + self.client_secret).toString('base64')) },
		    form: {
		        grant_type: 'refresh_token',
		        refresh_token: self.refresh_token
		    },
		    json: true
		};

		request.post(options, function(error, response, body) {
		    if (!error && response.statusCode === 200) {
		        self.access_token = body.access_token;
		    }
		    else {
		    	console.log("something went wrong refreshing token");
		    }
		});
	}
};

