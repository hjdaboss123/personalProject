"use strict";
angular.module("myApp")
    .controller('mainCtrl', function($rootScope, $scope, $location, $firebaseObject, $window, $firebaseArray, $sce) {


        $rootScope.chosenTopic = null;
        $scope.choseTopic = function(topic) {
            console.log("sadfasdfsadf")
            $rootScope.chosenTopic = topic;
            sanitiseThis(topic.video)
        }

        function sanitiseThis(video) {
            $rootScope.chosenVideo = $sce.trustAsHtml(video);
        }


        // Get Site Info

        var getHome = firebase.database().ref('siteInfo/homePage');
        getHome = $firebaseObject(getHome);
        getHome.$bindTo($scope, "homePage")

        
       
        





    })