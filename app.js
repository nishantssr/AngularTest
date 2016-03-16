var app = angular.module('testapp', ['ngRoute',]);

app.config(function($routeProvider){
$routeProvider
  .when('/', {
  	templateUrl: 'views/home.html',
  	controller: 'homeCtrl',
  })
  .when('/register', {
    templateUrl: 'views/register.html',
    controller: 'registerCtrl',
  })
  .otherwise({
    redirectTo: '/'
  });
});
app.controller('homeCtrl', function($scope, $log){
  $log.debug('Welcome to the testapp!');
});
app.controller('registerCtrl', function($scope, $log){
	$scope.submit = function(user){
		$log.debug('submit: user = ', user);
	};
});


app.directive('ssn', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attributes, registerCtrl) {
      var arr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
      var pattern = /^\d{6}-\d{4}$/;
      registerCtrl.$validators.ssn = function(value) {
        if (!value || !value.match(pattern)) {
          return false;
        }

        var digits = value.replace(/\D/g, '');

        var 
          len = digits.length,
          bit = 1,
          sum = 0,
          val;

        while (len) {
          val = parseInt(digits.charAt(--len), 10);
          sum += (bit ^= 1) ? arr[val] : val;
        }

        return !!(sum && sum % 10 === 0);
      }
    }
  }
});


app.directive("match", function() {
   return {
      require: "ngModel",
      scope: {
        match: '='
      },
      link: function(scope, element, attrs, registerCtrl) {
        scope.$watch(function() {
            var combined;

            if (scope.match || registerCtrl.$viewValue) {
               combined = scope.passwordVerify + '_' + registerCtrl.$viewValue; 
            }                    
            return combined;
        }, function(value) {
            if (value) {
                registerCtrl.$parsers.unshift(function(viewValue) {
                    var origin = scope.match;
                    if (origin !== viewValue) {
                        registerCtrl.$setValidity("match", false);
                        return undefined;
                    } else {
                        registerCtrl.$setValidity("match", true);
                        return viewValue;
                    }
                });
            }
        });
     }
   };
});

app.directive("passwordVerify", function() {
   return {
      require: "ngModel",
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, registerCtrl) {
        scope.$watch(function() {
            var combined;

            if (scope.passwordVerify || registerCtrl.$viewValue) {
               combined = scope.passwordVerify + '_' + registerCtrl.$viewValue; 
            }                    
            return combined;
        }, function(value) {
            if (value) {
                registerCtrl.$parsers.unshift(function(viewValue) {
                    var origin = scope.passwordVerify;
                    if (origin !== viewValue) {
                        registerCtrl.$setValidity("passwordVerify", false);
                        return undefined;
                    } else {
                        registerCtrl.$setValidity("passwordVerify", true);
                        return viewValue;
                    }
                });
            }
        });
     }
   };
});


