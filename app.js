var app = angular.module('SKU', []); 

app.config(function($routeProvider) {
	$routeProvider.when('/index/', {templateUrl: 'home'});
});

app.controller('SKUCtrl', function($scope, $route, $http) {
	var url = 'http://stark-basin-7475.herokuapp.com/get/sku/';
	//CORS
	delete $http.defaults.headers.common['X-Requested-With'];
	$http.get(url).then(function(json) {
		$scope.skus = [ ];
		for(i in json.data){
			$scope.skus.push(json.data[i].fields)
		}
	});

	$scope.total = 0;
	$scope.show_details = false;


	$scope.compute_price = function(s) {
		if(! s.fixed_price){
			s.price = s.rate * s.hours * Math.sqrt(s.units) * (1 + s.margin);
		} else {
			s.price = s.fixed_price * s.units;
		}

		$scope.revenue = 0
		$scope.margin = 0
		for(i in $scope.skus) {
			var sku =  $scope.skus[i];
			$scope.revenue += sku.price;
			$scope.margin += sku.price - (sku.price / (1 + sku.margin))
		}
	}

	$scope.clear = function() {
		$scope.revenue = 0;
		$scope.margin = 0;
		$scope.show_details = false;
	}

	$scope.sqrt = function(n) {
		return Math.sqrt(n)
	}

});

app.filter('cartfilter', function() {
	return function(skus, incart) {
			var result = [];
			for(i in skus) {
				if(skus[i].units > 0)
					result.push(skus[i])
			}
			return result;
		}
});

