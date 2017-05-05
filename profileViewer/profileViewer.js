'use strict';

angular.module('myApp.profileViewer', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profileViewer', {
    templateUrl: 'profileViewer/profileViewer.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {

}]);

function myFunction1(n1, n2) {
    return n1 + n2;
}

function myFunction2() {
    window.alert("Not implemented yet! LUL!");
}

function faaStudieNr(val){
    return val + 1;
}