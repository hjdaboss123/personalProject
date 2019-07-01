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


        // MOCK DB
        $scope.hero = {
            title: "Clint",
            subtitle: "Westwood",
            bck: "https://upload.wikimedia.org/wikipedia/en/f/fb/Steve_Rogers_%26_Captain_America_MCU.jpg"

        }

        $scope.homeIntro = {
            title: "Our Page",
            subtitle: "Learn Coding",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus volutpat ex sed scelerisque semper. Vivamus lobortis efficitur diam laoreet aliquet. Quisque hendrerit, eros quis gravida facilisis, ex augue dignissim tortor, eget congue nunc nulla in odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis sapien nisl, accumsan vel metus nec, varius rutrum sem. Phasellus semper lectus nisl, et elementum enim pellentesque eget. Curabitur laoreet urna sed sem tincidunt commodo. In hac habitasse platea dictumst. Aliquam sit amet nunc mi. Etiam sed nibh at arcu pellentesque blandit sit amet sed elit. Suspendisse in tincidunt turpis. Pellentesque rhoncus massa id mi ultrices porta.",
            social: [{
                    link: "http://www.youtube.com",
                    image: "/images/ytIcon.png",
                    text: "Youtube",
                },
                {
                    link: "mailto:kimh2@dc.edu.hk",
                    image: "/images/emailIcon.png",
                    text: "Email",
                },
                {
                    link: "tel:+85263258274",
                    image: "/images/phoneIcon.png",
                    text: "Phone",
                },
            ]
        }

        $scope.topics = [{
                title: "Machine Learning",
                subtitle: "AI in the future",
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/WFSYO1_UoVM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit erat ut eros ullamcorper, at aliquam elit cursus. Quisque auctor arcu vitae turpis suscipit sollicitudin. Aliquam accumsan ac felis iaculis suscipit. Nam volutpat urna eu nisl maximus, vel ultrices nulla pellentesque. ",
                category: "c++",
                thumbnail: "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                title: "The <h2> tag -webdev",
                subtitle: "AI in the future",
                video: '<iframe width="560" height="315" src="" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit erat ut eros ullamcorper, at aliquam elit cursus. Quisque auctor arcu vitae turpis suscipit sollicitudin. Aliquam accumsan ac felis iaculis suscipit. Nam volutpat urna eu nisl maximus, vel ultrices nulla pellentesque. ",
                category: "webdev",
                thumbnail: "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                title: "Variables -Python",
                subtitle: "AI in the future",
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/WFSYO1_UoVM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit erat ut eros ullamcorper, at aliquam elit cursus. Quisque auctor arcu vitae turpis suscipit sollicitudin. Aliquam accumsan ac felis iaculis suscipit. Nam volutpat urna eu nisl maximus, vel ultrices nulla pellentesque. ",
                category: "python",
                thumbnail: "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                title: "for-loops -C++",
                subtitle: "AI in the future",
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/WFSYO1_UoVM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit erat ut eros ullamcorper, at aliquam elit cursus. Quisque auctor arcu vitae turpis suscipit sollicitudin. Aliquam accumsan ac felis iaculis suscipit. Nam volutpat urna eu nisl maximus, vel ultrices nulla pellentesque. ",
                category: "c++",
                thumbnail: "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                title: "The <h1> tag -webdev",
                subtitle: "AI in the future",
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/WFSYO1_UoVM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit erat ut eros ullamcorper, at aliquam elit cursus. Quisque auctor arcu vitae turpis suscipit sollicitudin. Aliquam accumsan ac felis iaculis suscipit. Nam volutpat urna eu nisl maximus, vel ultrices nulla pellentesque. ",
                category: "webdev",
                thumbnail: "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                title: "the <p> tag -webdev",
                subtitle: "AI in the future",
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/WFSYO1_UoVM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit erat ut eros ullamcorper, at aliquam elit cursus. Quisque auctor arcu vitae turpis suscipit sollicitudin. Aliquam accumsan ac felis iaculis suscipit. Nam volutpat urna eu nisl maximus, vel ultrices nulla pellentesque. ",
                category: "webdev",
                thumbnail: "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                title: "if-loops -Python",
                subtitle: "AI in the future",
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/WFSYO1_UoVM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit erat ut eros ullamcorper, at aliquam elit cursus. Quisque auctor arcu vitae turpis suscipit sollicitudin. Aliquam accumsan ac felis iaculis suscipit. Nam volutpat urna eu nisl maximus, vel ultrices nulla pellentesque. ",
                category: "python",
                thumbnail: "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                title: "Hello World -Python",
                subtitle: "AI in the future",
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/WFSYO1_UoVM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit erat ut eros ullamcorper, at aliquam elit cursus. Quisque auctor arcu vitae turpis suscipit sollicitudin. Aliquam accumsan ac felis iaculis suscipit. Nam volutpat urna eu nisl maximus, vel ultrices nulla pellentesque. ",
                category: "python",
                thumbnail: "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                title: "Arrays -C++",
                subtitle: "AI in the future",
                video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/WFSYO1_UoVM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit erat ut eros ullamcorper, at aliquam elit cursus. Quisque auctor arcu vitae turpis suscipit sollicitudin. Aliquam accumsan ac felis iaculis suscipit. Nam volutpat urna eu nisl maximus, vel ultrices nulla pellentesque. ",
                category: "c++",
                thumbnail: "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500"
            }

        ]





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