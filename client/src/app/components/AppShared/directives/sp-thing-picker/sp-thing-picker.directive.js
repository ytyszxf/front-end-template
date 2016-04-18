angular.module('myApp.AppShared')
  .directive('spThingPicker', ['$compile', function($compile){
    return{
        replace: true,
        restrict: 'E',
        templateUrl: 'app/components/AppShared/directives/sp-thing-picker/sp-thing-picker.template.html',
        scope: {
            ngModel: '=?',
            myApp: '=',
            selectedThings: '=?'
        },
        controller: ['$scope', 'AppConfig', function($scope, AppConfig){
            $scope.myDevices = [];
            $scope.searchParam = {};

            $scope.selectChange = function(){
                $scope.ngModel = _.where($scope.myDevices, {_selected: true});
            };

            /**
             * thing search options
             * @type {Array}
             */
            $scope.searchOptions = [
                {type: 'string', text: '_vendorThingID', value: '_vendorThingID'},
                {type: 'string', text: '_thingID', value: '_thingID'},
                {type: 'boolean', text: '_disabled', value: '_disabled'},
                {type: 'string', text: '_vendor', value: '_vendor'},
                {type: 'boolean', text: '_created', value: '_created'},
                {type: 'string', text: '_lot', value: '_lot'},
                {type: 'string', text: '_productName', value: '_productName'},
                {type: 'string', text: '_firmwareVersion', value: '_firmwareVersion'},
                {type: 'string', text: '_stringField1', value: '_stringField1'},
                {type: 'float', text: '_numberField1', value: '_numberField1'},
                {type: 'string', text: '_stringField2', value: '_stringField2'},
                {type: 'float', text: '_numberField2', value: '_numberField2'},
                {type: 'string', text: '_stringField3', value: '_stringField3'},
                {type: 'float', text: '_numberField3', value: '_numberField3'},
                {type: 'string', text: '_stringField4', value: '_stringField4'},
                {type: 'float', text: '_numberField4', value: '_numberField4'},
                {type: 'string', text: '_stringField5', value: '_stringField5'},
                {type: 'float', text: '_numberField5', value: '_numberField5'}
            ];

            $scope.searchDevices = function(searchParam){

                var whereClauses = [],
                    baseClause = KiiClause.and();

                if(searchParam){
                    var fieldName = searchParam.field,
                        fieldValue = searchParam.value;

                    if(fieldName && fieldValue){
                        var searchClause = KiiClause.equals(fieldName, fieldValue);
                        whereClauses = [searchClause];
                    }
                }

                whereClauses.push(KiiClause.notEquals('_stringField5', AppConfig.VIRTUAL_DEVICE));

                baseClause._setWhereClauses(whereClauses);
                AppUtils.doLoading();

                $scope.myApp.queryThings({}, baseClause, {limit: 5}).then(function(result){
                    $scope.myDevices = result.things;
                    $scope.nextQuery = result.query;

                    if($scope.allSelected){
                        $scope.selectAll();
                    };

                    $scope.$apply();

                    AppUtils.whenLoaded();
                }, function(){
                    AppUtils.whenLoaded();
                });
            };

            $scope.$watch('allSelected', function(newVal){
                if(newVal){
                    $scope.selectAll();
                }else{

                }
            });

            $scope.unselectAll = function(){
                _.each($scope.myDevices, function(device){
                    device._selected = false;
                });
                $scope.selectChange();
            };

            $scope.selectAll = function(){
                _.each($scope.myDevices, function(device){
                    device._selected = true;
                });
                $scope.selectChange();
            };

            $scope.selectedThingsFilter = function(thing){
                if(!$scope.selectedThings) return true;
                return !_.find($scope.selectedThings, function(selectedThing){
                    return selectedThing.getThingID() == thing.getThingID();
                });
            };
        }]
    }
  }]);