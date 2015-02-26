/**
* Playlist.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var request = require('request');
var events = require('events');

var Loop2 = function(time) {
    this.time = time;
    var that;
    events.EventEmitter.call(this);

    this.init = function()
    {
        that = this;
        setTimeout(that.run,that.time);
    };

    this.run = function()
    {
       that.emit('Event2');
    };
}

Loop2.prototype.__proto__ = events.EventEmitter.prototype;

var something = null;

module.exports = {

  attributes: {},
  playlist: [],
  songsInPlaylist: [],
  userId: '',
  playlistId: '',
  songPlaying: '',
  onDeck: '',
  time: 123293,

  getNextSongToAdd: function(){
    //add a way to add songs from top 40 if playlist is getting low
    var song = this.playlist[0];
    this.playlist = this.playlist.splice(1);
    this.songPlaying = song;

    return song;
  },

  addSongOnSpotify: function(uri){
    var addTrackUrl = 'https://api.spotify.com/v1/users/' + Playlist.userId + '/playlists/' + Playlist.playlistId + '/tracks?uris=' + uri;
    console.log(addTrackUrl);
    options = {
      url: addTrackUrl,
      headers: { 'Authorization': 'Bearer ' + AppConfig.access_token },
      json: true
    };

    // use the access token to access the Spotify Web API
    request.post(options, function(error, response, metadata) {
      console.log(response.body);
    });
  },

  changeOnSpotify: function(uri){
    var song = this.getNextSongToAdd();
    uri = song.uri;
    var duration = song.duration;

    this.addSongOnSpotify(uri);
    this.time = duration;

    this.letsGetThePartyStarted();
  },

  letsGetThePartyStarted: function(){
    var loop = new Loop2(this.time);
    loop.init();
    loop.on('Event2',function () {
      console.log('event loop triggered');
        Playlist.changeOnSpotify();
    });
  },

  addSong: function(songURI, songTitle, songDuration){
    if(this.songsInPlaylist[songURI] === undefined) {
      this.songsInPlaylist[songURI] = true;
      this.playlist.push({title: songTitle, upvotes: 0, downvotes: 0, uri: songURI, duration: songDuration});
      return true;
    }
    return false;
  },
  downvote: function(songTitle, userIP){
    var indexToDelete = null;
    this.playlist.forEach(function(song, index){
      if(song.title === songTitle && Users.userList[userIP].downvotesLeft > 0){
        song.downvotes--;
        Users.userList[userIP].downvotesLeft--;
        //song[userIP+"-downvote"] = true;
        if(song.downvotes === -5){
          indexToDelete = index;
        }
      }
      else {
        return false;
      }
    });
    if(indexToDelete !== null){
      this.playlist.splice(indexToDelete,1);
    }
    this.sortPlaylist();
    return true;
  },
  upvote: function(songTitle, userIP){
    //could probably do better
    this.playlist.forEach(function(song){
      if(song.title === songTitle && Users.userList[userIP].upvotesLeft > 0){
        song.upvotes++;
        Users.userList[userIP].upvotesLeft--;
        //song[userIP+"-upvote"] = true;
      }
      else {
        return false;
      }
    });
    this.sortPlaylist();
    return true;
  },
  sortPlaylist: function(){
    var comparator = function(songA, songB){
      if ((songA.upvotes+songA.downvotes) > (songB.upvotes+songB.downvotes)) {
        return -1;
      }
      else if ((songA.upvotes+songA.downvotes) < (songB.upvotes+songB.downvotes)) {
        return 1;
      }
      return 0
    }

    this.playlist.sort(comparator);
  },
  getPlaylist: function(){
    return JSON.stringify([this.songPlaying].concat(this.playlist));
  },
  removeSong: function(songTitle){
    var indexToDelete = null;
    this.playlist.forEach(function(song, index){
      if(song.title === songTitle){
        indexToDelete = index;
      }
    });
    if(indexToDelete !== null){
      this.playlist.splice(indexToDelete,1);
    }
  }

};

