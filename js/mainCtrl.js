"use strict";
angular.module("myApp")
    .filter('reverse', function() {
        return function(items) {
            return items.slice().reverse();
        }
    })

    .controller('mainCtrl', function($rootScope, $scope, $location, $firebaseObject, $window, $firebaseArray, $sce) {


        $rootScope.chosenTopic = null;
        $scope.choseTopic = function(topic) {
            console.log("sadfasdfsadf")
            $rootScope.chosenTopic = topic;
            sanitiseThis(topic.video, topic.body)
        }

        function sanitiseThis(video, body) {
            $rootScope.chosenVideo = $sce.trustAsHtml(video);
            $rootScope.chosenBody = $sce.trustAsHtml(body);
        }



        // Get Site Info
        var getHome = firebase.database().ref('siteInfo/homePage');
        getHome = $firebaseObject(getHome);
        getHome.$bindTo($scope, "homePage");



        // Get topics
        var getTopics = firebase.database().ref('topics/');
        getTopics = $firebaseArray(getTopics);
        $scope.topics = getTopics;

        
       
        





        // LOG OUT
        $scope.logout = function() {

            firebase.auth().signOut().then(function() {
                console.log('Logged out');

            }).catch(function(error) {
                alertify.error('Could log out!');
                console.log(error)
            });


        };

        var provider = new firebase.auth.GoogleAuthProvider();
        // Google Login
        $scope.googleLogin = function() {
            firebase.auth().signInWithRedirect(provider);
            firebase.auth().getRedirectResult().then(function(result) {
                console.log(result)
                if (result.credential) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // ...
                }
                // The signed-in user info.
                var user = result.user;
                $window.location.href = '/#!/home'
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                console.log(errorCode)
                // ...
            });
        };

        // Current User *********************************************************************
        var user = firebase.auth().currentUser;

        // ********** GET USER *******
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                $rootScope.user = user;
                // GET PROFILE
                var getProfile = firebase.database().ref('users/' + user.uid);
                getProfile = $firebaseObject(getProfile);
                getProfile.$bindTo($rootScope, "profile");
                $window.location.href = '/#!/home'
            } else {
                // No user is signed in.
                $rootScope.user = null;
                console.log("No user...");
            }
        });





    })