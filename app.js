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


