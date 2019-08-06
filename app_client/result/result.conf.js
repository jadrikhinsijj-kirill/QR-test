'use strict';

describe('myApp module', function() {

    beforeEach(module('myApp'));

    describe('resultController controller', function(){

        it('should ....', inject(function($controller) {
            //spec body
            var resultController = $controller('resultController');
            expect(resultController).toBeDefined();
        }));

    });
});