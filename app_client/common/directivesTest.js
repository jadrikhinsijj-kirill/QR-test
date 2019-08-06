angular.module('myApp')

    .directive('test', function () {
        return {
            templateUrl: '/parser/questions/directivesTest/test.html',
            restrict: 'E',
            require: 'ngModel',
            scope: {
                ngModel: '<'
            }
        };
    })


    .directive('mccQuestion', function () {
        return {
            templateUrl: '/parser/questions/directivesTest/mcc_question.html',
            restrict: 'E',
            require: 'ngModel',
            scope: {
                ngModel: '<'
            }
        };
    })
    .directive('mcrQuestion', function () {
        return {
            templateUrl: '/parser/questions/directivesTest/mcr_question.html',
            restrict: 'E',
            require: 'ngModel',
            scope: {
                ngModel: '<'
            }
        };
    })
    .directive('mcqQuestion', function () {
        return {
            templateUrl: '/parser/questions/directivesTest/mcq_question.html',
            restrict: 'E',
            require: 'ngModel',
            scope: {
                ngModel: '<'
            }
        };
    })

    .directive('tftfQuestion', function () {
        return {
            templateUrl: '/parser/questions/directivesTest/tf_question.html',
            restrict: 'E',
            require: 'ngModel',
            scope: {
                ngModel: '<'
            }
        };
    })
    .directive('nnQuestion', function () {
        return {
            templateUrl: '/parser/questions/directivesTest/n_question.html',
            restrict: 'E',
            require: 'ngModel',
            scope: {
                ngModel: '<'
            }
        };
    })
    .directive('nmcnmcQuestion', function () {
        return {
            templateUrl: '/parser/questions/directivesTest/nmc_question.html',
            restrict: 'E',
            require: 'ngModel',
            scope: {
                ngModel: '<'
            }
        };
    })

    .directive('mmQuestion', function () {
        return {
            templateUrl: '/parser/questions/directivesTest/m_question.html',
            restrict: 'E',
            require: 'ngModel',
            scope: {
                ngModel: '<'
            }
        };
    })
;
