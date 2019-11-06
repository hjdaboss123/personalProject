"use strict";
angular.module("myApp")
    .filter('reverse', function() {
        return function(items) {
            return items.slice().reverse();
        }
    })

    .controller('mainCtrl', function($rootScope, $scope, $location, $firebaseObject, $window, $firebaseArray, $sce) {
        var user = firebase.auth().currentUser;



        function sanitiseThis(video, body) {
            $rootScope.chosenVideo = $sce.trustAsHtml(video);
            $rootScope.chosenBody = $sce.trustAsHtml(body);
        }

        $scope.savePage = function(chosenTopic, profile) {
            if (profile.type == 'admin') {
                alertify.confirm('Change Topic', 'Would you like to change this topic?', function() {
                    firebase.database().ref('topics/' + chosenTopic.id).set({
                        title: chosenTopic.title,
                        subtitle: chosenTopic.subtitle,
                        blurb: chosenTopic.blurb,
                        body: chosenTopic.body,
                        img: chosenTopic.img,
                        video: chosenTopic.video,
                        type: chosenTopic.type,
                        id: chosenTopic.id
                    })

                    $scope.choseTopic(chosenTopic);
                }, function() {
                    alertify.error('Cancel');
                });
            } else {
                alert("You are not Admin")
            }

        }
        // Get Site Info
        var getSiteInfo = firebase.database().ref('siteInfo');
        getSiteInfo = $firebaseObject(getSiteInfo);
        getSiteInfo.$bindTo($scope, "siteInfo");

        // Get Quiz Info
        var getQuiz = firebase.database().ref('quiz');
        getQuiz = $firebaseObject(getQuiz);
        getQuiz.$bindTo($scope, "quizzes");


        // Search Function

        $scope.showSearch = 0;
        $scope.$watch('search', function(search) {
            $window.location.href = '/#!/home';
            $scope.showSearch = 0;
            for (var i = 0; i < $scope.topics.length; i++) {
                if ($scope.topics[i].type == search) {
                    $scope.showSearch++;
                }

                if ($scope.topics[i].title.toLowerCase().includes(search.toLowerCase())) {
                    $scope.showSearch++;

                }
            }
        });

        $scope.$watch('search2', function() {
            enter = document.getElementById("enter");

        });

        //Search enter event

        let enter = document.querySelector("body");

        enter.addEventListener("keydown", (e) => {

            if (event.keyCode === 13) {
                // Cancel the default action, if needed
                event.preventDefault();

                enter = document.getElementById("enter");
                enter.blur();
                $scope.menu = false;
                // Trigger the button element with a click
                document.getElementById("clickSearch").click();
            }
        })




        //Create profile
        $scope.submitProfile = function(profileName, user) {

            firebase.database().ref('users/' + user.uid).set({
                id: user.uid,
                name: profileName,
                type: "normal"
            })
            // body...
        }

        // Get topics
        const topicList = [];
        var getTopics = firebase.database().ref('topics/');
        getTopics = $firebaseArray(getTopics);
        $scope.topics = getTopics;

        // LOG OUT
        $scope.logout = function() {
            alertify.confirm('System Notice', 'Would you like to logout?', function() {
                firebase.auth().signOut().then(function() {
                    console.log('Logged out');
                    $rootScope.profile = null;
                    alertify.success('Logout Successful');

                }).catch(function(error) {
                    alertify.error('Couldnt log out!');
                    console.log(error)
                });
            }, function() {
                alertify.error('Logout cancelled');
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
                $window.location.href = '/#!/home';
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
        // ********** GET USER *******
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                $rootScope.user = user;
                // GET PROFILE
                var getProfile = firebase.database().ref('users/' + user.uid);
                getProfile = $firebaseObject(getProfile);
                getProfile.$bindTo($rootScope, "profile");
            } else {
                // No user is signed in.
                $rootScope.user = null;
                console.log("No user...");
            }
        });


        // Edit Quiz
        $rootScope.chosenQuiz = null;
        $scope.editQuiz = function(quiz) {
            $rootScope.chosenQuiz = quiz;

            // Get Site Info
            var getSiteInfo = firebase.database().ref('quiz/' + quiz.key + '/questions');
            getSiteInfo = $firebaseArray(getSiteInfo);
            $rootScope.chosenQuestions = getSiteInfo;
            //console.log(getSiteInfo)
            $window.location.href = '/#!/quiz';
        }
        // CHECK QUIZ
        $scope.checkQuiz = function(chosenQuiz, quizId, quiz) {
            alertify.confirm('Submit?', 'Are you done with your quiz?', function() {
                alertify.success('Success');
                var user = firebase.auth().currentUser;
                let points = 0;

                for (var i = 0; i < chosenQuiz.length; i++) {
                    if (chosenQuiz[i].answer) {
                        // Multipl
                        if (chosenQuiz[i].answer == quiz.answer[i].answer) {
                            console.log("CORRECT")
                            points++;
                        }

                    } else {

                        var d, f;
                        if (chosenQuiz[i].fill.d) {
                            d = chosenQuiz[i].fill.d;
                        } else {
                            d = "";
                            quiz.answer[i].fill.d = "";
                        }

                        if (chosenQuiz[i].fill.f) {
                            f = chosenQuiz[i].fill.f;
                        } else {
                            f = "";
                            quiz.answer[i].fill.f = "";
                        }

                        if (chosenQuiz[i].fill.b == quiz.answer[i].fill.b && d == quiz.answer[i].fill.d && f == quiz.answer[i].fill.f) {
                            console.log("correct");
                            points++;
                        }
                    }
                }

                $scope.getScore(points, quizId, user, chosenQuiz.length);

            }, function() {
                alertify.error('Failure')
            });



        }

        $scope.getScore = function(points, quizId, user, maxPoints) {

            firebase.database().ref('users/' + user.uid + "/completedQuizzes/" + quizId).set({
                id: quizId,
                points: points,
                maxPoints: maxPoints

            })
        }

        // Submit Questions
        $scope.addQuestion = function(newQuestion, chosenQuiz) {
            console.log(newQuestion);
            console.log(chosenQuiz);

            var newPostKey = firebase.database().ref().child('quiz/' + chosenQuiz.key + '/questions/').push().key;
            if (newQuestion.type == "fill") {
                firebase.database().ref('quiz/' + chosenQuiz.key + '/questions/' + newPostKey).set({
                    question: newQuestion.question,
                    type: newQuestion.type,
                    fill: newQuestion.fill
                })
            } else {
                firebase.database().ref('quiz/' + chosenQuiz.key + '/questions/' + newPostKey).set({
                    question: newQuestion.question,
                    type: newQuestion.type,
                    possible: newQuestion.possible,
                    answer: newQuestion.answer
                })
            }
        }

        $scope.goToQuiz = function(quiz) {
            $rootScope.chosenQuiz = quiz;

            // Get Site Info
            var getSiteInfo = firebase.database().ref('quiz/' + quiz.key + '/questions');
            getSiteInfo = $firebaseArray(getSiteInfo);
            $rootScope.chosenQuestions = getSiteInfo;
            //console.log(getSiteInfo)
            $window.location.href = '/#!/quiz';
        }


    })

