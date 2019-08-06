exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['scenarios.js'],
    baseUrl: 'http://localhost:3000/',
    allScriptsTimeout: 30000,
    capabilities: {
        browserName: 'chrome'
    }
};