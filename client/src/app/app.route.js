'use strict';

angular.module('KiiFrontTemplate')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '', 
        templateUrl: 'app/app.html',
        controller: 'AppController',
        abstract: true
      })
      .state('app.Secure', {
        url: '/Secure',
        templateUrl: 'app/components/Secure/Secure.html',
        controller: 'SecureController',
      });

      $urlRouterProvider.otherwise('Secure');
  });
