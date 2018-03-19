import 'angular/angular';
import '@uirouter/angularjs';

angular.module('loginModule').directive('appNavMenu',['AuthService','$state','$log',function(AuthService,$state,$log){
	return {
		restrict : "E",
		template:`<div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
					    <h5 class="my-0 mr-md-auto font-weight-normal">Todo</h5>
					      <nav class="my-2 my-md-0 mr-md-3">
					        <a class="p-2 navElement" ui-sref-active="activeNavElement"  ui-sref="app.payments" href="#">Payments</a>
					        <a class="p-2 navElement" ui-sref-active="activeNavElement"  ui-sref="app.flats" href="#">Flats</a>
					        <a class="p-2 navElement" ui-sref-active="activeNavElement"  ui-sref="app.users" href="#">Users</a>					        
					      </nav>
					      <a ui-sref="app.userProfile" href="#"><img class ="userPhoto p-2 navElement" ng-src="api/img/userphoto/{{user.photo}}.png" alt="{{user.username}}"></a>
					      <a class="btn btn-outline-primary" ng-click="logout()"href="#">Log out</a>
					    </div>`,
		replace:true,
		link: function(scope){
			scope.user = AuthService.getUser();
			scope.logout=function(){
				AuthService.logOut();
				$state.go('/');
			}
		}
	}
}]);