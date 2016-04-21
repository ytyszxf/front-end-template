angular.module('KiiFrontTemplate.AppShared')
  .directive('appSelect',['$timeout',function($timeout){
    return {
        restrict: 'E',
        templateUrl: 'app/components/AppShared/directives/app-select/app-select.template.html',
        replace: true,
        scope:{
            options: '=',
            selectedModel: '=',
            extraSetting: '=?',
            change: '=?',
            disabled: '=?'
        },
        link: function(scope, element, attrs){
            scope.setting = {
                text: 'text',
                value: 'value'
            };
            scope.myClass = attrs.class;
            scope.setting = _.extend(scope.setting, scope.extraSetting);
            scope.selectedOption = {};

            scope.$watch('selectedModel', function(newVal, oldVal){
                if(angular.equals(newVal, oldVal))return;
                init();
            });

            scope.setting.text = attrs.text || scope.setting.text;
            scope.setting.value = attrs.value || scope.setting.value;
            
            scope.selectOption = function(option){
                if(attrs.valueOnly){
                    scope.selectedModel = option[scope.setting.value];
                }else{
                    scope.selectedModel = _.clone(option);
                }
                scope.selectedOption = option;
                
                if(_.isFunction(scope.change)){
                    $timeout(function(){
                        scope.change(scope.selectedModel);    
                    });
                }
            };
            
            if(scope.options && scope.options[0]){
                init();   
            }

            function init(){
                var existFlag = false;
                if(attrs.valueOnly){
                    existFlag = _.find(scope.options,function(option){
                        return option[scope.setting.value] == scope.selectedModel;
                    });
                }else{
                    existFlag = _.find(scope.options,function(option){
                        return angular.equals(option, scope.selectedModel);
                    });
                }
                
                if(!existFlag){
                    scope.selectOption(scope.options[0]);
                }else{
                    scope.selectOption(existFlag);
                }
            }
        }
    }
  }]);