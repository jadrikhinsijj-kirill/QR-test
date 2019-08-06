'use strict';

describe('myApp module', function() {

    beforeEach(module('myApp'));

    describe('loginController controller', function(){

        it('should ....', inject(function($controller) {
            //spec body
            var loginController = $controller('loginController');
            expect(loginController).toBeDefined();
        }));

    });
});