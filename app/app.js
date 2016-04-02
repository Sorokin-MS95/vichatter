var app = angular.module('viChatter', ['ui.router']);

app.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/home',
        controller : 'AuthenticationController'
    }).state('sign-in', {
        url: '/signin',
        templateUrl: 'app/views/signin.html',
        controller: 'AuthenticationController'
    }).state('sign-up', {
        url: '/signup',
        templateUrl: 'app/views/signup.html',
        controller: 'AuthenticationController'
    });
    $urlRouterProvider.otherwise('/home');
    /*$locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });*/
    
})
