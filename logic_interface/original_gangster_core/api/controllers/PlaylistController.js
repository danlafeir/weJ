
/**
 * PlaylistController
 *
 * @description :: Server-side logic for managing the playlist
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
//var request = require('request'); // "Request" library

module.exports = {

  //Regular User Endpoints:
	upvote: function(req, res){
		console.log("song: " + req.query.song + " voter: " +Users.userList[req.ip].username + " upvote");
		if(Playlist.upvote(req.query.song, req.ip) === true){
	  Notifications.addNotification(Users.userList[req.ip].username+ " upvoted " + req.query.song);
	}
		return res.send({playlist: Playlist.getPlaylist(), user: Users.userList[req.ip]});
	},

	downvote: function(req,res){
	console.log("song: " + req.query.song + " voter: " + Users.userList[req.ip].username + " downvote");
	if(Playlist.downvote(req.query.song, req.ip) === true){
	  Notifications.addNotification(Users.userList[req.ip].username + " downvoted " + req.query.song);
	};
	return res.send({ playlist: Playlist.getPlaylist(), user: Users.userList[req.ip]});
	},

	requestsong: function(req, res){
    console.log(Users.userList[req.ip].username + " requested " + req.query.songTitle);
    if(req.query.songURI === "" || req.query.songTitle === "" || req.query.songDuration === ""){
      console.log("Error: Song request was missing something");
      return res.send("error");
    }
    
	if(Playlist.addSong(req.query.songURI, req.query.songTitle, req.query.songDuration) === true){
      Notifications.addNotification(Users.userList[req.ip].username + " requested " + req.query.songTitle);
    };
		return res.send(Playlist.getPlaylist());
	},

	getPlaylist: function(req, res){
		return res.send(Playlist.getPlaylist());
	},

	//Admin Endpoints:
	removeSong: function(req, res){
		Playlist.removeSong(req.query.songTitle);
		return res.send(req.query.songTitle + " Removed");
	}

};
