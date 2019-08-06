(function() {
    angular.module('myApp', ['ngRoute','ui.bootstrap']);

    function config($routeProvider) {

        $routeProvider
            .when('/', {
                    templateUrl: 'index/index.html',
                    controller: 'indexController',
                    controllerAs: 'vm'
                }
            ).when('/list', {
                templateUrl: 'list/list.html',
                controller: 'listController',
                controllerAs: 'vm'
                }
            ).when('/add', {
                templateUrl: 'add/add.html',
                controller: 'addController',
                controllerAs: 'vm',
                }
            ).when('/result/:id', {
                templateUrl: 'result/result.html',
                controller: 'resultController',
                controllerAs: 'vm'
            }
            ).when('/endtest', {
                templateUrl: 'endtest/endtest.html',
                controller: 'endtestController',
                controllerAs: 'vm'
            }
            ).when('/print', {
                templateUrl: 'print/print.html',
                controller: 'printController',
                controllerAs: 'vm'
            }
            ).when('/login', {
                templateUrl: 'login/login.html',
                controller: 'loginController',
                controllerAs: 'vm'
            }
            ).when('/logout', {
                templateUrl: 'logout/logout.html',
                controller: 'logoutController',
                controllerAs: 'vm'
            }
            ).when('/register', {
                templateUrl: 'register/register.html',
                controller: 'registerController',
                controllerAs: 'vm'
            }
        ).otherwise({redirectTo: '/'});

    }

    angular.module('myApp')
        .config(['$routeProvider', config]);
})();