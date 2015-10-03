angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope,$state,Auth,$ionicPopup,$http) {
        $scope.loginData = {};
        $scope.doLogin = function() {

            if(!angular.isDefined($scope.loginData.username) || !angular.isDefined($scope.loginData.password) || $scope.loginData.username.trim() == "" || $scope.loginData.password.trim() == ""){
                alert("Enter both user name and password");
                return;
            }

            url = "http://srv.baptistebilly.com:8080/bo-android-bbvp/rest/connect/"+$scope.loginData.username+"/"+$scope.loginData.password;
            $http.get(url).success(function(response){
                if(response == "true")
                {
                    Auth.setUser($scope.loginData.username,$scope.loginData.password);
                    $state.go("tab.chats");
                }
                else {
                    $ionicPopup.alert({
                        title: 'Login failed!',
                        template: 'Please check your credentials!'
                    });
                }
            });

        }

        $scope.logout = function() {
            Auth.logout();
            $state.go("login");
        }
    })

.controller('ChatsCtrl', function($ionicLoading, $scope, $stateParams, $http) {
  $scope.$on('$ionicView.enter', function(e) {
      url = "http://srv.baptistebilly.com:8080/bo-android-bbvp/rest/messages";
      $http.get(url).success(function(response){
          $scope.messages = response.reverse();
      });
  });

})


.controller('SendMessage', function($scope, $state,Auth,$ionicPopup,$http) {
    $scope.loginData = {};
    $scope.sendMessage = function() {

        if(!angular.isDefined($scope.loginData.message) || $scope.loginData.message.trim() == ""){
            alert("Enter Message !");
            return;
        }

        var username = Auth.getUser();
        var password = Auth.getPassword();
        url = "http://srv.baptistebilly.com:8080/bo-android-bbvp/rest/envoyer/"+username+"/"+password+"/"+encodeURIComponent($scope.loginData.message);
        $http.get(url).success(function (response) {
            console.log(response);
            if(response == "true")
                $state.go("tab.chats");
            else {
                $ionicPopup.alert({
                    title: 'Message failed!',
                    template: 'Please try later!'
                });
            }
        });
    }
});
