/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {},
  userList: [],
  usernameToIpMap: {},
  user:{
    username: null,
    ip: null,
    upvotesLeft: 1,
    downvotesLeft: 1,
    blocked: false
  },
  blockUser: function(username, time){
    this.userList[this.usernameToIpMap[username]].blocked = true;
    //setTimeout(function() { user.blocked = false }, time);
  },
  unblockUser: function(user){
    this.userList[this.usernameToIpMap[username]].blocked = false;
  },
  addUser: function(options){
    var usernameToAdd = options.username || "default";
    var ipToAdd = options.ip || "0.0.0.0";

    if(this.userList[ipToAdd] !== undefined){
      this.userList[ipToAdd].username = usernameToAdd;
    }
    else{
      this.userList[ipToAdd] = {
        username      : usernameToAdd,
        ip            : ipToAdd,
        upvotesLeft   : 20,
        downvotesLeft : 5,
        blocked       : false
      };
    }
    this.usernameToIpMap[usernameToAdd] = ipToAdd;
    console.log(this.userList[ipToAdd]);
  },
  refreshAllUserVotes: function(){
    var self = this;
    Object.keys(this.userList).forEach(function(key) {
      self.userList[key].upvotesLeft = 20;
      self.userList[key].downvotesLeft = 5;
    });
    Notifications.addNotification("Votes Refreshed");
  },
  getUser: function(username){},
  giveUserMoreUpVotes: function(username, numberOfVotes){
    this.userList[this.usernameToIpMap[username]].upvotesLeft += numberOfVotes;
  },
  giveUserMoreDownVotes: function(username, numberOfVotes){
    this.userList[this.usernameToIpMap[username]].downvotesLeft += numberOfVotes;
  }

};

