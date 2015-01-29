'use strict';

angular.module('myApp.landing', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/landing', {
    templateUrl: 'landing/landing.html',
    controller: 'LandingCtrl'
  });
}])

.controller('LandingCtrl', ['$scope', 'Restangular', function($scope, Restangular) {
    Restangular.all('landing').getList().then(function(landing) {
        $scope.landing = landing;
    });

    $scope.deleteRecipe = function(recipeID) {
        Restangular.one('landing', recipeID).customDELETE().then(function(){
            $location.path('/landing');
        })
    }
}]);