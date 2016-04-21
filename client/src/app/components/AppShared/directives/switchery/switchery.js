angular.module('KiiFrontTemplate.AppShared').directive('switchery', ['$timeout', function($timeout) {
    return {
        restrict: 'E',
        scope: {
            on: '=ngModel',
            reverse: '=?',
            ngChange: '&'
        },
        templateUrl: 'app/components/AppShared/directives/switchery/switchery.template.html',
        replace: true,
        link: function(scope, element, attrs) {
            // scope.on = scope.ngModel;
            scope.yesText = attrs['yesText'] || '';
            scope.noText = attrs['noText'] || '';
            scope.switch = function() {
                if (attrs.hasOwnProperty('readonly')) return;
                scope.on = !scope.on;
            }
            if (scope.ngChange && typeof(scope.ngChange) === 'function') {
                scope.$watch('on', function(newValue, oldValue) {
                    if (newValue === undefined || oldValue === undefined) return;
                    scope.$eval(scope.ngChange);
                });
            }
        }
    };
}]);
