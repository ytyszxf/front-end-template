angular.module('LightMap').directive('lightBulb', ['$compile', function($compile){
    return {
        restrict: 'E',
        templateUrl: 'app/directives/light-bulb/light-bulb.html',
        replace: true,
        scope:{
            ngModel: '=?'
        },
        link: function(scope, element, attrs){
            scope.settings = {
                left: 0,
                top: 0,
                brightness: 0
            };

            scope.$watch('ngModel', function(){
                _.extend(scope.settings, scope.ngModel.custom);
                scope.settings.brightness = scope.ngModel.status.brightness;
                var top = scope.settings.top - $(element).height(),
                    left = scope.settings.left + $(element).width()/2;

                $(element).css({zIndex: top, left: left, top: top});
                changeLight(scope.settings.brightness);
            }, true);

            function changeLight(lightness){
                var percentage = lightness;
                //$("label").css("background", "rgba(255,255,255," + 1 * percentage  + ")");
                var background = "rgba(255,255,255," + (0.1 + 0.9 * percentage)  + ")";
                var border = "solid 0.3px rgba(255,255,255," + (0.7 + 0.3 * percentage) + ");";
                var boxShadow = 'inset 0px 1px 5px rgba(255,255,255,0.1),'
                    + 'inset 0px 2px 20px rgba(255,255,255,0.07),'
                    + '0px 0px 10px rgba(255,255,255,' + 0.8 * percentage + '),'
                    + '0px 0px 30px rgba(255,255,255,' + 0.8 * percentage + '),'
                    + '0px 0px 50px rgba(255,255,255,' + 0.8 * percentage + '),'
                    + '0px 0px 70px rgba(255,255,255,' + 0.6 * percentage + '),'
                    + '-80px -15px 120px 0px rgba(255,255,255,' + 1 * percentage + '),'
                    + '-80px -15px 40px -10px rgba(' + parseInt(255 * percentage) + ',' + parseInt(255 * percentage) + ',' + parseInt(255 * percentage) + ',0.1)';

                var bulbBoxShadow = '0px 10px 30px rgba(255,255,255,' + 0.9 * Math.sqrt(percentage) + ');';
                var bulbBackground = 'rgba(255,255,255,' + 1 * Math.pow(percentage, 1/2) + ')';
                var litBackground = 'rgba(' + (75 + parseInt(180 * Math.pow(percentage, 1/4))) + ',' + (75 + parseInt(180 * Math.pow(percentage, 1/4))) + ',' + (75 + parseInt(180 * Math.pow(percentage, 1/4))) + ',1)';

                $(element).find('bulb').attr('style','background:' + background + '; box-shadow:' + bulbBoxShadow + ';');
                $(element).find("label").attr('style','background:' + background + '; box-shadow:' + boxShadow + '; border: ' + border);
                $(element).find('lit').css('background', litBackground);
            }
        }
    }
}]);