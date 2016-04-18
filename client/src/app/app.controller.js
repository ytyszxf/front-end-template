angular.module('LightMap').controller('AppController', ['$scope', 'leafletMarkerEvents', 'leafletMapEvents', '$interval', 'leafletData', '$http', '$$Location', '$$Thing', 'MapService', function($scope, leafletMarkerEvents, leafletMapEvents, $interval, leafletData, $http, $$Location, $$Thing, MapService){
    
    $scope.init = function(){
         angular.extend($scope, {
            london: {
                lat: 51.48331,
                lng: -0.08772,
                zoom: 13
            },
            events : {
                markers: {
                    enable: leafletMarkerEvents.getAvailableEvents(),
                }
            },
            geojson: []
        });

        leafletData.getMap('myMap').then(function(map){
            $scope.myMap = map;
            window.map = map;
        });

        $scope.loadData();

        $scope.lightModels = [];
        
        $interval(replaceLights, 5);
    };

    function replaceLights(){
        if($scope.myMap){
            var layers = $scope.myMap._layers;
            var index = 0;
            _.each(layers, function(layer){
                if(layer._latlng){
                    _.each($scope.lightModels, function(light){
                        if(light.custom.lng == layer._latlng.lng && light.custom.lat == layer._latlng.lat){
                            var position = getAbsoluteXY(layer._icon),
                                css = {left: position.x + layer._icon.width/2, top: position.y - 5};

                            _.extend(light.custom, css);
                        }
                    });
                }
            });
        }
    }

    function refreshData(light){
        $$Thing.get({globalThingID:light.globalThingID}, function(thing){
            initLightData(light, thing);
        });
    }

    function initLightData(light, thing){
        light.custom = light.custom || {};
        thing.custom = thing.custom || {};
        light.status = light.status || {};
        thing.status = thing.status || {};

        light.status.power = thing.status.power || false;
        light.status.brightness = thing.status.brightness || 0;

        if(!light.status.power){
            light.status.brightness = 0;
        }
        _.extend(light.custom, thing.custom);
    }



    $scope.loadData = function(){
        $http.get('data/districts.json').then(function(response){

            /**
             * get marker data
             */
            $http.get('data/light-location.json').then(function(response){
                //$scope.markers = response.data;
                
                var markerSet = response.data;
                $scope.markers = {};

                /**
                 * get locations
                 */

                $$Location.queryAll(function(locations){
                    $scope.locations = _.pluck(locations, 'displayName');
                    $scope.locations = _.filter($scope.locations, function(myLocation){
                        return myLocation.indexOf('district')>-1;
                    });

                    $scope.locations = new LocationTree($scope.locations).tree;
                    getThings($scope.locations.children);

                    function getThings(locations){
                        _.each(locations, function(location){
                            location.feature = _.find($scope.geojson.data.features, function(feature){
                                return feature.id == location.id;
                            });

                            var dataContainer = {};
                            $$Thing.byTag({tagType: 'Location', displayName: location.id}, function(things){
                                location.things = things;
                                _.each(things, function(thing, index){
                                    if(thing.type != 'gateway-streetlight' || !markerSet[location.id] || !markerSet[location.id][index]){
                                        console.log(location.id, index);
                                        return;
                                    }

                                    initLightData(thing, thing);

                                    dataContainer[thing.globalThingID] = thing;
                                    $scope.lightModels.push(thing);

                                    $interval(function(){
                                        refreshData(thing);
                                    },300);

                                    thing.custom.lng = thing.custom.lng || markerSet[location.id][index].lng;
                                    thing.custom.lat = thing.custom.lat || markerSet[location.id][index].lat;

                                    $scope.markers[thing.globalThingID] = thing.custom;

                                    thing.marker = $scope.markers[thing.globalThingID];
                                    thing.marker.icon = {
                                        iconSize: [1, 1],
                                        iconUrl: 'images/1px.png',
                                        shadowUrl: 'images/1px.png'
                                    };

                                    thing.marker.globalThingID = thing.globalThingID;
                                });
                            });
                            getThings(location.children);
                        });
                    }
                });
            });

            
            $scope.geojson = {
                data: response.data,
                style: MapService.style,
                onEachFeature: function (feature, layer) {
                    layer.on({
                        mouseover: MapService.highlightFeature,
                        mouseout: MapService.resetFeature
                    });
                }
            };
        });
    };

    function getAbsoluteXY(element) { 
       var viewportElement = document.documentElement; 
       var box = element.getBoundingClientRect(); 
       var scrollLeft = viewportElement.scrollLeft; 
       var scrollTop = viewportElement.scrollTop; 
       var x = box.left + scrollLeft; 
       var y = box.top + scrollTop; 
       return {"x": x, "y": y} 
    } 


}]);