module.exports = function(config) {
    config.set({

        basePath: './',

        files: [
            'public/angular/angular.js',
            'public/angular/angular-route.js',
            'public/angular/angular-mocks.js',
            'app_client/index/*.js',
            'app_client/endtest/*.js',
            'app_client/list/*.js',
            'app_client/login/*.js',
            'app_client/logout/*.js',
            'app_client/print/*.js',
            'app_client/register/*.js',
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine'
        ]

    });
};