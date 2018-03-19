import 'angular/angular';
import '@uirouter/angularjs';
import './app/login/login.module';
import './app/content/content.module';

import './app/login/login.controller';
import './app/content/content.controller';
import './common/directives/navMenu/navMenu.directive';


angular.module('paymentsApp',['ui.router','loginModule','contentModule'])
	.config(uiRouterConfig);

	function uiRouterConfig($stateProvider,$urlRouterProvider){
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('login',{
				url:'/',
				templateUrl:'app/login/login.template.html'
			})
			.state('app',{
				url:'/app',
				templateUrl:'app/content/content.template.html'
			})
			.state('app.payments',{
				url:'/payments',
				templateUrl:'app/content/payments/payments.template.html'
			})
			.state('app.flats',{
				url:'/flats',
				templateUrl:'app/content/flats/flats.template.html'
			})
			.state('app.users',{
				url:'/users',
				templateUrl:'app/content/users/users.template.html'
			})
	};

