(function () {
  
  angular.
    module('beverages').
    component('beverages', {
      templateUrl: 'beverages/beverages.template.html',
      controller: BeveragesController
    });
    
  function BeveragesController($http, $log) {

    var self = this;
    
    // $http.get('beverages/beverages.json').then(function(response) {
    //   self.products = response.data;
    // });

    $http.get('http://127.0.0.1:3000/beverages').then(function(response) {
      self.products = response.data;
    });

    this.cust_id = 1; //TODO handle users
    this.total = 0;

    this.calculateProductPurchaseTotal = function(product) {
      product.purchaseTotal = product.purchaseCount * product.price;
    }

    this.addToCart = function(product) {
      if (!product.purchaseCount) {
        product.purchaseCount = 1;
      } else {
        product.purchaseCount += 1;
      }

      product.purchaseTotal += product.price;
      this.total += product.price;
    };

    this.removeFromCart = function(product) {
      if (product.purchaseCount > 0) {
        product.purchaseCount -= 1;

        product.purchaseTotal -= product.price;
        this.total -= product.price;
      }
      
    };

    this.removeAllFromCart = function(product) {
      
      if (product.purchaseCount > 0) {
        this.total -= product.purchaseCount * product.price;
        product.purchaseCount = 0;
        product.purchaseTotal = 0;
      }
    };

    this.makeOrder = function() {
      var beverages = [];
      this.products.forEach(function(product){
        if(product.purchaseCount > 0) {
          // product order
          var porder = 
            {
              "code": product.code,
              "count": product.purchaseCount,
              "price": product.price
            };
          beverages.push(porder);
        }
      });

      var newOrder = 
        {
          "cust_id": this.cust_id,
          "beverages": beverages,
          "total": this.total
        };
      
      $http.post('http://127.0.0.1:3000/bev_orders', newOrder).then(
        function successCallback(response) {
          $log.info("Order successfully created.");
        },
        function errorCallback(response){
          $log.error("Error at creating order.")
        });
      
      //$http.post()
      $log.debug(newOrder.cust_id);
      $log.debug(newOrder.beverages);
      $log.debug(newOrder.total);
    };

  };


})();