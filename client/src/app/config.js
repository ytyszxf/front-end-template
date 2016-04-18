/*
 * configuration file for application
 * mostly constants used globally
 * created by George Lin @ Kii
 */

(function () {
    
    /*
     * API used globally for web service
     * by George Lin
     */
    var siteUrl = 'https://114.215.196.178:443',
        apiSuffix = siteUrl + '/beehive-portal/api';
    window.MyAPIs = {
        OPERATOR: '/oauth2',
        USER:'/users',
        USER_GROUP:'/usergroup',
        THING:'/things',
        TAG: '/tags',
        TYPE: '/things/types',
        PERMISSION: '/permission',
        TRIGGER: '/triggers',
        THING_IF: '/thing-if'
    };

    

    /*
     * init api urls
     */
    for(apiName in window.MyAPIs){
        window.MyAPIs[apiName] = apiSuffix +  window.MyAPIs[apiName];
    }

    window.MyAPIs['SCHEMA'] = siteUrl + '/demohelper/api/industrytemplate';
    
    /*
     * tag used as session key
     * by George Lin
     */
    var tagPrefix = 'Beehive';
    window.AppTags = {
        USER: tagPrefix + 'USER',
        PERMISSION: tagPrefix + 'PERMISSION'
    };

    window.pageListMaxLength = 20;
    
})();