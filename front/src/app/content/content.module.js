import 'angular/angular';
import '@uirouter/angularjs';
import './users/usersModule';


angular.module('contentModule',['ui.router','usersModule']);