/**
 * Created by Pyke-Laptop on 25-04-2017.
 */
'use strict';

angular.module('myApp.loginScreen', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/loginScreen', {
            templateUrl: 'loginScreen/loginScreen.html',
            controller: 'loginScreenCtrl'
        });
    }])

    .controller('loginScreenCtrl', [function() {

    }]);

