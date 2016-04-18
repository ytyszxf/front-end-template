angular.module('myApp.Secure')
  .factory('SecurityService', ['localStorageService', 'AppUtils', 'SessionService', function(localStorageService, AppUtils, SessionService){
    var SecurityService = {};

    function Status(){
        this.unauthorized = false;
    }

    SecurityService.errorHandler = function(error){
        var status = new Status();

        switch(error.status){
            case 'Unauthorized': 
                status.unauthorized = true;
                break;
        }

        return status;
    };

    SecurityService.login = function(credentials){
        return KiiPortalAdmin.login(credentials.username,credentials.password);
    };

    return SecurityService;
  }]);