import 'angular/angular';

angular.module('usersModule').
	factory('UsersService', ['$log','LoginService','$http',function($log,LoginService,$http){

			return {
				getUsers: function(){
					return $http.get('http://localhost:3000/api/user');
				},

				getUser: function(id){
					return $http.get('http://localhost:3000/api/user'+id);
				},

				editUser: function(user){
					return $http.post('http://localhost:3000/api/user',user,{});
				},

				removeUser: function(user){
					return $http.delete('http://localhost:3000/api/user',user,{});
				},

				addUser: function(user){
					return $http.put('http://localhost:3000/api/user',user,{});
				}
		}

	}]);