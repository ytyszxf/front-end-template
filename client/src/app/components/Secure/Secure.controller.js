'use strict';

angular.module('KiiFrontTemplate.Secure')
  .controller('SecureController', ['$scope', '$rootScope', '$state', 'AppUtils', 'SecurityService', 'SessionService', function($scope, $rootScope, $state, AppUtils, SecurityService, SessionService) {
    $scope.login = function(credentials){
        AppUtils.showLoading();

        SecurityService.login(credentials).then(function(portalAdmin){
            SessionService.setPortalAdmin(portalAdmin);
            $state.go('app.Portal.AppManager.ApplicationList');
            AppUtils.hideLoading();
        }, function(error){
            console.log(error);
            
            AppUtils.hideLoading();
        });
    };


  }]);
