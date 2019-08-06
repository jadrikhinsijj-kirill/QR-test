'use strict';

describe('myApp module', function() {

    beforeEach(module('myApp'));

    describe('indexController controller', function(){

        it('should ....', inject(function($controller) {
            //spec body
            var indexController = $controller('indexController');
            expect(indexController).toBeDefined();
        }));

    });
});