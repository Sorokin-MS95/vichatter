var app = angular.module('viChatter', ['ui.router']);

app.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/home'
    }).state('sign-in', {
        url: '/signin',
        templateUrl: 'app/signin/signin.html',
        controller: 'SignInController'
    }).state('sign-up', {
        url: '/signup',
        templateUrl: 'app/signup/signup.html',
        controller: 'SignUpController'
    });
    $urlRouterProvider.otherwise('/home');
    /*$locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });*/
    
})
