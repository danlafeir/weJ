/**
 * NotificationsController
 *
 * @description :: Server-side logic for managing notifications
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  get: function(req, res){
    return res.send(Notifications.getNotifications());
  },
  clear: function(req, res){
    Notifications.clearNotifications();
  }

};

