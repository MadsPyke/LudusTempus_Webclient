'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Oprettelse', {
    templateUrl: 'Oprettelse/Oprettelse.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {

}]);

function submit() {
  window.alert("Not implemented yet! LUL!")

}