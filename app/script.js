angular.module("TTApp", ["ngRoute", "TTApp.test"])
.config(["$routeProvider", function ($routeProvider) {
        
        $routeProvider
    .when("/", {
            templateUrl: "components/home/home.html",
            controller: "HomeCtrl"
        })
    .when("/about", {
            templateUrl: "components/about/about.html",
            controller: "AboutCtrl"
        })
    .when("/test", {
            templateUrl: "components/test/test.html",
            controller: "TestCtrl"
        })            
    .otherwise({
            redirectTo: "/"
        });

    }])
    .directive("navBar", function () {
    
    return {
        templateUrl: "shared/header.html"
    };
})
    .directive("ttFooter", function(){
    	return{
    		templateUrl: "shared/footer.html"
    	};
    });


(function(){
'use strict';

angular
.module("TTApp")
    .controller("AboutCtrl", ["$scope", function ($scope) {

        $scope.title = "About page";
    }]);

});    

(function(){
'use strict';

angular
.module("TTApp")
    .controller("HomeCtrl", ["$scope", function ($scope) { 
        $scope.title = "Home page";
    
    }]);
})();
'use strict';

describe('TTApp.test module', function() {

  beforeEach(module('TTApp.test'));

var ctrl, scope, findScoreService;

beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('TestCtrl', {$scope: scope});
    }));

beforeEach(inject(function ($injector) {
 findScoreService= $injector.get("findTestScore");
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

(function(){
    'use strict';

 angular.module("TTApp.test", [])
   .controller("TestCtrl", ["$scope", "$http","$interval","TestService", function ($scope, $http, $interval, testService) {
       
        $scope.title = "Take a Test";
        $scope.pargh = [];
        $scope.enteredData = [];
        $scope.curPosition = 0;
        $scope.timer = 60;
        $scope.isInputData = false;
        $scope.controlTimer = "Start Test";
        
        
        //get the pargraph then convert it to array of char
        testService.getPargraphById().then( function(response){
            
            console.log(response);
            
            var receivedData = response.data.content.split(" ");
            
            receivedData.forEach(function (item) {
                var a= {};
                a.letter = item;
                a.status = "";
                $scope.pargh.push(a);
            });    
        });
        
       
              


        //watch the Input data for any change
        $scope.$watch("enteredData", function (newVal, oldVal) {            
         
            $scope.curPosition = $scope.enteredData.length-1;

        }, true);
        
        
        //watch the current posision of the cursor 
        $scope.$watch("curPosition", function (newVal, oldVal) {
            
            if (newVal < oldVal)
                $scope.pargh[oldVal].status = '';

            else {
                if (oldVal >= 0) {
                    if ($scope.enteredData[oldVal] === $scope.pargh[oldVal].letter)
                        $scope.pargh[oldVal].status = 'r';

                    else
                        $scope.pargh[oldVal].status = 'w';
                }
            }
        });
        
        
        
        // using the $interval service to make a 60 sec timer that will enable the user input during that
        function updateTimer(){
            if ($scope.timer > 0)
                $scope.timer--;
            
            else {
                stopTimer();
            }
        }
        var time;
       
        
        $scope.startTimer = function () {
            $scope.showResult = false;
            
            if (angular.isDefined(time))
                return;
            else {
                time = $interval(updateTimer, 1000);
                $scope.isInputData = true;
                
            }
        };

        var stopTimer = function () {
            if (angular.isDefined(time)) {
                $interval.cancel(time);
                time = undefined;
                $scope.isInputData = false;
                $scope.timer = 60;
                $scope.testScore= testService.findScore( $scope.pargh, $scope.enteredData);
                $scope.showResult = true;
                $scope.enteredData= [];
                $scope.curPosition= -1;
            }
        };

        $scope.$on('$destroy', function () {
            stopTimer();
            
        });


        // Get the score result to the user
        $scope.testScore = {};

        //var keystrokes=0;

        $scope.showResult = false;

     
            
       // };
    
    }]);


})();
angular
.module("TTApp.test")
.service('TestService', ['$http', function ($http) {

    this.findScore= function(originalData, inputData){
            var testScore={
                wpm: 0,
            keyStrokes:0,
            errorsCount: 0,
            };
            var keystrokes=0;
            
            inputData.forEach( function(elm){
                var count=elm.split("") ; 
                 keystrokes +=  count.length ;
             });

            keystrokes= keystrokes + inputData.length-1;
            testScore.keyStrokes= keystrokes;
            testScore.wpm= keystrokes / 5;

            originalData.forEach( function(elm){
                if (elm.status === 'w')
                    testScore.errorsCount++;

                elm.status='';
            });

            return testScore;
    };
    
    
    this.getPargraphById= function(){
		
		return $http.get("http://localhost:3002/test/55f0cb6fa24ba7cc41ec1adf")	;
	};
    
}]);