

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


