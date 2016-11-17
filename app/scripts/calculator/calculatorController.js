(function () {
  'use strict';
  angular.module('app')
    .controller('calculatorController', [CalculatorController]);
  
  function CalculatorController() {
    var vm = this;
    vm.timeTable = [];
    vm.resultTable = [];
    vm.submitTime = submitTime;
    vm.submitInput = submitInput;

    function submitTime() {
      if (vm.number && vm.time) {
        vm.timeTable.push({
          number: parseInt(vm.number),
          time: parseFloat(vm.time)
        });

        vm.timeTable.sort(function(a,b) { return a.number - b.number; });
        vm.number = vm.time = null;
      }
    }

    function submitInput() {
      var highIndex;
      var lowNumber;
      var lowTime;
      var highTime;

      if (vm.input) {
        highIndex = vm.timeTable.findIndex(function(row) {
          return row.time > vm.input;
        });

        lowNumber = vm.timeTable[highIndex - 1].number;
        lowTime = vm.timeTable[highIndex - 1].time;
        highTime = vm.timeTable[highIndex].time;

        vm.resultTable.push({
          input: vm.input,
          result: Math.round(100 * lowNumber + (vm.input - lowTime) / (highTime - lowTime) * 100)
        });

        vm.input = null;
      }
    }
  }
})();