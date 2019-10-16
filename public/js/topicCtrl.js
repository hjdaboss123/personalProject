"use strict";
angular.module("myApp")


    .controller('topicCtrl', function($rootScope, $scope, $location, $firebaseObject, $window, $firebaseArray, $sce) {
        let topicPath = $location.path();
        let chosenVideo = document.getElementById("chosenVideo");
        let chosenBody = document.getElementById("chosenBody");

        topicPath = topicPath.slice(7, 27);
        console.log(topicPath);

        function sanitiseThis(video, body) {
            // $rootScope.chosenVideo = $sce.trustAsHtml(video);
            // $rootScope.chosenBody = $sce.trustAsHtml(body);
            console.log($rootScope.chosenVideo);

        }

        // Get Site Info
        var getSiteInfo = firebase.database().ref('topics/' + topicPath);
        getSiteInfo = $firebaseObject(getSiteInfo);
        $rootScope.chosenTopic = getSiteInfo;

        setTimeout(function() {
            // sanitiseThis($rootScope.chosenTopic.video, $rootScope.chosenTopic.body);

            $rootScope.chosenVideo = $sce.trustAsHtml($rootScope.chosenTopic.video);
            $rootScope.chosenBody = $sce.trustAsHtml($rootScope.chosenTopic.body);

            chosenVideo.innerHTML = $rootScope.chosenVideo;
            chosenBody.innerHTML = $rootScope.chosenBody;
        }, 300)



    })