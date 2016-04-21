'use strict';

angular.module('KiiFrontTemplate.AppShared')
  .filter('leftHalf', function() {
    return function(input) {
        var arr = []
        _.each(input, function(val, index){
            if(index%2 == 0) return;
            arr.push(val)
        });

        return arr;
    };
  })
  .filter('rightHalf', function() {
    return function(input) {
        var arr = []
        _.each(input, function(val, index){
            if(index%2 == 1) return;
            arr.push(val)
        });

        return arr;
    };
  });