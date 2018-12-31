// Code goes here
// robconery angular rob

/* patterns
var work = function(){
  console.log("working hard!");
};
work();

var doWork = function(f){
  console.log("starting");
  try{
  f();
  }
  catch(ex){
    console.log(ex);
  }
  console.log("end");
}
doWork(work);*/

// modules
/*var program = function() {
  var createWorker = function() {
    var task1 = function() {
      console.log("task1");
    };
    var task2 = function() {
      console.log("task2");
    };
    return {
      job1: task1,
      job2: task2
    };
  };
  var worker = createWorker();
  worker.job1();
  worker.job2();
};
program();*/

//controllers - global scope no longer works
//This is Modules:
//
(function() {
  var app = angular.module("githubViewer", []);
  //
  var MainController = function($scope, //$http, 
    github, $interval, $log, $anchorScroll, $location) {
    $scope.message = "Hello, GitHub Viewer!";
    var person = {
      firstName: "Scott",
      lastName: "Allen",
      imageSrc: "http://odetocode.com/Images/scott_allen_2.jpg"
    };
    $scope.person = person;
    //
    var onUserComplete = function(data) {
      $scope.user = data;
      //$http.get($scope.user.repos_url)
      github.getRepos($scope.user)
      .then(onRepos, onError);
    };
    //
    var onError = function(reason) {
        $scope.error = "Could not fetch the data.";
      }
      //
    var decrementCountdown = function() {
      $scope.countdown -= 1;
      if ($scope.countdown < 1) {
        $scope.search($scope.username);
      }
    };
    //
    var countdownInterval = null;
    var startCountdown = function() {
        countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
      }
      //
    $scope.search = function(username) {
        $log.info("Searching for " + username);
        //$http.get("https://api.github.com/users/" + username)
        github.getUser(username)
          .then(onUserComplete, onError);
        if (countdownInterval) {
          $interval.cancel(countdownInterval);
          $scope.countdown = null;
        }
      }
      //
    var onRepos = function(data) {
      $scope.repos = data;
      $location.hash("userDetails");
      $anchorScroll();
    }

    $scope.username = "angular"
    $scope.repoSortOrder = "-stargazers_count";
    $scope.countdown = 5;
    startCountdown();
  };

  app.controller("MainController", MainController);

}());

//directives/events