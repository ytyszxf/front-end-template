'use strict';

angular.module('myApp.AppShared', ['ngAnimate', 'ngCookies', 'ngSanitize', 
    'ui.bootstrap', 'LocalStorageModule', 'awesome-context-menu', 'smart-table', 'gridster'])
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