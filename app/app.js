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
                    templateUrl: 'app/templates/auth/login.html'
                })
                .state('register', {
                    url: '/register',
                    controller: 'RegisterPageController',
                    templateUrl: 'app/templates/auth/registration.html'
                })
                .state('home', {
                    url: '/',
                    controller: 'LandingPageController',
                    templateUrl: 'app/templates/home/home.html'
                })
                .state('dashboard', {
                    url: '/dashboard',
                    controller: 'DashboardController',
                    templateUrl: 'app/templates/dashboard/dashboard.html'/*,
                    resolve: {authenticated: authenticate}*/
                });

            function authenticate($q, AuthenticationService, $state) {
                if (AuthenticationService.isAuthenticated()) {
                    $q.when();
                } else {
                    AuthenticationService.logout();
                    $state.go('login');
                }
            }


            $urlRouterProvider.otherwise('/');
        }])
;