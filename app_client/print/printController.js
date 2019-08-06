(function () {
    function printController($http) {
        var vm = this;
        vm.nameTest = localStorage.getItem("nameTest");
        vm.countQuestions = "Максимальное количество баллов: ";
        vm.id = localStorage.getItem('id');
        vm.tableModel = "";
        $http.get('/api/listResult/' + vm.id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).success(function (data) {
            vm.tableModel = data;
            vm.countQuestions += vm.tableModel[0].result.split("").reverse().join("").slice(0, vm.tableModel[0].result.split("").reverse().join("").indexOf(' '))+".00";
            for (var i = 0; i < vm.tableModel.length; i++) {
                vm.tableModel[i].result = vm.tableModel[i].result.slice(0, vm.tableModel[i].result.indexOf(' '));
            }
            vm.tableModel.sort((a, b) => b.result - a.result);
            console.log(vm.tableModel);
            vm.width = 200;
            vm.height = 70;

            vm.svg = d3.select("div.diagram").append("svg");

            vm.svg.attr("height", vm.height)
                .attr("width", vm.width);

            vm.svg.append("rect")
                .attr("x", 30)
                .attr("y", 20)
                .attr("width", 15)
                .attr("height", 15);
            vm.svg.append("text")
                .attr("x", 190)
                .attr("y", 33)
                .style("text-anchor", "end")
                .text("Количество баллов");
            // Enter
            d3.select('div.diagram').selectAll('div').data(vm.tableModel).enter().append('div').attr('class', 'item')
                .append('div').attr('class', 'data').append('span');

// Update
            d3.select('div.diagram').selectAll('div.item').data(vm.tableModel)
                .select('div').style('width', function (d) {
                return (d.result * 30) + 40 + 'px';
            })
                .select('span').text(function (d) {
                return d.result;
            });

            d3.select('div.diagram').selectAll('div.item').data(vm.tableModel).append('div').attr('class', 'fio')
                .text(function (d) {
                    return d.fio;
                });

// Exit
            d3.select('div.diagram').selectAll('div.item').data(vm.tableModel).exit().remove();
        }).error(function (err) {
            if (err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed") {
                $window.location.href = '/#/login';
            }
        })
    }

    angular.module('myApp')
        .controller('printController', printController);
})();