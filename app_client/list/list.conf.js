'use strict';

describe('myApp module', function() {

    beforeEach(module('myApp'));

    describe('listController controller', function(){

        it('should ....', inject(function($controller) {
            //spec body
            var listController = $controller('listController');
            expect(listController).toBeDefined();
        }));

    });
});