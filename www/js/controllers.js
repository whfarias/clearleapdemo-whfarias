angular.module('VideoDemo.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, localStorageService, $state) {
    // Create the login modal that we will use later

    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    $scope.doLogin = function(usernameForm, passwordForm) {


    //  getLogin(user, password, deviceId, type)
    var res = new WLResourceRequest("adapters/LoginAdapter/getLogin", WLResourceRequest.POST);



      // var formParams =  {"params":"['value1', 'value2']"}
      var formParams = [
        usernameForm,
        passwordForm,
        'teste' ,
        'ios'
      ];

      var params = {'params' : JSON.stringify(formParams)};

      console.log(JSON.stringify(params));

      res.setQueryParameter("params", formParams);

      res.send().then(
       function(response){
         $scope.ClearToken = "";
         $scope.ClearToken = JSON.stringify(response.responseJSON.result.token);

         console.log(JSON.stringify(response));
         alert("logado token :" + $scope.ClearToken);
     },
      function (error){
        console.log("Error!!!!!!");
        console.log(error.errorMsg);
        alert ("Error na chamada do Adapter" + error.errorMsg);

      });

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      // $timeout(function() {
      //   $scope.closeLogin();
      // }, 1000);
    };

    $scope.viewVideo = function (item) {
      localStorageService.set('viewVideo', item)
      $state.go("app.item", {id: item.id})
    };
  })
