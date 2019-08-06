(function () {
    function loginController($http, $window) {
        var vm = this;
        vm.pageTitle = 'Вход в систему';

        vm.isInvalidForm = true;
        vm.fLogin = "";
        vm.fPassword = "";
        vm.errorMsg = "";

        vm.login = function () {


            $http.post('/api/login', {name: vm.fLogin, password: vm.fPassword})
                .success(function (data) {

                    localStorage.setItem('token', data.token);
                    localStorage.setItem('login', vm.fLogin);

                    $window.location.href = '/#/list';

                }).error(function (err) {

                console.log('login error:', err);
                vm.errorMsg = 'Ошибка входа: ' + err.message;
            })

        };

        vm.validate = function () {
            vm.errorMsg = "";
            vm.isInvalidForm = !(vm.fLogin.length > 3 && vm.fLogin.length < 10 && vm.fPassword.length > 5);
        };

        vm.validate();

    }

    angular.module('myApp')
        .controller('loginController', loginController);
})();