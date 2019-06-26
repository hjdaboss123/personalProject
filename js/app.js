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
        .when("/topic", {
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
        .otherwise({
            redirectTo: '/home'
        });
});



