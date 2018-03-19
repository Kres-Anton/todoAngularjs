import 'angular/angular';

angular.module('loginModule').
	factory('FormValidationError', ['$log',function($log){
		return {
			getTextError: (formName,field,fieldCtrl)=>{
			let errors={
				loginForm:{
					username:[
							{name:'required',text:'You must enter login'},
							{name:'minlength',text:'Login must be minimum of 4 symbols'},
							{name:'maxlength',text:'Login can contain 16 symbols'},
							{name:'pattern',text:'Login can contain only letters and numbers'}
							],
					passowrd:[
							{name:'required',text:'You must enter passowrd'},
							{name:'minlength',text:'Passowrd must be minimum of 6 symbols'},
							{name:'maxlength',text:'Login can contain 16 symbols'},
							{name:'pattern',text:'Password can contain only letters, numbers and symbols like ! @ _'}
							]
				}		
			}
				
			for (var key in fieldCtrl.$error){
				return errors[formName][field].filter(err=>err.name===key)[0].text;	
			}
			

		}
		};			
	}]);