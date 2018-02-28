/* eslint-env amd, jasmine */

define([
  'common/lodash',
  'common/moment',
  'mocks/data/contract.data',
  'mocks/data/insurance-plan-types.data',
  'job-contract/modules/job-contract.module'
], function (_, moment, MockContract, InsurancePlanTypesMock) {
  'use strict';

  describe('ModalContractController', function () {
    var $rootScope, $controller, $scope, $q, $httpBackend, $uibModalInstanceMock,
      $uibModalMock, contractDetailsService, contractHealthService,
      contractHourService, contractLeaveService, contractPayService,
      contractPensionService, contractRevisionService, contractService, settings;
    var today = moment().format('YYYY-MM-DD');

    beforeEach(module('job-contract'));

    beforeEach(module(function ($provide) {
      contractRevisionService = {
        validateEffectiveDate: jasmine.createSpy('validateEffectiveDate'),
        save: jasmine.createSpy('save')
      };

      $provide.factory('contractHealthService', function () {
        return {
          getOptions: function () {},
          getFields: jasmine.createSpy(),
          save: jasmine.createSpy()
        };
      });

      $provide.value('contractRevisionService', contractRevisionService);
    }));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_, _$q_,
      _contractDetailsService_, _contractHealthService_, _contractHourService_,
      _contractLeaveService_, _contractPayService_, _contractPensionService_,
      _contractService_, _settings_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      $q = _$q_;
      contractDetailsService = _contractDetailsService_;
      contractHealthService = _contractHealthService_;
      contractHourService = _contractHourService_;
      contractLeaveService = _contractLeaveService_;
      contractPayService = _contractPayService_;
      contractPensionService = _contractPensionService_;
      contractService = _contractService_;
      settings = _settings_;
    }));

    beforeEach(function () {
      $httpBackend.whenGET(/action=validatedates&entity=HRJobDetails/).respond({
        success: true
      });
      $httpBackend.whenGET(/action=get&entity=HRJobContract/).respond({});
      $httpBackend.whenPOST(/action=create&entity/).respond({});
      $httpBackend.whenPOST(/action=replace&entity/).respond({});
      $httpBackend.whenGET(/action=get&entity=HRHoursLocation/).respond({});
      $httpBackend.whenGET(/action=get&entity=HRPayScale/).respond({});
      $httpBackend.whenGET(/action=getfields&entity=HRJobDetails/).respond({});
      $httpBackend.whenGET(/action=getfields&entity=HRJobHour/).respond({});
      $httpBackend.whenGET(/action=getfields&entity=HRJobPay/).respond({});
      $httpBackend.whenGET(/action=getfields&entity=HRJobLeave/).respond({});
      $httpBackend.whenGET(/action=getfields&entity=HRJobHealth/).respond({});
      $httpBackend.whenGET(/action=getfields&entity=HRJobPension/).respond({});
      $httpBackend.whenGET(/action=getoptions&entity=HRJobHealth/).respond({});
      $httpBackend.whenGET(/views.*/).respond({});
    });

    beforeEach(function () {
      var health = {};

      contractRevisionService.validateEffectiveDate
        .and.returnValue($q.resolve({ success: true }));

      $rootScope.$digest();
      health.plan_type = {};
      health.plan_type_life_insurance = {};
      $rootScope.options = {
        health: health
      };
    });

    beforeEach(function () {
      mockUIBModalInstance();
      mockUIBModal({
        ModalDialogController: 'edit'
      });
      contractHealthServiceSpy();
      makeController();
      createContractDetailsServiceSpy(true);
      addSpiesToServicesSaveMethod();
    });

    describe('init()', function () {
      beforeEach(function () {
        $rootScope.$digest();
      });

      var result = {
        Family: 'Family',
        Individual: 'Individual'
      };

      it('calls getOptions() form contractHealthService', function () {
        expect(contractHealthService.getOptions).toHaveBeenCalled();
      });

      it('fetches health insurance plan types', function () {
        expect($rootScope.options.health.plan_type).toEqual(result);
      });

      it('fetches life insurance plan types', function () {
        expect($rootScope.options.health.plan_type_life_insurance).toEqual(result);
      });
    });

    describe('save()', function () {
      describe('makes call to appropriate service and function', function () {
        beforeEach(function () {
          $scope.save();
          $rootScope.$digest();
        });

        it('calls to validate the dates form contractDetailsService', function () {
          expect(contractDetailsService.validateDates).toHaveBeenCalled();
        });

        it('gets confirmation fron user to save contract data', function () {
          expect($uibModalMock.open).toHaveBeenCalledWith(jasmine.objectContaining({
            controller: 'ModalDialogController'
          }));
        });
      });

      describe('When period_end_date is null', function () {
        beforeEach(function () {
          $scope.entity.details.period_end_date = null;
          $scope.save();
          $rootScope.$digest();
        });

        it("sets contract period_end_date to '' ", function () {
          expect($scope.entity.details.period_end_date).toBe('');
        });
      });

      describe('When period_end_date is not falsy', function () {
        var mockDate = '02-03-2017';

        beforeEach(function () {
          $scope.entity.details.period_end_date = mockDate;
          $scope.save();
          $rootScope.$digest();
        });

        it("sets contract period_end_date to '' ", function () {
          expect($scope.entity.details.period_end_date).toBe(mockDate);
        });
      });

      describe('when the contract dates are not valid', function () {
        beforeEach(function () {
          spyOn(CRM, 'alert');

          contractDetailsService.validateDates.and.returnValue($q.resolve({
            success: false,
            message: 'Invalid Date'
          }));

          $scope.save();
          $scope.$digest();
        });

        it('displays an error message', function () {
          expect(CRM.alert).toHaveBeenCalledWith('Invalid Date', 'Error', 'error');
        });
      });

      describe('when the contract dates are valid', function () {
        beforeEach(function () {
          $scope.save();
          $scope.$digest();
        });

        it('saves the contract', function () {
          expect(contractService.save).toHaveBeenCalledWith($scope.entity.contract);
        });

        it('saves the contract details', function () {
          expect(contractDetailsService.save).toHaveBeenCalledWith($scope.entity.details);
        });

        it('saves the contract hours', function () {
          expect(contractHourService.save).toHaveBeenCalledWith($scope.entity.hour);
        });

        it('saves the payment information', function () {
          expect(contractPayService.save).toHaveBeenCalledWith($scope.entity.pay);
        });

        it('saves the leave entitlements', function () {
          expect(contractLeaveService.save).toHaveBeenCalledWith($scope.entity.leave);
        });

        it('saves the health insurance information', function () {
          expect(contractHealthService.save).toHaveBeenCalledWith($scope.entity.health);
        });

        it('saves the pension information', function () {
          expect(contractPensionService.save).toHaveBeenCalledWith($scope.entity.pension);
        });

        it('closes the modal and returns a result', function () {
          expect($uibModalInstanceMock.close).toHaveBeenCalledWith(jasmine.objectContaining({
            contract: $scope.entity.contract
          }));
        });
      });
    });

    describe('when closing the modal after confirming the entitlements change', function () {
      beforeEach(function () {
        $scope.entity.details.period_end_date = new Date();

        $scope.save();
        $scope.$digest();
      });

      it('closes the modal and tells it that the entitlement fields have changed', function () {
        expect($uibModalInstanceMock.close).toHaveBeenCalledWith(jasmine.objectContaining({
          haveEntitlementFieldsChanged: true
        }));
      });
    });

    describe('when closing the modal after removing the period end date', function () {
      beforeEach(function () {
        MockContract.contractEntity.details.period_end_date = moment().format('YYYY-MM-DD');
        makeController();

        $scope.entity.details.period_end_date = '';

        $scope.save();
        $scope.$digest();
      });

      it('closes the modal and tells it that the entitlement fields have changed', function () {
        expect($uibModalInstanceMock.close).toHaveBeenCalledWith(jasmine.objectContaining({
          haveEntitlementFieldsChanged: true
        }));
      });
    });

    describe('when closing the modal and entitlement fields did not change', function () {
      beforeEach(function () {
        $scope.save();
        $scope.$digest();
      });

      it('closes the modal and tells it that the entitlement fields have not changed', function () {
        expect($uibModalInstanceMock.close).toHaveBeenCalledWith(jasmine.objectContaining({
          haveEntitlementFieldsChanged: false
        }));
      });
    });

    describe('when closing the modal and period end date was empty but did not change', function () {
      beforeEach(function () {
        MockContract.contractEntity.details.period_end_date = '';
        makeController();
        $scope.save();
        $scope.$digest();
      });

      it('closes the modal and tells it that the entitlement fields have not changed', function () {
        expect($uibModalInstanceMock.close).toHaveBeenCalledWith(jasmine.objectContaining({
          haveEntitlementFieldsChanged: false
        }));
      });
    });

    describe('cancel', function () {
      describe('when the modal is on view mode', function () {
        beforeEach(function () {
          makeController({ action: 'view' });
          $scope.cancel();
        });

        it('closes the modal', function () {
          expect($uibModalInstanceMock.dismiss).toHaveBeenCalledWith('cancel');
        });
      });

      describe('when the user has not changed the contract', function () {
        beforeEach(function () {
          makeController();
          $scope.cancel();
        });

        it('closes the modal', function () {
          expect($uibModalInstanceMock.dismiss).toHaveBeenCalledWith('cancel');
        });
      });

      describe('when the user changes the contract', function () {
        var modalOptions;

        beforeEach(function () {
          makeController();

          $scope.entity.details.period_end_date = new Date();

          $scope.cancel();

          modalOptions = $uibModalMock.open.calls.mostRecent().args[0];
        });

        it('warns the user before confirming the modal close', function () {
          expect($uibModalMock.open).toHaveBeenCalledWith(jasmine.objectContaining({
            controller: 'ModalDialogController'
          }));
          expect(modalOptions.resolve.content()).toEqual({
            copyCancel: 'No',
            title: 'Alert',
            msg: 'Are you sure you want to cancel? Changes will be lost!'
          });
        });
      });
    });

    describe('Saving the change revision', function () {
      beforeEach(function () {
        mockUIBModal({
          ModalDialogController: 'change',
          ModalChangeReasonController: {
            reasonId: 1,
            date: today
          }
        });
        makeController({ action: 'change' });
      });

      describe('normal behaviour', function () {
        beforeEach(function () {
          $scope.save();
          $scope.$digest();
        });

        it('opens the revision modal', function () {
          expect($uibModalMock.open).toHaveBeenCalledWith(jasmine.objectContaining({
            controller: 'ModalChangeReasonController'
          }));
        });

        it('validates the contract revision effective date', function () {
          expect(contractRevisionService.validateEffectiveDate).toHaveBeenCalledWith({
            contact_id: settings.contactId,
            effective_date: today
          });
        });
      });

      describe('when the contract dates are not valid', function () {
        beforeEach(function () {
          spyOn(CRM, 'alert');
          contractRevisionService.validateEffectiveDate
            .and.returnValue($q.resolve({ success: false, message: 'Message' }));
          $scope.save();
          $scope.$digest();
        });

        it('displays an error message', function () {
          expect(CRM.alert).toHaveBeenCalledWith('Message', 'Error', 'error');
        });
      });
    });

    /**
     * Add spies and return values to the save methods of the different services
     * used by the job contract.
     */
    function addSpiesToServicesSaveMethod () {
      $scope.entity.pay.annual_benefits = [{}];
      $scope.entity.pay.annual_deductions = [{}];

      spyOn(contractDetailsService, 'save').and.returnValue($q.resolve($scope.entity.details));
      spyOn(contractHourService, 'save').and.returnValue($q.resolve($scope.entity.hour));
      spyOn(contractLeaveService, 'save').and.returnValue($q.resolve($scope.entity.leave));
      spyOn(contractPayService, 'save').and.returnValue($q.resolve($scope.entity.pay));
      spyOn(contractPensionService, 'save').and.returnValue($q.resolve($scope.entity.pension));
      spyOn(contractService, 'save').and.returnValue($q.resolve($scope.entity.contract));
    }

    /**
     * Initializes the modal contract controller.
     */
    function makeController (options) {
      $scope = $rootScope.$new();
      $controller('ModalContractController', _.defaults(options || {}, {
        $scope: $scope,
        $rootScope: $rootScope,
        $uibModal: $uibModalMock,
        $uibModalInstance: $uibModalInstanceMock,
        contractDetailsService: contractDetailsService,
        action: 'edit',
        entity: MockContract.contractEntity,
        content: {
          allowSave: true
        },
        files: {},
        utils: {
          contractListLen: 1
        }
      }));
    }

    /**
     * Mocks the modal instance returned by $modal.open.
     */
    function mockUIBModalInstance () {
      $uibModalInstanceMock = {
        opened: {
          then: jasmine.createSpy()
        },
        close: jasmine.createSpy('close'),
        dismiss: jasmine.createSpy('dismiss')
      };
    }

    /**
     * Mocks the $modal.open method and their results
     *
     * @param {Object} controllersAndResults - a map of the controller's name
     * and the result will it return when the modal is closed.
     */
    function mockUIBModal (controllersAndResults) {
      $uibModalMock = {
        open: jasmine.createSpy('open').and.callFake(function (options) {
          return {
            result: {
              then: function (callback) {
                var result = controllersAndResults[options.controller];

                callback(result);
              }
            }
          };
        })
      };
    }

    /**
     * Spies on the validateDates method of the contractDetailsService and resolves
     * the validation to the provided status.
     *
     * @param {Boolean} status determines if the validation was successful or not.
     */
    function createContractDetailsServiceSpy (status) {
      spyOn(contractDetailsService, 'validateDates').and.callFake(function () {
        var deferred = $q.defer();
        deferred.resolve({
          success: status
        });

        return deferred.promise;
      });
    }

    /**
     * Mocks the response of the getOptions method from contractHealthService.
     */
    function contractHealthServiceSpy () {
      spyOn(contractHealthService, 'getOptions').and.callFake(function () {
        return $q.resolve(InsurancePlanTypesMock.values);
      });
    }
  });
});
