angular.module('myApp.AppShared')
    .directive('validateMessage', ['$timeout', function($timeout) {
        var timer;
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                status: '=',
                errors: '='
            },
            templateUrl: 'app/components/AppShared/directives/validate-message/validate-message.template.html',
            link: function(scope, element, attrs) {
                
            },
            controller: ['$scope', function($scope){
                $scope.errorFilter = function(error){
                    return $scope.status && $scope.status[error.statusName];
                };
            }]
        }
    }]);