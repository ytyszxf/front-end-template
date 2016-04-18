angular.module('LightMap')
  .factory('MapService', [function(){
    function style(feature) {
        return {
            fillColor: getColor(feature.properties.type),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: (feature.properties.selected? 0.7: 0.4)
        };
    }

    function resetFeature(e){
        var layer = e.target;

        if(!layer.feature.properties.selected){
            layer.setStyle({
                fillOpacity: 0.4
            });
        }else{
            layer.setStyle({
                fillOpacity: 0.7
            });
        }
    }

    function highlightFeature(e){
        var layer = e.target;

        layer.setStyle({
            fillOpacity: 0.7
        });
    }

    function getColor(type){
        var colorSet = {
            'district': 'white',
            'area': 'green'
        };

        return colorSet[type];
    }


    return{
        style: style,
        resetFeature: resetFeature,
        highlightFeature: highlightFeature,
        getColor: getColor
    };
  }])
  .factory('$$Thing', ['$resource', function($resource){
    var Thing = $resource(MyAPIs.THING + '/:globalThingID', {}, {
        getAll: {
            url: MyAPIs.THING + '/search',
            method: 'GET',
            isArray: true
        },
        remove: {
            method: 'DELETE'
        },
        update: {
            method: 'POST'
        },
        bindTags: {
            url: MyAPIs.THING + '/:thingids/tags/custom/:tags',
            params:{thingids:'@things',tags: '@tags'},
            method: 'POST'
        },
        removeTags: {
            url: MyAPIs.THING + '/:things/tags/custom/:tags',
            params:{things: '@things', tags:'@tags'},
            method: 'DELETE'
        },
        byTag: {
            url: MyAPIs.THING + '/search?tagType=:tagType&displayName=:displayName',
            params:{tagType: '@tagType', displayName: '@displayName'},
            method: 'GET',
            isArray: true,
        },
        byType: {
            url: MyAPIs.THING + '/types/:typeName',
            params: {typeName: '@typeName'},
            method: 'GET',
            isArray: true
        }
    });

    return Thing;
  }])
  .factory('$$Location', ['$resource', function($resource){
    var $$Location = $resource(MyAPIs.TAG + '/:id', {id: '@tagName'}, {
        queryAll: {
            method: 'GET',
            isArray: true,
            url: MyAPIs.TAG + '/search?tagType=Location'
        }
    });

    return $$Location;
  }]);