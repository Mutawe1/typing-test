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
		
		return $http.get("https://ancient-shelf-5779.herokuapp.com/test/55f0cb6fa24ba7cc41ec1adf")	;
	};
    
}]);