
(function(){
    'use strict';

angular
.module("TTApp.test", [])
    .controller("TestCtrl", ["$scope", "$http","$interval","findTestScore", function ($scope,$http, $interval, findTestScore) {
        $scope.title = "Take a Test";
        $scope.pargh = [];
        $scope.enteredData = [];
        $scope.curPosition = 0;
        $scope.timer = 60;
        $scope.isInputData = false;
        $scope.controlTimer = "Start Test";
        

        //get the pargraph then convert it to array of char
        $http.get("http://localhost:3002/test/paragraph1")
        .success(function(data) {
            var receivedData = data.split(" ");
            
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
                $scope.testScore= findTestScore.findScore( $scope.pargh, $scope.enteredData);
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
    
    }])
.service('findTestScore', [function () {

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
    
}]);
})();