'use strict';

describe('myApp module', function() {

    beforeEach(module('myApp'));

    describe('registerController controller', function(){

        it('should ....', inject(function($controller) {
            //spec body
            var registerController = $controller('registerController');
            expect(registerController).toBeDefined();
        }));

    });
});