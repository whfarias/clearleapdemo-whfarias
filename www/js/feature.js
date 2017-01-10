angular.module('VideoDemo')

.controller('FeatureCtrl', function($scope, $ionicModal, $timeout, $http, localStorageService, $state) {

    $scope.data = {};

    $scope.doRefresh = function() {
      $timeout(function () {
        _getData();

        $scope.$broadcast('scroll.refreshComplete');
      }, 2000);
    };

    var _getData = function () {
      //Busca lista de filmes no ClearLeap
      var formParams = [
        $scope.ClearDeviceID,
        $scope.ClearToken
      ];

      var res = new WLResourceRequest("adapters/catalogAdapter/getCatalog", WLResourceRequest.POST);

      res.setQueryParameter("params", formParams);

        res.send().then(
         function(response){
           console.log(JSON.stringify(response.responseJSON));
          $scope.data.videos = response.responseJSON;
           console.log(JSON.stringify($scope.data.videos));
          //  alert(JSON.stringify($scope.data.videos));
           alert ($scope.ClearToken);
           $scope.$apply();
       },
        function (error){
          console.log("Error!!!!!!");
          console.log(error.errorMsg);
          alert ("Error na chamada do Adapter" + error.errorMsg);

        });

      // $http({method: 'GET', url: './js/data/videos.json'}).then(function successCallback(response) {
      //   console.log (response.data);
      //   $scope.data.videos = response.data;
      // }, function errorCallback(response) {
      //   console.log(response)
      // });
    };

    var _init = function () {
      $scope.data.videos = [];
      _getData();
    };

    _init();

});
