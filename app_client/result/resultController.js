(function () {
    function resultController($http, $window, $routeParams) {

        var vm = this;
        vm.pageTitle = 'Список результатов';
        vm.tableModel = [];
        vm.test = [];
        vm.nameTest = "";

        vm.modalAlertDfl = {
            successMsg: '',
            errorMsg: '',
            id: undefined,
            title: 'Удаление записи',
            message: '',
            doDelete: function () {
                $http.delete('/api/deleteResult/' + vm.modalAlert.id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).success(function () {
                    vm.modalAlert.successMsg = 'Удалено успешно';
                    vm.updateList($routeParams.id);
                    jQuery('#modalAlert').modal('hide');
                }).error(function (err) {
                    console.log('get query error:', err);
                    vm.modalAlert.errorMsg = 'Ошибка удаления: ' + err.message;
                })
            }
        };

        vm.modalAlert = angular.copy(vm.modalAlertDfl);

        vm.delete = function (id) {
            $http.get('/api/getResult/' + id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
                .success(function (data) {
                    vm.fName = data[0].fio;
                    vm.modalAlert.id = id;
                    vm.modalAlert.message = 'Действительно удалить результат человека: ' + vm.fName + '?';
                }).error(function (err) {
                console.log('edit error:', err);
            });

            jQuery('#modalAlert').on("hidden.bs.modal", function () {
                vm.modalAlert = angular.copy(vm.modalAlertDfl);
            });

            jQuery('#modalAlert').modal('show');


        };

        vm.updateList = function (id) {
            $http.get('/api/test', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).success(function (data) {
                vm.test = data;
                for (var i = 0; i < vm.test.length; i++) {
                    if (vm.test[i].id_t == $routeParams.id) {
                        vm.nameTest = "Тест: "+vm.test[i].name;

                    }
                }
            }).error(function (err) {
                if (err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed") {
                    $window.location.href = '/#/login';
                }
            });
            $http.get('/api/listResult/' + id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).success(function (data) {
                vm.tableModel = data;
            }).error(function (err) {
                if (err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed") {
                    $window.location.href = '/#/login';
                }
            })
        };

        vm.updateList($routeParams.id);

        vm.print = function () {
            localStorage.setItem("id", $routeParams.id);
            localStorage.setItem("nameTest", vm.nameTest);
            $window.location.href = '/#/print';
        }

    }

    angular.module('myApp')
        .controller('resultController', resultController);
})();