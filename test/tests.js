var expect = require("chai").expect;
var numberToWordsAPI = require("../index");

describe('#isNumberNegative()', function() {
    it('should return true for a negative number', function() {
        
        let negativeNumber = -5000;
        
        let functionReturn = numberToWordsAPI.isNumberNegative(negativeNumber);

        expect(functionReturn).to.be.true;
    });

    it('should return false for a positive number', function() {
        let positiveNumber = 5000;

        let functionReturn = numberToWordsAPI.isNumberNegative(positiveNumber);

        expect(functionReturn).to.be.false;
    });

    it('should return false for value that are not numbers', function() {
        let nonNumber = "stringForTesting";

        let functionReturn = numberToWordsAPI.isNumberNegative(nonNumber);

        expect(functionReturn).to.be.false;
    });
});

describe('#isCompatibleSize()', function() {
    it('should return true for a positive number with a max size of 5 characters', function() {
        let min = Math.ceil(1);
        let max = Math.floor(100000);
        
        let positiveNumber = Math.floor(Math.random() * (max - min)) + min;

        let functionReturn = numberToWordsAPI.isCompatibleSize(positiveNumber);

        expect(functionReturn).to.be.true;
    });

    it('should return true for a negative number with a max size of 6 characters', function() {
        
        let min = Math.ceil(-99999);
        let max = Math.floor(0);
        
        let negativeNumber = Math.floor(Math.random() * (max - min)) + min;

        let functionReturn = numberToWordsAPI.isCompatibleSize(negativeNumber);

        expect(functionReturn).to.be.true;
    });
});