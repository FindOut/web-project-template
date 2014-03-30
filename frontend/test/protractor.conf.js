exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['e2e/**/*Spec.*'],

    plugins: [
        'protractor-coffee-preprocessor'
    ],

    baseUrl: 'http://localhost:9000'

};
