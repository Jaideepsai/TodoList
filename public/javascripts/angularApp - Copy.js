var app = angular.module('myApp', []); 
app.controller('todoCtrl', function($scope,$http) {
    $scope.todoList = [];
    
    //$scope.todoInput = "";
    $scope.todoAdd = function() {
        var postData={todo:$scope.todoInput, done:false}
      $http({
        url: '/posts',
        dataType: 'json',
        method: 'POST',
        data: postData
    }).success(function(data){
                 console.log(data);
      });
        $scope.todoList.push({todo:$scope.todoInput, done:false});
        $scope.todoInput = "";
    };

    $scope.remove = function() {
        //var oldList = $scope.todoList;
        $scope.oldList = [];
        angular.forEach($scope.todoList, function(x) {
            if (x.done) $scope.oldList.push(x);
        });
        var delData=angular.copy($scope.oldList);
        if(delData!=""){
        $http({
        url: '/delete',
        method: 'DELETE',
        data: delData,
       headers: {
            'Content-Type': 'application/json'
        }
    }).success(function(data){
                 $scope.getAll();
      });
        }
    };
    $scope.getAll=function(){
  $http.get('/posts').success(function(data){
    $scope.todoList=angular.copy(data);
  });
    }
     $scope.getAll();
});
