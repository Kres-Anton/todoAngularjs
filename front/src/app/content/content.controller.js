import './content.module';

angular.module('contentModule').
	controller('ContentController', ['$log','$scope','$state','$stateParams', ($log,$scope,$state,$stateParams)=>{
		$log.log($stateParams);
		$scope.user=$stateParams.user;

	}]);