var app = angular.module('myApp', []); 
app.controller('todoCtrl', function($scope,$http) {
    $scope.todoList = [];
      $scope.markAll = false;
    //$scope.todoInput = "";
    $scope.todoAdd = function() {
          if(event.keyCode == 13 && $scope.todoInput){
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
          }
    };
    
    
    
     $scope.isTodo = function(){
      return $scope.todoList.length > 0;  
  }
      $scope.toggleEditMode = function(){
      $(event.target).closest('li').toggleClass('editing');
          
  };
  $scope.editOnEnter = function(todo){
      if(event.keyCode == 13 && todo.todo){
          $scope.toggleEditMode();
          console.log(todo);
       $http({
        url: '/posts'+'/'+todo._id,
        method: 'PUT',
        data: todo,
       headers: {
            'Content-Type': 'application/json'
        }
    }).success(function(data){
                 $scope.getAll();
      });
      }
  };
    
      $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todoList, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };
      $scope.toggleMarkAll = function() {
          var counter = 0;
      angular.forEach($scope.todoList, function(todo) {
          
          if(todo.done==false){
        todo.done =$scope.markAll;
              counter +=1;
          }
      });
          
          if(counter==0){
              $scope.markAll = false;
          }
  };
     $scope.hasDone = function() {
      return ($scope.todoList.length != $scope.remaining());
  } 
      $scope.itemText = function() {
      return ($scope.todoList.length - $scope.remaining() > 1) ? "items" : "item";     
  };
    $scope.remove = function() {
        //var oldList = $scope.todoList;
        $scope.oldList = [];
        $scope.markAll = false;
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
