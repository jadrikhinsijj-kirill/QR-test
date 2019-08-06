'use strict';

describe('my app', function () {


    it('перенапрвление на /login в случае не авторизации', function () {
        browser.get('/#/list');
        expect(browser.getCurrentUrl()).toMatch("/login");
    });

    it('вход пользователем kirill с паролем 123456 должен быть успешен', function () {
        browser.get('/#/login');
        element(by.model('vm.fLogin')).clear().sendKeys('kirill');
        element(by.model('vm.fPassword')).clear().sendKeys('123456');
        element(by.css('#login-button')).click();
        expect(browser.getCurrentUrl()).toMatch("/list");

    });

    it('выход должен привести пользователя на страницу /login', function () {
        element(by.css("#navbarNav > ul > li:nth-child(3) > a")).click();
        expect(browser.getCurrentUrl()).toMatch("/login");
    });

});