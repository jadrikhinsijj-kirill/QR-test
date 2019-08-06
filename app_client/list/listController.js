(function () {
    function listController($http, $window) {

        var vm = this;
        vm.pageTitle = 'Список тестов';
        vm.tableModel = [];
        vm.ip = location.host;
        vm.fName = "";
        vm.isInvalidForm = true;

        vm.modalAlertDfl = {
            successMsg: '',
            errorMsg: '',
            id: undefined,
            title: 'Удаление теста',
            message: '',
            doDelete: function () {
                $http.delete('/api/results/' + vm.modalAlert.id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).success(function () {
                    vm.modalAlert.successMsg = 'Удалено успешно';
                    jQuery('#modalAlert').modal('hide');
                }).error(function (err) {
                    console.log('get query error:', err);
                    vm.modalAlert.errorMsg = 'Ошибка удаления: ' + err.message;
                });
                $http.delete('/api/answers/' + vm.modalAlert.id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).success(function () {
                    vm.modalAlert.successMsg = 'Удалено успешно';
                    jQuery('#modalAlert').modal('hide');
                }).error(function (err) {
                    console.log('get query error:', err);
                    vm.modalAlert.errorMsg = 'Ошибка удаления: ' + err.message;
                });
                $http.delete('/api/questions/' + vm.modalAlert.id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).success(function () {
                    vm.modalAlert.successMsg = 'Удалено успешно';
                    jQuery('#modalAlert').modal('hide');
                }).error(function (err) {
                    console.log('get query error:', err);
                    vm.modalAlert.errorMsg = 'Ошибка удаления: ' + err.message;
                });
                $http.delete('/api/test/' + vm.modalAlert.id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).success(function () {
                    vm.modalAlert.successMsg = 'Удалено успешно';
                    vm.updateList();
                    jQuery('#modalAlert').modal('hide');
                }).error(function (err) {
                    console.log('get query error:', err);
                    vm.modalAlert.errorMsg = 'Ошибка удаления: ' + err.message;
                })
            }
        };

        vm.modalAlert = angular.copy(vm.modalAlertDfl);

        vm.delete = function (name, id) {
            vm.modalAlert.id = id;
            vm.modalAlert.message = 'Действительно удалить тест с названием: ' + name + '?';

            jQuery('#modalAlert').on("hidden.bs.modal", function () {
                vm.modalAlert = angular.copy(vm.modalAlertDfl);
            });

            jQuery('#modalAlert').modal('show');


        };

        vm.updateList = function () {

            $http.get('/api/test', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).success(function (data) {
                vm.tableModel = data;
            }).error(function (err) {
                if (err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed") {
                    $window.location.href = '/#/login';
                }
            })
        };
        vm.updateList();

        vm.modalAlertQR = {
            title: 'Прохождение теста',
            message: 'Тест доступен по ссылке:',
            ip:vm.ip,
            message2: 'Или по QR-коду:',
            doQR: function () {
                vm.updateList();
                jQuery('#modalAlertQR').modal('hide');
            }
        };
        vm.modalAlertQR = angular.copy(vm.modalAlertQR);

        vm.buttonQR = function () {
            $('div#qrcode').empty();
            jQuery('#qrcode').qrcode({
                width: 200,
                height: 200,
                text: vm.ip
            });

            jQuery('#modalAlertQR').on("hidden.bs.modal", function () {
                vm.modalAlertQR = angular.copy(vm.modalAlertQR);
            });

            jQuery('#modalAlertQR').modal('show');
        };

        vm.answers = function (i) {

            if (vm.array[i].suffix === "null") {
                vm.array[i].suffix = null;
            }

            $http.post('/api/questions', {
                text: vm.array[i].text,
                type: vm.array[i].type,
                name: vm.modalAlertCopy.fName,
                suffix: vm.array[i].suffix
            }, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
                .success(function (data) {
                    console.log('add questions ok:', data);

                }).error(function (err) {
                if (err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed") {
                    $window.location.href = '/#/login';
                }
            });

            $http.get('/api/answers/' + vm.array[i].id_q, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).success(function (data) {

                if (vm.array[i].type === "MCR" || vm.array[i].type === "MCC" || vm.array[i].type === "MCQ") {
                    vm.answer = [];
                    for (var j = 0; j < data.length; j++) {
                        vm.answer.push({answer: data[j].answer, correct: data[j].correct, percent: data[j].percent});
                    }
                    vm.array[i].answer = {choices: vm.answer};

                    for (var k = 0; k < vm.array[i].answer.choices.length; k++) {
                        if (vm.array[i].answer.choices[k].percent === undefined) {
                            vm.array[i].answer.choices[k].percent = null;
                        }
                        $http.post('/api/answers', {
                            answer: vm.array[i].answer.choices[k].answer,
                            correct: vm.array[i].answer.choices[k].correct,
                            text: vm.array[i].text,
                            left: null,
                            right: null,
                            low: null,
                            high: null,
                            percent: vm.array[i].answer.choices[k].percent,
                            name: vm.modalAlertCopy.fName
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
                if (vm.array[i].type === "TF") {
                    vm.array[i].answer = {correct: data[0].correct};

                    $http.post('/api/answers', {
                        answer: null,
                        correct: vm.array[i].answer.correct,
                        text: vm.array[i].text,
                        left: null,
                        right: null,
                        low: null,
                        high: null,
                        percent: null,
                        name: vm.modalAlertCopy.fName
                    }, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
                        .success(function (data) {
                            console.log('add answers ok:', data);

                        }).error(function (err) {
                        if (err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed") {
                            $window.location.href = '/#/login';
                        }
                    });
                }
                if (vm.array[i].type === "N") {
                    vm.array[i].answer = {low: data[0].low, high: data[0].high};

                    $http.post('/api/answers', {
                        answer: null,
                        correct: null,
                        text: vm.array[i].text,
                        left: null,
                        right: null,
                        low: vm.array[i].answer.low,
                        high: vm.array[i].answer.high,
                        percent: null,
                        name: vm.modalAlertCopy.fName
                    }, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
                        .success(function (data) {
                            console.log('add answers ok:', data);

                        }).error(function (err) {
                        if (err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed") {
                            $window.location.href = '/#/login';
                        }
                    });
                }
                if (vm.array[i].type === "M") {
                    vm.answer = [];
                    for (var j = 0; j < data.length; j++) {
                        vm.answer.push({left: data[j].left_a, right: data[j].right_a});
                    }
                    vm.array[i].answer = {pairs: vm.answer};

                    for (var k = 0; k < vm.array[i].answer.pairs.length; k++) {
                        $http.post('/api/answers', {
                            answer: null,
                            correct: null,
                            text: vm.array[i].text,
                            left: vm.array[i].answer.pairs[k].left,
                            right: vm.array[i].answer.pairs[k].right,
                            low: null,
                            high: null,
                            percent: null,
                            name: vm.modalAlertCopy.fName
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
                if (vm.array[i].type === "NMC") {
                    vm.answer = [];
                    for (var j = 0; j < data.length; j++) {
                        vm.answer.push({low: data[j].low, high: data[j].high, percent: data[j].percent});
                    }
                    vm.array[i].answer = {choices: vm.answer};

                    for (var k = 0; k < vm.array[i].answer.choices.length; k++) {
                        if (vm.array[i].answer.choices[k].percent === undefined) {
                            vm.array[i].answer.choices[k].percent = 100;
                        }
                        $http.post('/api/answers', {
                            answer: null,
                            correct: null,
                            text: vm.array[i].text,
                            left: null,
                            right: null,
                            low: vm.array[i].answer.choices[k].low,
                            high: vm.array[i].answer.choices[k].high,
                            percent: vm.array[i].answer.choices[k].percent,
                            name: vm.modalAlertCopy.fName
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

            }).error(function (err) {
                if (err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed") {
                    $window.location.href = '/#/login';
                }
            });
        };

        vm.modalAlertCopy = {
            title: 'Копирование теста',
            message: '',
            successMsg: '',
            errorMsg: '',
            fName: undefined,
            tableModel: '',
            fTime: undefined,
            id: undefined,
            doCopy: function () {
                vm.fTime = Number(document.getElementById("time").value);
                if (vm.modalAlertCopy.fTime > 100) {
                    vm.modalAlertCopy.fTime = 100;
                }
                if (vm.modalAlertCopy.fTime < 1) {
                    vm.modalAlertCopy.fTime = 1;
                }
                if (vm.modalAlertCopy.fName.length < 5) {
                    vm.modalAlertCopy.errorMsg = 'Название теста должно быть не менее 5 символов';
                } else {
                    vm.modalAlertCopy.errorMsg = '';
                    for (var i = 0; i < vm.tableModel.length; i++) {
                        if (vm.tableModel[i].name === vm.modalAlertCopy.fName) {
                            vm.modalAlertCopy.errorMsg = "Тест с таким названием уже существует";
                        }
                    }
                }

                if (vm.modalAlertCopy.errorMsg === '') {
                    $http.post('/api/test', {
                        name: vm.modalAlertCopy.fName,
                        time: vm.modalAlertCopy.fTime
                    }, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
                        .success(function (data) {
                            console.log('add test ok:', data);
                        }).error(function (err) {
                        if (err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed") {
                            $window.location.href = '/#/login';
                        }
                    });
                    $http.get('/api/questions/' + vm.modalAlertCopy.id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).success(function (data) {
                        vm.modalAlertCopy.tableModel = data;
                        vm.array = vm.modalAlertCopy.tableModel;
                        for (var i = 0; i < vm.array.length; i++) {
                            vm.answers(i);
                        }
                    }).error(function (err) {
                        if (err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed") {
                            $window.location.href = '/#/login';
                        }
                    });

                    vm.updateList();
                    jQuery('#modalAlertCopy').modal('hide');
                }
            }
        };

        vm.modalAlertCopy = angular.copy(vm.modalAlertCopy);

        vm.copyTest = function (id) {
            vm.modalAlertCopy.id = id;
            console.log(vm.tableModel);
            for (var i=0;i<vm.tableModel.length;i++){
                if(vm.tableModel[i].id_t === vm.modalAlertCopy.id){
                    vm.modalAlertCopy.fName = vm.tableModel[i].name+" - копия";
                    vm.modalAlertCopy.fTime = vm.tableModel[i].time;
                }
            }
            jQuery('#modalAlertCopy').on("hidden.bs.modal", function () {
                vm.modalAlertCopy = angular.copy(vm.modalAlertCopy);
            });

            jQuery('#modalAlertCopy').modal('show');
        };


        vm.start = function (id) {

            $http.put('/api/update').success(function () {
                $http.put('/api/startTest/' + id).success(function () {
                    vm.modalAlertQR.message = "Тест успешно начат, чтобы начать перейдите по ссылке:";
                    vm.buttonQR();
                    console.log('Тест начат');
                }).error(function (err) {
                    console.log('Ошибка старта теста:', err);
                })
            }).error(function (err) {
                console.log('Ошибка старта теста:', err);
            })

        }
    }

    angular.module('myApp')
        .controller('listController', listController);
})();