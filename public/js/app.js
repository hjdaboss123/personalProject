angular.module("myApp", ['ngSanitize'])

var app = angular.module("myApp", ["ngRoute", 'firebase']);

app.directive('navbar', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/navbar.html'
    }
});

app.directive('footsie', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/footsie.html'
    }
});

app.directive('contact', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/contact.html'
    }
});


app.config(function($routeProvider) {
    $routeProvider
        .when("/account", {
            templateUrl: "account.html",
        })
        .when("/topic/:a", {
            templateUrl: "topic.html",
        })
        .when("/contact", {
            templateUrl: "contact.html",
        })
        .when("/admin", {
            templateUrl: "admin.html",
        })
        .when("/home", {
            templateUrl: "home.html",
        })
        .when("/quiz/:a", {
            templateUrl: "quiz.html",
        })
        .when("/profile", {
            templateUrl: "profile.html",
        })
        .otherwise({
            redirectTo: '/home'
        });
});