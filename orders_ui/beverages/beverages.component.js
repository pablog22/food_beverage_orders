(function () {
  
  angular.
    module('beverages').
    component('beverages', {
      templateUrl: 'beverages/beverages.template.html',
      controller: BeveragesController
    });
    
  function BeveragesController($http, $log) {

    var self = this;
    
    $http.get('beverages/beverages.json').then(function(response) {
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

      var order = 
        {
          "cust_id": this.cust_id,
          "beverages": beverages,
          "total": this.total
        }
      
      //$http.post()
      $log.debug(order.cust_id);
      $log.debug(order.beverages);
      $log.debug(order.total);
    };

  };


})();