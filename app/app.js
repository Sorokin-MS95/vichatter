var app = angular.module('viChatter', ['ui.router']);

app.config(function ($stateProvider) {
    $stateProvider.state('sign-in', {
        url: '/signin',
        templateUrl: 'app/signin/signin.html',
        controller: 'SignInController'
    }).state('sign-up', {
        url: '/signup',
        templateUrl: 'app/signup/signup.html',
        controller: 'SignUpController'
    })
})
