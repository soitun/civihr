'use strict';

var page = require('../../../page-objects/ssp-leave-absences-manager-leave-requests');

// precondition: need to have the login of manager and have at least one sickness request
module.exports = function (casper) {
  page.init(casper)
    .openLeaveTypeFor(3)
    .openActionsForRow(1)
    .editRequest();
};
