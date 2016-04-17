'use strict';

/* Main module of the application */

var viChatter = angular.module('viChatter', [
    'ui.router',
    'ngDialog',
    'LocalStorageModule',
    'rzModule'
]);

viChatter.config(
    [
        '$compileProvider',
        '$logProvider',
        '$httpProvider',
        '$stateProvider',
        '$urlRouterProvider',
        'localStorageServiceProvider',
        function ($compileProvider, $logProvider, $httpProvider, $stateProvider, $urlRouterProvider, localStorageServiceProvider) {

            $compileProvider.debugInfoEnabled(true);
            $logProvider.debugEnabled(true);
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('login', {
                    url: '/login',
                    controller: 'LoginPageController',
                    templateUrl: 'app/templates/auth/login.html',
                    authenticate: false
                })
                .state('register', {
                    url: '/register',
                    controller: 'RegisterPageController',
                    templateUrl: 'app/templates/auth/registration.html',
                    authenticate: false
                })
                .state('home', {
                    url: '/',
                    controller: 'LandingPageController',
                    templateUrl: 'app/templates/home/home.html',
                    authenticate: false
                })
                .state('dashboard', {
                    url: '/dashboard',
                    controller: 'DashboardController',
                    templateUrl: 'app/templates/dashboard/dashboard.html',
                    authenticate: true
                });
            $urlRouterProvider.otherwise('/');
        }]);


viChatter.run(function ($rootScope, $state, AuthenticationService) {
   /* $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toState.authenticate && !AuthenticationService.isAuthenticated()) {
            event.preventDefault();
            AuthenticationService.clearUserData();
            $state.go('home');
        } else if (!toState.authenticate && AuthenticationService.isAuthenticated()) {
            event.preventDefault();
            $state.go('dashboard');
        }
    });*/
});
