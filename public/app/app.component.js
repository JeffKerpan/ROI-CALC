(function() {
  'use strict';

  angular.module("app", [])
  .component('app', {
    controller: Controller,
    templateUrl: '../app/app.template.html'
  })

  function Controller() {
    const vm = this;

    vm.$onInit = function () {

      vm.newItemsIncome = {};
      vm.newItemsExpenses = {};

      vm.itemsIncome = [
        {
          name: 'Item 1',
          once: 100,
          monthly: 50,
        },
        {
          name: 'Item 2',
          once: 50,
          monthly: 25,
        },
        {
          name: 'Item 3',
          once: 25,
          monthly: 85
        }
      ]

      vm.itemsExpenses = [
        {
          name: 'Expense 1',
          once: 500,
          monthly: 20,
        },
        {
          name: 'Expense 2',
          once: 200,
          monthly: 40
        }
      ]

      vm.calculateData();
    }

    vm.calculateData = () => {
      vm.onceSumIncome = vm.sumTotal(vm.itemsIncome, 'once');
      vm.monthlyIncome = vm.sumTotal(vm.itemsIncome, 'monthly');
      vm.totalRevenue = vm.total(vm.onceSumIncome, vm.monthlyIncome);

      vm.onceSumExpenses = vm.sumTotal(vm.itemsExpenses, 'once');
      vm.monthlyExpenses = vm.sumTotal(vm.itemsExpenses, 'monthly');
      vm.totalExpenses = vm.total(vm.onceSumExpenses, vm.monthlyExpenses);

      vm.monthlyContributionProfit = vm.monthlyContribution();
      vm.totalContributionProfit = vm.contriubtionProfit();
      vm.totalContributionMargin = vm.contributionMargin();
      vm.totalCapitalRoi = vm.capitalRoi();
    }
    //
    vm.addItem = (array, newItem) => {
      if (newItem === vm.newItemsIncome) {
        vm.itemsIncome.push(vm.newItemsIncome);
      } else if (newItem === vm.newItemsExpenses) {
        vm.itemsExpenses.push(vm.newItemsExpenses);
      }
      delete vm.newItemsIncome;
      delete vm.newItemsExpenses;
      vm.calculateData();
    }

    vm.deleteItem = (array, item) => {
      var result = 0;
      for (let i=0; i<array.length; i++) {
        if (array[i].name === item.name) {
          result = i;
        }
      }
      array.splice(result,1);
      vm.calculateData();
    }

    vm.sumTotal = (array, times) => {
      var result = 0;
      for(let i=0; i<array.length; i++) {
        result += array[i][times];
      }
      return result;
    }

    vm.total = (num, num2) => {
      return num + (num2 * 12);
    }

    vm.monthlyContribution = () => {
      return vm.monthlyIncome - vm.monthlyExpenses;
    }

    vm.contriubtionProfit = () => {
      console.log(vm.totalRevenue - vm.totalExpenses);
      return vm.totalRevenue - vm.totalExpenses;
    }

    vm.contributionMargin = () => {
      if (vm.totalRevenue == 0) {
        return 0;
      }
        return (vm.totalContributionProfit/vm.totalRevenue *100).toFixed(0);
    }

    vm.capitalRoi = () => {
      if (vm.monthlyContributionProfit == 0) {
        return 0;
      }
        return ((vm.onceSumExpenses - vm.onceSumIncome) / vm.monthlyContributionProfit).toFixed(1);
    }
  }

})();
