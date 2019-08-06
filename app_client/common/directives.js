angular.module('myApp')

    .directive('question', function () {
        return {
            templateUrl: '/parser/questions/directives/question.html',
            restrict: 'E',
            require: 'ngModel',
            scope: {
                ngModel: '<'
            }
        };
    })


    .directive('mcQuestion', function () {
        return {
            templateUrl: '/parser/questions/directives/mc_question.html',
            restrict: 'E',
            require: 'ngModel',
            scope: {
                ngModel: '<'
            }
        };
    })

    .directive('tfQuestion', function () {
        return {
            templateUrl: '/parser/questions/directives/tf_question.html',
            restrict: 'E',
            require: 'ngModel',
            scope: {
                ngModel: '<'
            }
        };
    })
    .directive('nQuestion', function () {
        return {
            templateUrl: '/parser/questions/directives/n_question.html',
            restrict: 'E',
            require: 'ngModel',
            scope: {
                ngModel: '<'
            }
        };
    })
    .directive('nmcQuestion', function () {
        return {
            templateUrl: '/parser/questions/directives/nmc_question.html',
            restrict: 'E',
            require: 'ngModel',
            scope: {
                ngModel: '<'
            }
        };
    })

    .directive('mQuestion', function () {
        return {
            templateUrl: '/parser/questions/directives/m_question.html',
            restrict: 'E',
            require: 'ngModel',
            scope: {
                ngModel: '<'
            }
        };
    })

    .directive('iQuestion', function () {
        return {
            templateUrl: '/parser/questions/directives/i_question.html',
            restrict: 'E',
            require: 'ngModel',
            scope: {
                ngModel: '<'
            }
        };
    })
;
