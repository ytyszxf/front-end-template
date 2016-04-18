angular.module('myApp.AppShared')
    .factory('AppUtils', ['$rootScope', '$http', '$location', '$q', '$state', '$timeout', '$uibModal', 'AppConfig',
    function ($rootScope, $http, $location, $q, $state, $timeout, $uibModal, AppConfig) {
        window.app = {};
        app.utils = {
            requestInProcess:0,
            storagePrefix: AppConfig.StoragePrefix + '.',
            initialize: function(){
                this._initialize();
            },
            _initialize: function(){
                this._IEPlaceholder();

                /**
                 * import underscore
                 * @type {[type]}
                 */
                $rootScope._ = _;

                String.prototype.lowerFirstLetter = function() {
                    return this.charAt(0).toLowerCase() + this.slice(1);
                };

                Array.prototype.removeFirst = function(){
                    return this.slice(1, this.length);
                };

                Array.prototype.remove = function(object){
                    var index = this.indexOf(object);
                    if(index>-1){
                        return this.splice(index,1);
                    }else{
                        return this;
                    }
                };
            },
            /**
             * placeholder for IE
             */
            _IEPlaceholder: function() {
                var doc = document,
                    inputs = doc.getElementsByTagName('input'),
                    supportPlaceholder = 'placeholder' in doc.createElement('input'),
                    placeholder = function(input) {
                        var text = input.getAttribute('placeholder'),
                            defaultValue = input.defaultValue;
                        if (defaultValue == '') {
                            input.value = text;
                        }

                        $(input).on('focus', function() {
                            if (input.value === text) {
                                this.value = '';
                            }
                        });

                        $(input).on('blur', function() {
                            if (input.value === '') {
                                this.value = text;
                            }
                        });
                    };

                if (!supportPlaceholder) {
                    for (var i = 0, len = inputs.length; i < len; i++) {
                        var input = inputs[i],
                            text = input.getAttribute('placeholder');
                        if ( ( input.type === 'text' || input.type === 'password') && text) {
                            placeholder(input);
                        }
                    }
                }
            },
            setLocalStorageItem: function(itemName, value){
                localStorage.setItem(this.storagePrefix + itemName, JSON.stringify(value));
            },
            getLocalStorageItem: function(itemName){
                return $.parseJSON(localStorage.getItem(this.storagePrefix + itemName));
            },
            getSessionItem: function(itemName){
                return $.parseJSON(sessionStorage.getItem(this.storagePrefix + itemName));
            },
            setSessionItem: function(itemName, value){
                sessionStorage.setItem(this.storagePrefix + itemName, JSON.stringify(value)) ;
            },
            clearSession: function(){
                sessionStorage.clear();
            },
            removeSessionItem: function(itemName){
                sessionStorage.removeItem(this.storagePrefix + itemName);
            },
            doLoading: function(){
                this.requestInProcess ++;
                this.showLoading();
            },
            whenLoaded: function(){
                this.requestInProcess --;
                if(this.requestInProcess==0){
                    this.hideLoading();
                }
            },
            showLoading: function(){
                $('#spinner').show();
            },
            hideLoading: function(){
                $('#spinner').hide();
            },
            alert: function(msg, title){
                title = title || '提示';
                var template = '';
                template += '<div class="modal-content">';
                template += '  <div class="modal-header ng-scope">';
                template += '      <h3 class="modal-title">' + title + '</h3>';
                template += '  </div>';
                template += '  <div class="modal-body clearfix">';
                template += '    <div class="col-sm-12">';
                template += '      ' + msg;
                template += '    </div>';
                template += '  </div>';
                template += '  <div class="modal-footer ng-scope">';
                template += '      <button class="btn btn-primary" style="width:100%;" type="button" ng-click="ok()">Ok</button>';
                template += '  </div>';
                template += '</div>';
                var modalInstance = $uibModal.open({
                    animation: true,
                    template: template,
                    controller: function ($scope, $uibModalInstance) {
                        $scope.ok = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    },
                    size: 'sm'
                });

                return modalInstance.result;
            },
            confirm: function(title, msg, func){
                var template = '';
                template += '<div class="modal-content">';
                template += '  <div class="modal-header ng-scope">';
                template += '      <h3 class="modal-title">' + title + '</h3>';
                template += '  </div>';
                template += '  <div class="modal-body clearfix">';
                template += '    <div class="col-sm-12">';
                template += '      ' + msg;
                template += '    </div>';
                template += '  </div>';
                template += '  <div class="modal-footer ng-scope">';
                template += '      <button class="btn btn-primary" type="button" ng-click="ok()">Confirm</button>';
                template += '      <button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button>';
                template += '  </div>';
                template += '</div>';
                var modalInstance = $uibModal.open({
                    animation: true,
                    template: template,
                    controller: function ($scope, $uibModalInstance, func) {
                        $scope.ok = function () {
                            $uibModalInstance.close(func());
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    },
                    size: 'sm',
                    resolve: {
                        func: function(){return func}
                    }
                });

                return modalInstance.result;
            }
        };
        return app.utils;
    }]);
