angular.module('KiiFrontTemplate.AppShared')
  .directive('inputOptions', ['$compile', '$timeout', function($compile, $timeout){
    return{
        restrict: 'A',
        replace: false,
        scope:{
            ngModel: '=?',
            inputOptions: '=?'
        },
        link: function(scope, element, attr){

            var dropdown = '';
            dropdown += '<div class="input-options" ng-show="open">';
            dropdown += '  <ul class="dropdown-menu" role="menu">';
            dropdown += '    <li ng-repeat="option in options" role="menuitem" ng-click="selectOption(option)"><a>{{option}}</a></li>';
            dropdown += '  </ul>';
            dropdown += '</div>';

            dropdown = $compile(dropdown)(scope);

            dropdown = $(dropdown).insertAfter(element);

            scope.open = false;
            scope.focused = true;

            scope.options = [];
            $(element).parent().css('position', 'relative');

            scope.$watch('ngModel', function(val){
                getOptions();

                if(!scope.focused) return;
                if(scope.options.length == 0){
                    hide();
                }else{
                    show();
                }
            });

            $(element).on('focus', function(e){
                getOptions();
                placeDropdown();
                scope.focused = true;
            
                var open = scope.options.length > 0? true : false;
                if(open){
                    show();
                }else{
                    hide();
                }
                scope.$apply();
            });

            $(element).on('blur', function(){
                scope.focused = false;
                $timeout(hide, 100);
                scope.$apply();
            });

            scope.selectOption = function(option){
                scope.ngModel = option;
            };

            function placeDropdown(){
                var parentXY = $(element).parent().offset();
                var inputXY = $(element).offset();
                var top = inputXY.top - parentXY.top + $(element).height();
                var left = inputXY.left - parentXY.left;
                dropdown.css({left: left, top: top});
            }

            function getStyle(){
                var width = $(element).outerWidth();
                dropdown.find('ul').css({width: width});
            }

            function show(){
                scope.open = true;
                dropdown.find('ul').show();
                getStyle();
            }

            function hide(){
                scope.open = false;
            }

            function getOptions(){
                scope.options = _.filter(scope.inputOptions, optionFilter);
            }

            function optionFilter(option){
                return option && option.indexOf(scope.ngModel || '') > -1;
            }
        }
    }
  }]);