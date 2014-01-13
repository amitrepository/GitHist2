/**
 * docs page functional tests
 */

var getAttributeValueOfVisible = require('../lib/wd/getAttributeValueOfVisible');

var filterInputId = 'doc_filter';
var filterAttribute = 'data-filterable';
var infoPopupTrigger = '.js-item--open-dropdown';
var infoPopup = '.item--dropdown';

describe('Docs page', function () {

    before(function () {
        return this.browser.path('/docs');
    });

    describe('filter field', function () {

        it('should be focused', function () {
            // Once the autofocus is fixed, change itEventually to it
            return this.browser
                .setImplicitWaitTimeout(5000)
                .active()
                .getAttribute('id').then(function(id) {
                    expect(id).toBe('doc_filter');
                });
        });

        it('should filter results when filter text matches', function () {
            var filterText = 'amqp';

            return this.browser
                .elementById(filterInputId)
                .type(filterText)
                .elementsByCssSelector('[' + filterAttribute + ']')
                    .then(getAttributeValueOfVisible(filterAttribute))
                    .then(function (attributeValues) {
                        attributeValues.forEach(function (value) {
                            expect(value.toLowerCase()).toContain(filterText);
                        });
                    });
        });

        it('should show no results when filter text doesn\'t match', function () {
            var filterText = 'l;kjsdfl;kjsal;dkfjlsdjf';

            return this.browser
                .elementById(filterInputId)
                    .type(filterText)
                .elementsByCssSelector('[' + filterAttribute + ']')
                    .then(getAttributeValueOfVisible(filterAttribute))
                    .then(function (attributeValues) {
                        expect(attributeValues.length).toBe(0);
                    });

        });
    });

    describe('info popup', function() {

        it('should appear when doc item is clicked and then disappear when clicked again', function() {
            return this.browser
                .setImplicitWaitTimeout(5000)
                .elementByCssSelector(infoPopupTrigger)
                    .click()
                .elementByCssSelector(infoPopup)
                    .isVisible()
                    .then(function(visible) {
                        expect(visible).toBeTrue();
                    })
                .elementByCssSelector(infoPopupTrigger)
                    .click()
                .elementByCssSelector(infoPopup)
                    .isVisible()
                    .then(function(visible) {
                        expect(visible).toBeFalse();
                    });
        });
    });

});
