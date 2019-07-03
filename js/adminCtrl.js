"use strict";
angular.module("myApp")
    .controller('adminCtrl', function($rootScope, $scope, $location, $firebaseObject, $window, $firebaseArray, $sce) {

        // CREATE TOPIC
        $scope.createTopic = function(topic) {
            var newPostKey = firebase.database().ref().child('topics/').push().key;
            var getImage = document.getElementById("fileUpload");
            console.log(getImage.files[0].name);
            var storage = firebase.storage().ref();
            var uploadTask = storage.child('topics/' + newPostKey + '/' + getImage.files[0].name);
            uploadTask.put(getImage.files[0]).then(function(snapshot) {
                storage.child('topics/' + newPostKey + '/' + getImage.files[0].name).getDownloadURL().then(function(url) {
                    console.log(url)
                    try {
                        firebase.database().ref('topics/' + newPostKey).set({
                            title: topic.title,
                            subtitle: topic.subtitle,
                            body: topic.body,
                            img: url,
                            video: topic.videoLink,
                            type: topic.type,
                            id: newPostKey
                        })
                        console.log("Upload successful")
                    } catch (err) {
                        console.log(err)
                    }
                })
            });


        }


        const uploadFile = (key) => {






        }




    })