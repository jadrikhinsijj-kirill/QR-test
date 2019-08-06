'use strict';

describe('myApp module', function() {

    beforeEach(module('myApp'));

    describe('printController controller', function(){

        it('should ....', inject(function($controller) {
            //spec body
            var printController = $controller('printController');
            expect(printController).toBeDefined();
        }));

    });
});