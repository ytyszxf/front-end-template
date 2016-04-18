angular.module('LightMap')
    .factory('AppUtils', ['$http', function ($http) {
        var utils = {
            requestInProcess:0,
            storagePrefix: 'LightMap.',
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
            }
        };
        return utils;
    }]);
