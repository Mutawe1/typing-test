'use strict';

describe('TTApp.test module', function() {

  beforeEach(module('TTApp.test'));

var ctrl, scope, findScoreService;

beforeEach(inject(function ($rootScope, $controller) {
  
      scope = $rootScope.$new();
      ctrl = $controller('TestCtrl', {$scope: scope});
    }));

beforeEach(inject(function ($injector) {
 findScoreService= $injector.get("TestService");
}));

  //describe('TestCtrl controller', function(){

  	

  	it('TestCtrl should be defined', function() {
  		expect(ctrl).toBeDefined();
  	});

  	it('FindTestScore Service should be defined...', function() {
  		  expect(findScoreService).toBeDefined();
  	});

    var orginalData=[{ letter:'helo', status:'r'}, { letter:'world', status:'r'}];
    var inputData=["helo", "world"];
    var testScore={};

    it('FindTestScore should calculate test score', function() {
      testScore= findScoreService.findScore(orginalData, inputData);
      expect(testScore.keyStrokes).toBe(10);
      expect(testScore.wpm).toBe(2);      
      expect(testScore.errorsCount).toBe(0);
    });
});