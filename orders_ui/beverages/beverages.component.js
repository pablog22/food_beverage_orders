(function () {
    
    angular.
        module('beverages').
        component('beverages', {
            templateUrl: 'beverages/beverages.template.html',
            controller: BeveragesController
        });
        
    function BeveragesController($http) {

        var self = this;
        
        $http.get('beverages/beverages.json').then(function(response) {
            self.products = response.data;
        });
    };


})();