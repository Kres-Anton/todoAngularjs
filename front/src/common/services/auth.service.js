import 'angular/angular';

angular.module('loginModule').
	factory('AuthService', ['$log','LoginService',function($log,LoginService){

		function User(id,username,created,role,photo){
			this.id=id || "";
			this.username=username || "";
			this.created = created || "";
			this.role = role || "";
			this.photo = photo || "";
		};


			return {
			user:null,
			token:null,
			auth:false,

			getToken: function(){
				return this.token
			},

			setToken: function(token){
				this.token=token;
			},

			setUser: function(user){
				this.user=new User(user.id,user.username,user.created,user.role,user.photo);
			},

			getUser: function(){
				return this.user;
			},

			isAuth: function(){
				return this.auth;
			},

			logIn:function(newUser){
				return LoginService.login(newUser)
				.then(
					(response)=>{
						if(response.data.success){
							this.setUser(response.data.user);
							this.setToken(response.data.token);
							this.auth=true;
							return {status:"ok",message:"ok"};	
						}
							return {status:"err",message:response.data.message};
						},
				 	(err)=>{
						$log.log(err);
						return {status:"err",message:"Sorry, service error"};
					});
			},

			logOut: function(){
				this.user=null;
				this.token=null;
				this.auth=false;
			}	

		}

	}]);