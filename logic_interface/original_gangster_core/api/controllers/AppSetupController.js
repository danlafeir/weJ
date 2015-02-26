/**
 * AppSetupController
 *
 * @description :: Server-side logic for managing setting up the App
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


var request = require('request');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');


module.exports = {
	startPlaying: function(req, res){
		Playlist.letsGetThePartyStarted();
    console.log("Have Fun");
		return res.send("Have Fun!");
	},
	login: function (req, res){
	  	return res.redirect('https://accounts.spotify.com/authorize?' +
			  	querystring.stringify({
			   		response_type: 'code',
			      	client_id: AppConfig.client_id,
			      	scope: AppConfig.scope,
			      	redirect_uri: AppConfig.redirect_uri,
			    }));
    },
    setcreds: function(req, res){
    	// your application requests refresh and access tokens
	  	// after checking the state parameter
	  	var code = req.query.code || null;

		    var authOptions = {
		      url: 'https://accounts.spotify.com/api/token',
		      form: {
		        code: code,
		        redirect_uri: AppConfig.redirect_uri,
		        grant_type: 'authorization_code'
		      },
		      headers: {
		        'Authorization': 'Basic ' + (new Buffer(AppConfig.client_id + ':' + AppConfig.client_secret).toString('base64'))
		      },
		      json: true
		    };

		    request.post(authOptions, function(error, response, body) {
		      	if (!error && response.statusCode === 200) {
			        var access_token = body.access_token,
			            refresh_token = body.refresh_token;

			        AppConfig.access_token = access_token;
			        AppConfig.refresh_token = refresh_token;

			        var options = {
			          url: 'https://api.spotify.com/v1/me',
			          headers: { 'Authorization': 'Bearer ' + access_token },
			          json: true
			        };

			        // use the access token to access the Spotify Web API
			        request.get(options, function(error, response, metadata) {
			        	req.session.tokens = {
				            access_token: access_token,
				            refresh_token: refresh_token
				        };
				        console.log("UserID: " + response.body.id);
				        Playlist.userId = response.body.id;

				        options = {
				          url: 'https://api.spotify.com/v1/users/' + Playlist.userId + '/playlists',
				          headers: { 'Authorization': 'Bearer ' + access_token },
				          json: true
				        };

				        // use the access token to access the Spotify Web API
				        request.get(options, function(error, response, metadata) {
				        	req.session.tokens = {
					            access_token: access_token,
					            refresh_token: refresh_token
					        };
					        response.body.items.forEach(function(playlist){
					        	if(playlist.name === "webJ"){
					        		Playlist.playlistId = playlist.id;
					        	}
					        });

					        console.log("Playlist Id: " + Playlist.playlistId);

					    });
				    });
			    }
			    else{
			    	console.log("something went wrong getting the /me")
			    }
		    });
		// }

      AppConfig.startTokenRefreshLoop();
      return res.send("Log In Successful");
    }
};

