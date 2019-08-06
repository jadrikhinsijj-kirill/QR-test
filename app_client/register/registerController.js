(function () {
    function registerController($http, $window) {
        var vm = this;
        vm.pageTitle = 'Регистрация';

        vm.isInvalidForm1 = true;
        vm.isInvalidForm2 = true;
        vm.fLogin = "";
        vm.fPassword = "";
        vm.fPassword2 = "";
        vm.errorMsg = "";


        vm.login = function () {
            $http.post('/api/register', {name: vm.fLogin, password: vm.fPassword})
                .success(function (data) {
                    $window.location.href = '/#/login';
                }).error(function (err) {
                console.log('Registarion error:', err);
                vm.errorMsg = 'Ошибка регистрации: ' + err.message;
                console.log(vm.errorMsg);
            })

        };

        vm.validate = function () {
            vm.isInvalidForm2 = !(vm.fLogin.length > 3 && vm.fLogin.length < 7 && vm.fPassword2.length > 5);
            vm.isInvalidForm1 = !(vm.fLogin.length > 3 && vm.fLogin.length < 7 && vm.fPassword.length > 5);
        };

        vm.checkPass = function () {

            vm.isInvalidForm2 = !(vm.fPassword === vm.fPassword2);
            vm.isInvalidForm1 = !(vm.fPassword === vm.fPassword2);
        }

        //vm.validate();

    }

    angular.module('myApp')
        .controller('registerController', registerController);
})();