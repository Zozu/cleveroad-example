'use strict';
angular
    .module('test')
    .factory('ApiService', function ($http) {
        var $scope = {};

        $scope.SearchItems = SearchItems;
        $scope.Registrate = Registrate;
        $scope.GetItemById = GetItemById;
        $scope.GetUserById = GetUserById;
        $scope.UserSave = UserSave;
        $scope.SearchUsers = SearchUsers;
        $scope.Delete = Delete;
        $scope.CreateItem = CreateItem;
        $scope.EditItem = EditItem;
        //$scope.UploadImage = UploadImage;
        return $scope;

        function SearchItems(params) {
            return $http.get("/api/item", {
                params: params
            }).
            then(handleSuccess, handleError);
        }

        function SearchUsers(params) {
            return $http.get("/api/user", {
                params: params
            }).
            then(handleSuccess, handleError);
        }

        function GetItemById(id) {
            return $http.get("/api/item/" + id, {}).then(handleSuccess, handleError);

        }

        function GetUserById(id) {
            return $http.get("/api/user/" + id, {}).then(handleSuccess, handleError);
        }

        function CreateItem(item) {
            return $http.post("/api/item", item).then(handleSuccess, handleError);
        }

        /*function UploadImage(id, image) {
            return Upload.upload({
                method: 'POST',
                url:"/api/item/" + id + "/image",
                file: image
            }).then(handleSuccess, handleError);
        }*/

        function EditItem(id, item) {
            return $http.put("/api/item/" + id, item).then(handleSuccess, handleError);
        }


        function UserSave(user) {
            return $http.put("/api/me", user).then(handleSuccess, handleError);
        }

        function Delete(id) {
            return $http.delete("/api/item/" + id, {}).then(handleSuccess, handleError);
        }

        function Registrate(user) {
            return $http.post("/api/register", user).then(handleSuccess, handleError);
        }

        function handleSuccess(res) {
            return res;
        }

        function handleError(error) {
            return error;
        }
    });
