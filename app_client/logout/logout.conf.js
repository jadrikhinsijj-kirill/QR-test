'use strict';

describe('myApp module', function() {

    beforeEach(module('myApp'));

    describe('logoutController controller', function(){

        it('should ....', inject(function($controller) {
            //spec body
            var logoutController = $controller('logoutController');
            expect(logoutController).toBeDefined();
        }));

    });
});