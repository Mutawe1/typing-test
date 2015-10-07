'use strict';


describe('TTApp.testaasasas module', function() {

  beforeEach(module('TTApp'));

var ctrl, scope;

beforeEach(inject(function ($rootScope, $controller) {
  
      scope = $rootScope.$new();
      ctrl = $controller('HomeCtrl', {$scope: scope});
    }));



 
  	

  	it('TestCtrl should be defined', function() {
  		expect(ctrl).toBeDefined();
  	});
    
});