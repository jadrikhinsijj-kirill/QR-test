(function () {
    function endtestController() {
        var vm = this;
        vm.result = localStorage.getItem('result');
    }

    angular.module('myApp')
        .controller('endtestController', endtestController);
})();