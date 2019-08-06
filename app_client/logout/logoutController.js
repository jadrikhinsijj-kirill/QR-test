(function () {
    function logoutController($window, $http) {
        $http.put('/api/statusUser').success(function () {
            localStorage.removeItem('token');
            localStorage.removeItem('login');
            $window.location.href = '/#/login';
        }).error(function (err) {
            console.log('Ошибка старта теста:', err);
        })

    }

    angular.module('myApp')
        .controller('logoutController', logoutController);
})();