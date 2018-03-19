import 'angular/angular';
import '../../common/services/login.service';
import '../../common/services/formValidationError.service';
import '../../common/services/auth.service';

angular.module('loginModule').
	controller('LoginController', ['$log','$scope','AuthService','FormValidationError','$state', ($log,$scope,AuthService,FormValidationError,$state)=>{

		$scope.getFormErrormessage = FormValidationError.getTextError;
		$scope.showErrors = false;
		$scope.authError = {
							show:false,
							msg:""
						}


		$scope.getClasses = (ngModelController)=>{
			return {
				formEnterError: ngModelController.$invalid && $scope.showErrors,
				formEntersucces: ngModelController.$valid && $scope.showErrors
			}
		};

		$scope.showError = (ngModelController)=>{
			function isEmpty(obj) {
			        if (Object.keys(obj).length == 0) return true;
			    return false;

			};

			return !isEmpty(ngModelController.$error) && $scope.showErrors;
		};		

		$scope.submit = (newUser,valid)=>{
				if (valid){					
						AuthService.logIn(newUser).then(
							(answer)=>{								
								if(answer.status=="ok"){
									$state.go('app.payments');
								} else {
									$scope.authError.show = true;
									$scope.authError.msg = 	answer.message;
								}
							},
							(err)=>{
								$scope.authError.show = true;
								$scope.authError.msg = 	err.message;
							}
							);
						
				} else {
					$scope.showErrors =!$scope.showErrors;
				}

			};


		

	}]);