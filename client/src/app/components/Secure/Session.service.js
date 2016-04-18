angular.module('myApp.Secure')
  .factory('SessionService', ['localStorageService', '$rootScope', 'AppConfig', function(localStorageService, $rootScope, AppConfig){
    var SessionService = {};

    SessionService.setPortalAdmin = function(user){
        localStorageService.set(AppConfig.USER_SESSION, user);
        $rootScope.portalAdmin = user;
    };

    SessionService.getPortalAdmin = function(){
        return localStorageService.get(AppConfig.USER_SESSION);
    };

    SessionService.expire = function(){
        $rootScope.portalAdmin = null;
        localStorageService.remove(AppConfig.USER_SESSION);
    };

    SessionService.restore = function(){
        var portalAdmin = localStorageService.get(AppConfig.USER_SESSION);
        if(portalAdmin){
            $rootScope.portalAdmin = new KiiPortalAdmin();

            $rootScope.portalAdmin.setAccessToken(portalAdmin._accessToken);
            $rootScope.portalAdmin.setTokenType(portalAdmin._tokenType);
        }
    };

    SessionService.restore();
    return SessionService;
  }]);