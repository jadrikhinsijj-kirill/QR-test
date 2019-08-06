(function () {
    function addController($http, $window, $scope, Parser) {
        var vm = this;
        vm.testadd = 'Добавление теста';
        vm.isInvalidForm = true;
        vm.fName = "";
        vm.fTime = "";
        vm.idTest = "";
        vm.checkTest = "";
        vm.validate = function () {
            vm.isInvalidForm = !(vm.fName.length >= 5);

        };
        vm.validate();

        if (localStorage.getItem('token') === null || angular.isUndefined(localStorage.getItem('token'))) {
            console.log('UnauthorizedError');
            location.href = '/#/login';
        }

        vm.modalAlertAdd = {
            title: 'Добавление теста',
            errorMsg: '',
            successMsg: '',
            message: '',
            doCreate: function () {
                vm.fTime = Number(document.getElementById("time").value);
                if (vm.fTime > 100) {
                    vm.fTime = 100;
                }
                if (vm.fTime < 1) {
                    vm.fTime = 1;
                }
                $http.get('/api/test', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).success(function (data) {
                    vm.checkTest = data;
                    if (vm.checkTest.length === 0) {
                        vm.modalAlert.errorMsg === "";
                    } else {
                        vm.array = $scope.state.questions;
                        if (vm.array.length === 0) {
                            vm.modalAlert.errorMsg = "Добавьте вопросы";
                        }
                        if (vm.modalAlert.errorMsg === "") {
                            for (var i = 0; i < vm.checkTest.length; i++) {
                                if (vm.checkTest[i].name === vm.fName) {
                                    vm.modalAlert.errorMsg = "Тест с таким названием уже существует";
                                }
                            }
                        }
                        if (vm.modalAlert.errorMsg === "") {
                            vm.countQ = 0;
                            vm.array = $scope.state.questions;
                            for (var i = 0; i < vm.array.length; i++) {
                                for (var j = i + 1; j < vm.array.length; j++) {
                                    if (vm.array[i].question === vm.array[j].question) {
                                        vm.modalAlert.errorMsg = "Названия вопросов должны быть разные";
                                    }
                                }
                            }
                        }
                    }
                    if (vm.modalAlert.errorMsg === "") {
                        $http.post('/api/test', {
                            name: vm.fName,
                            time: vm.fTime
                        }, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
                            .success(function (data) {
                                console.log('add test ok:', data);
                            }).error(function (err) {
                            if (err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed") {
                                $window.location.href = '/#/login';
                            }
                        });


                        vm.array = $scope.state.questions;
                        for (var i = 0; i < vm.array.length; i++) {
                            vm.count = 0;
                            if (vm.array[i].type === "MC") {
                                for (var j = 0; j < vm.array[i].answer.choices.length; j++) {
                                    if (vm.array[i].answer.choices[j].correct === true) {
                                        vm.count++;
                                    }
                                }
                                if (vm.count === 0) {
                                    vm.fType = "MCC";
                                }
                                if (vm.count === 1) {
                                    vm.fType = "MCR";
                                }
                                if (vm.count > 1) {
                                    vm.fType = "MCQ";
                                }
                            }
                            if (vm.array[i].type === "TF") {
                                vm.fType = "TF";
                            }
                            if (vm.array[i].type === "N") {
                                vm.fType = "N";
                            }
                            if (vm.array[i].type === "M") {
                                vm.fType = "M";
                            }
                            if (vm.array[i].type === "NMC") {
                                vm.fType = "NMC";
                            }
                            if (vm.array[i].suffix === undefined) {
                                vm.array[i].suffix = null;
                            }
                            $http.post('/api/questions', {
                                text: vm.array[i].question,
                                type: vm.fType,
                                name: vm.fName,
                                suffix: vm.array[i].suffix
                            }, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
                                .success(function (data) {
                                    console.log('add questions ok:', data);

                                }).error(function (err) {
                                if (err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed") {
                                    $window.location.href = '/#/login';
                                }
                            });

                            if (vm.array[i].type === "MC") {

                                for (var j = 0; j < vm.array[i].answer.choices.length; j++) {
                                    if (vm.array[i].answer.choices[j].weight === undefined) {
                                        vm.array[i].answer.choices[j].weight = null;
                                    }
                                    $http.post('/api/answers', {
                                        answer: vm.array[i].answer.choices[j].text,
                                        correct: vm.array[i].answer.choices[j].correct,
                                        text: vm.array[i].question,
                                        left: null,
                                        right: null,
                                        low: null,
                                        high: null,
                                        percent: vm.array[i].answer.choices[j].weight,
                                        name: vm.fName
                                    }, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
                                        .success(function (data) {
                                            console.log('add answers ok:', data);

                                        }).error(function (err) {
                                        if (err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed") {
                                            $window.location.href = '/#/login';
                                        }
                                    });
                                }
                            }

                            if (vm.fType === "TF") {
                                $http.post('/api/answers', {
                                    answer: null,
                                    correct: vm.array[i].answer.correct,
                                    text: vm.array[i].question,
                                    left: null,
                                    right: null,
                                    low: null,
                                    high: null,
                                    percent: null,
                                    name: vm.fName
                                }, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
                                    .success(function (data) {
                                        console.log('add answers ok:', data);

                                    }).error(function (err) {
                                    if (err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed") {
                                        $window.location.href = '/#/login';
                                    }
                                });
                            }
                            if (vm.fType === "N") {
                                $http.post('/api/answers', {
                                    answer: null,
                                    correct: null,
                                    text: vm.array[i].question,
                                    left: null,
                                    right: null,
                                    low: vm.array[i].answer.low,
                                    high: vm.array[i].answer.high,
                                    percent: null,
                                    name: vm.fName
                                }, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
                                    .success(function (data) {
                                        console.log('add answers ok:', data);

                                    }).error(function (err) {
                                    if (err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed") {
                                        $window.location.href = '/#/login';
                                    }
                                });
                            }
                            if (vm.fType === "M") {

                                for (var j = 0; j < vm.array[i].answer.pairs.length; j++) {
                                    $http.post('/api/answers', {
                                        answer: null,
                                        correct: null,
                                        text: vm.array[i].question,
                                        left: vm.array[i].answer.pairs[j].left,
                                        right: vm.array[i].answer.pairs[j].right,
                                        low: null,
                                        high: null,
                                        percent: null,
                                        name: vm.fName
                                    }, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
                                        .success(function (data) {
                                            console.log('add answers ok:', data);

                                        }).error(function (err) {
                                        if (err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed") {
                                            $window.location.href = '/#/login';
                                        }
                                    });
                                }
                            }
                            if (vm.fType === "NMC") {

                                for (var j = 0; j < vm.array[i].answer.choices.length; j++) {
                                    if (vm.array[i].answer.choices[j].weight === undefined) {
                                        vm.array[i].answer.choices[j].weight = 100;
                                    }
                                    $http.post('/api/answers', {
                                        answer: null,
                                        correct: null,
                                        text: vm.array[i].question,
                                        left: null,
                                        right: null,
                                        low: vm.array[i].answer.choices[j].low,
                                        high: vm.array[i].answer.choices[j].high,
                                        percent: vm.array[i].answer.choices[j].weight,
                                        name: vm.fName
                                    }, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
                                        .success(function (data) {
                                            console.log('add answers ok:', data);

                                        }).error(function (err) {
                                        if (err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed") {
                                            $window.location.href = '/#/login';
                                        }
                                    });
                                }
                            }
                        }


                        vm.modalAlert.successMsg = 'Тест добавлен успешно!';
                        $window.location.href = '/#/list';
                        jQuery('#modalAlert').modal('hide');
                    }

                }).error(function (err) {
                    if (err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed") {
                        $window.location.href = '/#/login';
                    }
                });

            }
        };

        vm.modalAlert = angular.copy(vm.modalAlertAdd);

        vm.create = function () {
            vm.modalAlert.message = 'Действительно добавить тест?';

            jQuery('#modalAlert').on("hidden.bs.modal", function () {
                vm.modalAlert = angular.copy(vm.modalAlertAdd);
            });

            jQuery('#modalAlert').modal('show');

        };


        $scope.state = {
            input: '',
            questions: [],
            error: null,
            errorLine: null
        };


        $scope.$watch('state.input', parsing);

        function parsing(value) {
            if (value.trim() == '') {
                $scope.state.questions = [];
                $scope.state.error = null;
                $scope.state.errorLine = null;
                return;
            }

            Parser.then(function (parser) {
                try {
                    $scope.state.questions = parser.parse(value);
                    console.log($scope.state.questions);
                    $scope.state.error = null;
                    $scope.state.errorLine = null;
                } catch (e) {
                    $scope.state.questions = [];

                    $scope.state.error = e.name + ' (line ' + e.location.start.line +
                        ', column ' + e.location.start.column + '): ' + e.message;

                    $scope.state.errorLine = '';

                    vm.i = "";
                    vm.lines = $scope.state.input.split(/\r?\n/);
                    for (vm.i = Math.max(0, e.location.start.line - 5);
                         vm.i < e.location.start.line;
                         ++vm.i) {
                        $scope.state.errorLine += vm.lines[i] + '\n';
                    }

                    for (vm.i = 1; vm.i < e.location.start.column; ++vm.i) {
                        $scope.state.errorLine += ' ';
                    }
                    $scope.state.errorLine += '^';
                }
            });
        }

        processFiles = function (files) {

            vm.file = files[0];
            vm.reader = new FileReader();
            vm.reader.onload = function (e) {
                vm.state1 = e.target.result;
                parsing(vm.state1);
                $('textarea').val(vm.state1);

            };
            vm.reader.readAsText(vm.file);
        };

    }

    angular.module('myApp')
        .controller('addController', addController);
})();

