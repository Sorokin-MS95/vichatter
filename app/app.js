var app = angular.module('viChatter', ['ui.router']);

app.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {

    $stateProvider.state('index', {
        url: '/',
        templateUrl: 'app/views/auth/index.html',
        resolve: {authenticated: authenticate}
    }).state('sign-in', {
        url: '/signin',
        templateUrl: 'app/views/auth/signin.html',
        controller: 'AuthenticationController'
    }).state('sign-up', {
        url: '/signup',
        templateUrl: 'app/views/auth/signup.html',
        controller: 'AuthenticationController'
    }).state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/views/user/dashboard.html',
        controller: 'DashboardController',
        resolve: {authenticated: authenticate}
    });


    function authenticate($q, AuthenticationService, $state) {
        if (AuthenticationService.isLoggedIn()) {
            $q.when();
        } else {
            AuthenticationService.logout();
            $state.go('sign-in');
        }
    }


    $urlRouterProvider.otherwise('/');

})
