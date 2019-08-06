(function () {
    function indexController($http, $window) {
        var vm = this;
        vm.pageTitle = 'Прохождение теста';
        vm.isInvalidForm = true;
        vm.tableModel = [];
        vm.fName = "Пользователь №"+ (Math.floor(Math.random() * (9999999 - 1000 + 1)) + 1000);
        vm.time = "";
        vm.id = "";
        vm.type = "";
        vm.errorMsg = "";
        vm.validate = function () {
            vm.isInvalidForm = !(vm.fName.length >= 4);
        };
        vm.validate();

        vm.answers = function (i) {
            if (vm.tableModel[i].suffix === "null") {
                delete vm.tableModel[i].suffix;
            }
            vm.tableModel[i].index = i + 1;
            $http.get('/api/answers/' + vm.tableModel[i].id_q, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).success(function (data) {

                if (vm.tableModel[i].type === "MCR" || vm.tableModel[i].type === "MCC" || vm.tableModel[i].type === "MCQ") {
                    vm.answer = [];
                    for (var j = 0; j < data.length; j++) {
                        vm.answer.push({answer: data[j].answer, correct: data[j].correct, percent: data[j].percent});
                    }
                    vm.tableModel[i].answer = vm.answer;
                }
                if (vm.tableModel[i].type === "TF") {
                    vm.tableModel[i].answer = {correct: data[0].correct}
                }
                if (vm.tableModel[i].type === "N") {
                    vm.tableModel[i].answer = {low: data[0].low, high: data[0].high}
                }
                if (vm.tableModel[i].type === "M") {
                    vm.answer = [];
                    for (var j = 0; j < data.length; j++) {
                        vm.answer.push({left: data[j].left_a, right: data[j].right_a, index: j + 1});
                    }
                    vm.tableModel[i].answer = vm.answer;
                }
                if (vm.tableModel[i].type === "NMC") {
                    vm.answer = [];
                    for (var j = 0; j < data.length; j++) {
                        vm.answer.push({low: data[j].low, high: data[j].high, percent: data[j].percent});
                    }
                    vm.tableModel[i].answer = vm.answer;
                }
            }).error(function (err) {
                if (err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed") {
                    $window.location.href = '/#/login';
                }
            });
        };


        vm.start = function () {
            $http.post('/api/getUser').success(function (data) {
                localStorage.setItem('token', data.token);
            }).error(function (err) {
                console.log('login error:', err);
            });
            $http.get('/api/findTest', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).success(function (data) {
                vm.id = data[0].id_t;
                vm.time = data[0].time;
                vm.errorMsg = "";
                $http.get('/api/listResult/' + vm.id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).success(function (data) {
                    vm.res = data;
                    if (vm.res.length === 0) {
                        vm.errorMsg = "";
                    } else {
                        for (var i = 0; i < vm.res.length; i++) {
                            if (vm.res[i].fio === vm.fName) {
                                vm.errorMsg = "Человек с таким ФИО уже проходил этот тест";
                            }
                        }
                    }
                    if (vm.errorMsg === "") {
                        document.getElementById("timer1").innerHTML = vm.time;

                        $http.get('/api/questions/' + vm.id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).success(function (data) {
                            vm.tableModel = data;
                            for (var i = 0; i < vm.tableModel.length; i++) {
                                vm.answers(i);
                            }
                            console.log(vm.tableModel);
                            $("div#start").addClass('hide');
                            $("div#end").removeClass('hide');
                            $("div#timer").removeClass('hide');

                            document.getElementById("timer2").innerHTML = 0;
                            setTimeout(timer, 1000);
                        }).error(function (err) {
                            if (err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed") {
                                $window.location.href = '/#/login';
                            }
                        });
                    }
                }).error(function (err) {
                    if (err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed") {
                        $window.location.href = '/#/login';
                    }
                });

            }).error(function (err) {
                if (err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed") {
                    $window.location.href = '/#/login';
                }
            });
        };


        timer = function () {
            vm.obj1 = document.getElementById('timer1');
            vm.obj2 = document.getElementById('timer2');
            if (vm.obj2.innerHTML == 0) {
                vm.obj1.innerHTML--;
                vm.obj2.innerHTML = 59;
            } else {
                vm.obj2.innerHTML--;
            }
            if ((vm.obj1.innerHTML == 0) && (vm.obj2.innerHTML == 0)) {
                vm.endTest();
            } else {
                setTimeout(timer, 1000);
            }

        };

        vm.endTest = function () {
            vm.result = 0;
            for (var i = 0; i < vm.tableModel.length; i++) {
                if (vm.tableModel[i].type === "MCR") {
                    if (vm.tableModel[i].suffix === undefined) {
                        vm.q = document.forms['quiz'].elements['q' + (i + 1)];
                        for (var j = 0; j < vm.q.length; j++) {
                            if ((vm.q[j].checked) && (vm.q[j].value == 1)) {
                                vm.result++;
                            }
                        }
                    } else {
                        vm.ans = document.getElementById(i + 1).value.trim();
                        for (var j = 0; j < vm.tableModel[i].answer.length; j++) {
                            if ((vm.ans === vm.tableModel[i].answer[j].answer) && (vm.tableModel[i].answer[j].correct === 1)) {
                                vm.result++;
                            }
                        }
                    }
                }
                if (vm.tableModel[i].type === "MCC") {
                    vm.resultQ = 0;
                    vm.q = document.forms['quiz'].elements['q' + (i + 1)];
                    for (var j = 0; j < vm.q.length; j++) {
                        if (vm.q[j].value === "null") {
                            vm.q[j].value = "100";
                        }
                        if (vm.q[j].checked) {
                            vm.resultQ += (vm.q[j].value / 100);
                        }
                    }
                    if ((vm.resultQ > 0) && (vm.resultQ <= 1)) {
                        vm.result += vm.resultQ;
                    }
                    if (vm.resultQ > 1) {
                        vm.result++;
                    }
                }
                if (vm.tableModel[i].type === "MCQ") {
                    vm.ans = document.getElementById(i + 1).value;
                    for (var j = 0; j < vm.tableModel[i].answer.length; j++) {
                        if ((vm.ans === vm.tableModel[i].answer[j].answer) && (vm.tableModel[i].answer[j].correct === 1)) {
                            vm.result++;
                        }
                    }
                }
                if (vm.tableModel[i].type === "TF") {

                    vm.q = document.forms['quiz'].elements['q' + (i + 1)];
                    if ((vm.q[0].checked) && (vm.tableModel[i].answer.correct === 1)) {
                        vm.result++;
                    }
                    if ((vm.q[1].checked) && (vm.tableModel[i].answer.correct === 0)) {
                        vm.result++;
                    }
                }
                if (vm.tableModel[i].type === "N") {
                    vm.ans = document.getElementById(i + 1).value;
                    if ((vm.ans >= vm.tableModel[i].answer.low) && (vm.ans <= vm.tableModel[i].answer.high)) {
                        vm.result++;
                    }
                }
                if (vm.tableModel[i].type === "M") {
                    vm.resultQ = 0;
                    vm.count = 0;
                    vm.q = document.forms['quiz'].elements['m' + (i + 1)];
                    for (var k = 0; k < vm.tableModel[i].answer.length; k++) {
                        for (var j = 0; j < vm.q.length; j += 2) {
                            if ((vm.q[j].value.trim() === vm.tableModel[i].answer[k].left) && (vm.q[j + 1].value.trim() === vm.tableModel[i].answer[k].right)) {
                                vm.resultQ++;
                                break;
                            }
                        }
                        vm.count++;
                    }
                    vm.result += vm.resultQ / vm.count;
                }
                if (vm.tableModel[i].type === "NMC") {
                    vm.count = 0;
                    vm.ans = document.getElementById(i + 1).value;
                    for (var j = 0; j < vm.tableModel[i].answer.length; j++) {
                        if ((vm.ans >= vm.tableModel[i].answer[j].low) && (vm.ans <= vm.tableModel[i].answer[j].high) && (vm.tableModel[i].answer[j].percent > vm.count)) {
                            vm.count = vm.tableModel[i].answer[j].percent;
                        }
                    }
                    vm.result += vm.count / 100;
                }

            }
            if (vm.result.toString().split(".").pop() === "99") {
                vm.result = parseFloat(vm.result.toFixed(1));
                vm.result = vm.result.toFixed(2);
            } else {
                vm.result = vm.result.toFixed(2);
            }
            vm.result.toString();
            vm.result = vm.result + ' / ' + vm.tableModel.length;
            console.log(vm.result);
            $http.post('/api/result', {
                name: vm.fName,
                result: vm.result,
                id_t: vm.id
            }, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
                .success(function (data) {
                    localStorage.setItem("result", vm.result);
                    $window.location.href = '/#/endtest';
                    console.log('add result ok:', data);
                }).error(function (err) {
                if (err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed") {
                    $window.location.href = '/#/login';
                }
            });
        }
    }

    angular.module('myApp')
        .controller('indexController', indexController);
})();

