angular.module('myApp')

    .factory('Parser', ['$q', '$http', function ($q, $http) {
        var parserPromise = $http.get('/parser/gift-grammar/gift.pegjs')
            .then(function (response) {
                return peg.generate(response.data);
            });

        return parserPromise;
    }])

;
