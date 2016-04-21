angular.module('KiiFrontTemplate.AppShared')
  .directive('textLimit',['$timeout',function($timeout){
    return {
        restrict: 'E',
        templateUrl: 'app/components/AppShared/directives/text-limit/text-limit.template.html',
        replace: true,
        scope:{
            max: '=?',
            ngModel: '=?'
        },
        link: function(scope, element, attrs){
            scope.type = attrs['type'];
        }
    }
  }]);