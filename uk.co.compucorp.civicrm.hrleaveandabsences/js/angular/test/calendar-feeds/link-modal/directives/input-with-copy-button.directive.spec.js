/* eslint-env amd, jasmine */

define([
  'common/angular',
  'common/angularMocks',
  'leave-absences/calendar-feeds/link-modal/link-modal.module'
], function (angular) {
  'use strict';

  describe('inputWithCopyButton', function () {
    var $rootScope, $timeout, inputWithCopyButton, scope;
    var modelValue = 'http://www.civihr.org/';

    beforeEach(angular.mock.module('calendar-feeds.link-modal', 'leave-absences.templates'));

    beforeEach(inject(function ($compile, _$rootScope_, _$timeout_) {
      $rootScope = _$rootScope_;
      $timeout = _$timeout_;
      scope = $rootScope.$new();
      scope.url = modelValue;
      inputWithCopyButton = $compile('<input-with-copy-button ng-model="url"></input-with-copy-button>')(scope);
      $rootScope.$digest();
    }));

    it('is defined', function () {
      expect(inputWithCopyButton.find('.input-with-copy-button-component').length).toBe(1);
    });

    it('displays the model value in inside an input', function () {
      expect(inputWithCopyButton.find('input').val()).toEqual(modelValue);
    });

    describe('when clicking the copy button', function () {
      var copiedValue, copyButton;

      beforeEach(function () {
        copyButton = inputWithCopyButton.find('button').eq(0);

        spyOn(document, 'execCommand').and.callFake(function () {
          var element = inputWithCopyButton.find('input')[0];

          copiedValue = element.value.slice(element.selectionStart,
            element.selectionEnd);
        });
        copyButton.click();
        $rootScope.$digest();
      });

      it('executes the "copy" command', function () {
        expect(document.execCommand).toHaveBeenCalledWith('copy');
      });

      it('copies the content of the input to the clipboard', function () {
        expect(copiedValue).toBe(modelValue);
      });

      it('shows that the input has just been copied', function () {
        expect(copyButton.text().trim()).toBe('Copied!');
      });

      describe('when time has passed', function () {
        beforeEach(function () {
          $timeout.flush();
        });

        it('reverts the button view to the original state', function () {
          expect(copyButton.text().trim()).toBe('Copy');
        });
      });
    });
  });
});
