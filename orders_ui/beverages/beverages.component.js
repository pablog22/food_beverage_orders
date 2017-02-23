(function () {

    angular.
        module('beverages').
        component('beverages', {
            templateUrl: 'beverages/beverages.template.html',
            controller: function BeveragesController() {

                this.products =
                    [
                        {
                            "_id": "58aaec600a6c6a06245c51c2",
                            "type": "whisky",
                            "brand": "Grants",
                            "description": "Grants 750cc",
                            "cc": 750,
                            "code": "w_grants_750",
                            "price": 600,
                            "image": "images/w_grants.jpg"
                        },
                        {
                            "_id": "58aaec620a6c6a06245c51c3",
                            "type": "whisky",
                            "brand": "Blenders",
                            "description": "Blenders 750cc",
                            "cc": 750,
                            "code": "w_blenders_750",
                            "price": 126,
                            "image": "images/w_blenders.jpg"
                        },
                        {
                            "_id": "58aaec650a6c6a06245c51c4",
                            "type": "whisky",
                            "brand": "Blenders",
                            "description": "Blenders 1000cc",
                            "cc": 1000,
                            "code": "w_blenders_1000",
                            "price": 154,
                            "image": "images/w_blenders.jpg"
                        }
                    ];
            }
        });

})();