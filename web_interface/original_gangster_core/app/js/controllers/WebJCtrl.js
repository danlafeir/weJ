/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the webJtorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('webJ', [])
	.controller('WebJCtrl', function WebJCtrl($scope) {
		'use strict';

    var getCookie = function(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
      }
      return "";
    };

		var hostIP = "192.168.2.7"; //make this something someone can enter (or grab dynamically)
		var port = "1337";
		var playlist = $scope.playlist = [];

		//Functions to talk to the server
    var serverAPI = {};

    serverAPI.getPlaylist = function(){
      $.ajax({
        url: 'http://' + hostIP + ':' + port + '/playlist/getPlaylist',
        xhrFields: {
          'Access-Control-Allow-Origin' : '*'
        },
        type: 'GET',
        success: function(res){
          $scope.currentSong = JSON.parse(res)[0];
          $scope.playlist = JSON.parse(res).splice(1);
          $scope.$apply();
        }
      });
    };

    serverAPI.requestSong = function(uri, title, duration){
      $.ajax({
        url: 'http://' + hostIP + ':' + port + '/playlist/requestsong?songURI=' + uri + '&songTitle=' + title + '&songDuration=' + duration,
        xhrFields: {
          'Access-Control-Allow-Origin' : '*'
        },
        type: 'GET',
        success: function(res){
          console.log("song request");
        }
      });
    };

    serverAPI.login = function(username){
      $.ajax({
        url: 'http://' + hostIP + ':' + port + '/users/add?username=' + username,
        xhrFields: {
          'Access-Control-Allow-Origin' : '*'
        },
        type: 'GET',
        success: function(res){
          //console.log(res);
          $scope.user = res;
        }
      });
    };

    serverAPI.getNotifications = function(){
      $.ajax({
        url: 'http://' + hostIP + ':' + port + '/notifications/get',
        xhrFields: {
          'Access-Control-Allow-Origin' : '*'
        },
        type: 'GET',
        success: function(res){
          //console.log(res);
          $scope.notifications = res.reverse();
          $scope.$apply();
        }
      });
    };

  		//should use web sockets for this
    serverAPI.getPlaylist();
  	window.setInterval(serverAPI.getPlaylist, 1000);

		//request a song (probably could use fixing)
		$('.typeahead').on('typeahead:selected', function(evt, datum) {
  			console.log("the uri: " + datum.uri);
  			$('#songTitle').attr('value', datum.val);
  			$('#songURI').attr('value', datum.uri);
  			$('#songDuration').attr('value', datum.duration_ms);
		});

		$scope.addSong = function(){
			if($('#songTitle').val() !== ""){
				$scope.playlist.push({title: $('#songTitle').val(), upvotes: 0, downvotes: 0 });
        serverAPI.requestSong($('#songURI').val(), $('#songTitle').val(), $('#songDuration').val());
				$('.typeahead.tt-input').val('');
        $('#songTitle').attr('value', '');
        $('#songURI').attr('value', '');
        $('#songDuration').attr('value', '');
			}
		}

		$scope.upvote = function(song) {
			$.get('http://' + hostIP + ':' + port + '/playlist/upvote?song=' + encodeURIComponent(song.title), function(res){
          $scope.user = res.user;
          $scope.currentSong = JSON.parse(res.playlist)[0];
          $scope.playlist = JSON.parse(res.playlist).splice(1);
          $scope.$apply();
        }
      );
		}

    $scope.downvote = function(song) {
      $.get('http://' + hostIP + ':' + port + '/playlist/downvote?song=' + encodeURIComponent(song.title), function(res){
          $scope.user = res.user;
          $scope.currentSong = JSON.parse(res.playlist)[0];
          $scope.playlist = JSON.parse(res.playlist).splice(1);
          $scope.$apply();
        }
      );
    }


    //User
		$scope.login = function(){
			$scope.user = serverAPI.login($('#loginInput').val());
		}

    //Notification Center
    serverAPI.getNotifications();
    window.setInterval(serverAPI.getNotifications, 1000);


	});
