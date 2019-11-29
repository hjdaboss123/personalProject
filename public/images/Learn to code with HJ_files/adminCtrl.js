"use strict";
angular.module("myApp")
    .controller('adminCtrl', function($rootScope, $scope, $location, $firebaseObject, $window, $firebaseArray, $sce) {

        // CREATE TOPIC
        $scope.createTopic = function(topic) {
            alertify.confirm('Create New Topic', 'Would you like to submit this topic?', function() {
                var newPostKey = firebase.database().ref().child('topics/').push().key;
                var getImage = document.getElementById("fileUpload");
                var storage = firebase.storage().ref();
                var uploadTask = storage.child('topics/' + newPostKey + '/' + getImage.files[0].name);
                uploadTask.put(getImage.files[0]).then(function(snapshot) {
                    storage.child('topics/' + newPostKey + '/' + getImage.files[0].name).getDownloadURL().then(function(url) {
                        console.log(topic)
                        try {
                            firebase.database().ref('topics/' + newPostKey).set({
                                title: topic.title,
                                subtitle: topic.subtitle,
                                body: topic.body,
                                img: url,
                                video: topic.videoLink,
                                type: topic.type,
                                blurb: topic.blurb,
                                id: newPostKey
                            })
                            alertify.success('Topic Made');
                            $scope.newTopic = null;
                            $window.location.href = '/#!/home';

                        } catch (err) {
                            alertify.error('There was an error: ' + err);
                        }
                    })
                });

            }, function() {
                alertify.error('Cancel');
            });
        }


        $scope.createQuiz = function(quiz) {
            console.log(quiz);
            alertify.confirm('Create New Quiz', 'Would you like to submit this quiz?', function() {
                var newPostKey = firebase.database().ref().child('topics/').push().key;
                firebase.database().ref('quiz/' + newPostKey).set({
                    name: quiz.name,
                    difficulty: quiz.difficulty,
                    field: quiz.field,
                    articleKey: quiz.articleKey,
                    key: newPostKey
                })
                firebase.database().ref('topics/' + quiz.articleKey + "/quiz").set(newPostKey);
            }, function() {
                alertify.error('Cancel');
            });
        }




    })