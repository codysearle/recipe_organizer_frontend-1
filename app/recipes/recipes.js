'use strict';

angular.module('myApp.recipes', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/recipes', {
            templateUrl: 'recipes/recipes.html',
            controller: 'RecipesCtrl'
        });
    }])

    .controller('RecipesCtrl', ['$scope', 'Restangular', '$modal', function ($scope, Restangular, $modal) {
        Restangular.all('recipes').getList().then(function (recipes) {
            $scope.recipes = recipes;
        });

        $scope.deleteRecipe = function (recipeID) {
            Restangular.one('recipes', recipeID).customDELETE().then(function () {
                $location.path('/recipes');
            })
        }

        $scope.items = ['item1', 'item2', 'item3'];

        $scope.open = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'recipes/myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (recipe) {
                $scope.recipes.push(recipe);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }])
    .controller('ModalInstanceCtrl', ['$scope', 'Restangular', '$modalInstance', 'items', function ($scope, Restangular, $modalInstance, items) {
        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function (recipe) {
            $modalInstance.close(recipe);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.recipe = {
            ingredients: [],
            tags: []
        };

        // Add the ingredients to the recipe object we're building
        $scope.addIngredientToRecipe = function(ingredientName) {
            var ingredient = {name: ingredientName};
            $scope.recipe.ingredients.push(ingredient);
            $scope.ingredientName = '';
        };

        // Add the tags to the recipe object we're building
        $scope.addTagToRecipe = function (tagName) {
            var tag = {name: tagName};
            $scope.recipe.tags.push(tag);
            $scope.tagName = '';
        };

        // Add a new recipe, alert the user when it's been created or when there was a problem.
        $scope.addRecipe = function () {
            Restangular.all('add-recipe').customPOST($scope.recipe).then(function (recipe) {
                    alert("Your recipe was successfully created");
                    $scope.ok(recipe)
                },
                function () {
                    alert("There was a problem creating your recipe. Please try again.")
                })}
    }]);


