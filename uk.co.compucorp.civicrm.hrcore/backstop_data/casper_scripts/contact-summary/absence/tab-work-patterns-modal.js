'use strict';

var absenceTab = require('../../../page-objects/tabs/absence');

module.exports = function (casper) {
  absenceTab.init(casper).openSubTab('work-patterns')
    .then(function (workPatternsTab) {
      workPatternsTab.showModal();
    });
};
