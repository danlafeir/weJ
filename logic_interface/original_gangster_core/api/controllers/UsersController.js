/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  //Admin Endpoints:
  giveUserMoreUpVotes: function(req, res){
    Users.giveUserMoreUpVotes(req.query.username, req.query.numberOfVotes);
  },
  giveUserMoreDownVotes: function(req, res){
    Users.giveUserMoreDownVotes(req.query.username, req.query.numberOfVotes);
  },
  unblockUser: function(req,res){

  },
  refreshUserVotes: function(req, res){
    Users.refreshAllUserVotes();
    return res.send("Votes Refreshed");
  },

  //User Endpoints:
  add: function(req,res){
    console.log("Add user " + req.query.username + " with ip " + req.ip);
    Users.addUser({ 'username' : req.query.username, 'ip' : req.ip });
    return res.send(Users.userList[req.ip]);
  }

};

