'use strict';

angular.module('myApp.AppShared', ['ngAnimate', 'ngSanitize', 
    'ui.bootstrap', 'LocalStorageModule'])
.constant('AppConfig', {
    StoragePrefix: 'myApp',
    USER_SESSION: 'USER_SESSION'
})
.config(function(localStorageServiceProvider, AppConfig) {
    localStorageServiceProvider
    .setPrefix(AppConfig.StoragePrefix)
    .setStorageType('localStorage')
    .setStorageCookie(30, '/')
    .setNotify(true, true);
});