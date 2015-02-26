/**
* Notifications.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {},
  notificationList: [],
  newNotifications: [],
  addNotification: function(note){
    this.notificationList.push(note);
  },
  getNotifications: function(){
    var indexToSlice = this.notificationList.length > 20 ?  (this.notificationList.length - 20) : 0;
    return this.notificationList.slice(indexToSlice);
  },
  clearNotifications: function(){
    if(this.notificationList.length > 20){
      this.notificationList = this.notificationList.slice((this.notificationList.length - 20));
    }
    //this.notificationList = [];
  }

};

