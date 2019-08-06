'use strict';

describe('myApp module', function() {

    beforeEach(module('myApp'));
    describe('addController controller', function(){

        it('should ....', inject(function($controller) {
            var scope, addCont ;

            beforeEach(inject(function($rootScope, $controller,_Parser_) {
                scope = $rootScope.$new();
                var parser = _Parser_;
                addCont = $controller('addController', {$scope: scope,Parser: parser});
                expect(addCont).toBeDefined();
            }));
            //spec body

        }));

    });
});