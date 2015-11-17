'use strict';
angular.module('test').controller('EditItemController', function ($scope, $location, ApiService, $routeParams, Upload) {
    $scope.item = {};
    $scope.item.id = $routeParams.id;
    $scope.text_button = "Save";
    $scope.page_title = "Edit item";
    $scope.deleteprevious = false;
    $scope.init = function () {
        ApiService.GetItemById($scope.item.id).then(function (response) {
            if (response.status == 200) {
                $scope.item.title = response.data._title;
                $scope.item.time =  response.data._time;
                $scope.item.price = response.data._price ;
                $scope.item.image = response.data._image;
                $scope.isPreviousImage = !!response.data._image;
                $scope.submitItem = function () {
                    if ($scope.deleteprevious) {
                        ApiService.DeleteImage($scope.item.id).then(function (re) {
                            if (re.status == 200) {
                                if ($scope.file) {
                                    ApiService.UploadImage($scope.item.id, $scope.file).then(function (result) {
                                        if (result.status == 200) {
                                            $scope.uploadError = null;
                                            ApiService.EditItem($scope.item.id, $scope.item).then(function (res) {
                                                if (res.status == 200) {
                                                    $location.path('/user/items');
                                                } else if (res.status == 422) {
                                                    $scope.errors = res.data;
                                                }
                                            });
                                        } else {
                                            $scope.uploadError = "Can't upload image";
                                            $scope.file = null;
                                            $scope.init();
                                        }
                                    });
                                } else {
                                    ApiService.EditItem($scope.item.id, $scope.item).then(function (res) {
                                        if (res.status == 200) {
                                            $location.path('/user/items');
                                        } else if (res.status == 422) {
                                            $scope.errors = res.data;
                                        }
                                    });
                                }
                                $scope.uploadError = null;
                            } else {
                                $scope.uploadError = "Can't delete image";
                            }
                        });
                    } else {
                        if ($scope.file) {
                            ApiService.UploadImage($scope.item.id, $scope.file).then(function (result) {
                                if (result.status == 200) {
                                    $scope.uploadError = null;
                                    ApiService.EditItem($scope.item.id, $scope.item).then(function (res) {
                                        if (res.status == 200) {
                                            $location.path('/user/items');
                                        } else if (res.status == 422) {
                                            $scope.errors = res.data;
                                        }
                                    });
                                } else {
                                    $scope.uploadError = "Can't upload image";
                                    $scope.file = null;
                                    $scope.init();
                                }
                            });
                        } else {
                            ApiService.EditItem($scope.item.id, $scope.item).then(function (res) {
                                if (res.status == 200) {
                                    $location.path('/user/items');
                                } else if (res.status == 422) {
                                    $scope.errors = res.data;
                                }
                            });
                        }
                    }
                };

                //TODO
                $scope.deleteImage = function () {
                    $scope.item.image = "";
                    $scope.file = null;
                    if ($scope.isPreviousImage) {
                        $scope.deleteprevious = true;
                    }
                }
            } else if (response.status == 422) {
                $scope.errors = response.data;
            }
        });
    };

    $scope.init();
});
