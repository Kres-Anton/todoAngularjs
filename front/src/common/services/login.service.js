import 'angular/angular';

angular.module('loginModule').
	factory('LoginService', ['$http', function($http){
		return {
			login: function(newUser){
				return $http.post('http://localhost:3000/api/login',newUser,{});
			}
		};			
	}]);