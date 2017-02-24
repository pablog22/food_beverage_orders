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
  };


})();