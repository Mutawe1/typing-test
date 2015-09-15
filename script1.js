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
