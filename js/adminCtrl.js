"use strict";
angular.module("myApp")
    .controller('adminCtrl', function($rootScope, $scope, $location, $firebaseObject, $window, $firebaseArray, $sce) {

        // CREATE TOPIC
        $scope.createTopic = function(topic) {
            var newPostKey = firebase.database().ref().child('topics/').push().key;
            try {
                firebase.database().ref('topics/' + newPostKey).set({
                    title: topic.title,
                    subtitle: topic.subtitle,
                    body: topic.body,
                    // Image
                    video: topic.videoLink,
                    type: topic.type,
                    id: newPostKey
                })
                console.log("Upload successful")
            } catch (err) {
                console.log(err)
            }


        }
        





    })