'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.recipes',
    'myApp.recipeDetail',
    'myApp.addRecipe',
    'myApp.version',
    'myApp.landing',
    'restangular',
    'ui.bootstrap'
]).
    config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
        $routeProvider.otherwise({redirectTo: '/landing'});

        RestangularProvider.setBaseUrl('http://localhost:8001')

    }]);