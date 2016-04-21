'use strict';

angular.module('KiiFrontTemplate.AppShared', ['ngAnimate', 'ngSanitize', 
    'ui.bootstrap', 'LocalStorageModule', 'ui.router', 
  'KiiFrontTemplate.Secure'])
.constant('AppConfig', {
    StoragePrefix: 'KiiFrontTemplate',
    USER_SESSION: 'USER_SESSION'
})
.config(function(localStorageServiceProvider, AppConfig) {
    localStorageServiceProvider
    .setPrefix(AppConfig.StoragePrefix)
    .setStorageType('localStorage')
    .setStorageCookie(30, '/')
    .setNotify(true, true);
});