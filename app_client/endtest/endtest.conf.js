'use strict';

describe('myApp module', function() {

    beforeEach(module('myApp'));

    describe('endtestController controller', function(){

        it('should ....', inject(function($controller) {
            //spec body
            var endtestController = $controller('endtestController');
            expect(endtestController).toBeDefined();
        }));

    });
});