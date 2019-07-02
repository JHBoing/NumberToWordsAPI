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

    it('should return false for a value that is not a number', function() {
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

    it('should return false for a positive number when the number of characters is greater than 5', function() {
        let positiveNumber = 100000;

        let functionReturn = numberToWordsAPI.isCompatibleSize(positiveNumber);

        expect(functionReturn).to.be.false;
    });

    it('should return false for a negative number when the number of characters is greater than 6', function() {
        let negativeNumber = -100000;

        let functionReturn = numberToWordsAPI.isCompatibleSize(negativeNumber);

        expect(functionReturn).to.be.false;
    });
});

describe('#isNumber()', function() {
    it('should return true for a given number', function() {
        let min = Math.ceil(-99999);
        let max = Math.floor(100000);
        
        let givenNumber = Math.floor(Math.random() * (max - min)) + min;

        let functionReturn = numberToWordsAPI.isNumber(givenNumber);

        expect(functionReturn).to.be.true;
    });

    it('should return false for a set of characters', function() {
        let setOfCharacters = "a set of characters";

        let functionReturn = numberToWordsAPI.isNumber(setOfCharacters);

        expect(functionReturn).to.be.false;
    });

    it('should return false for an empty string', function() {
        let emptyString = "";

        let functionReturn = numberToWordsAPI.isNumber(emptyString);
    
        expect(functionReturn).to.be.false;

        expect().to.be.a
    });

});

describe('#numberToGroupsOfThrees()', function() {
    it('should return an array for a given string of a number', function() {
        let givenNumber = 12321;

        let functionReturn = numberToWordsAPI.numberToGroupsOfThrees(givenNumber);

        expect(functionReturn).to.be.an('array');
    });

    it('should return an array of three or less digits', function() {
        let givenNumber = "12123";
        
        let functionReturn = numberToWordsAPI.numberToGroupsOfThrees(givenNumber);

        expect(functionReturn).to.be.an('array').that.includes('123', '12');
    });
});

describe('#convertToWords()', function() {
    it('should return a string of the given numbers in words for a given string of 3 numbers', function () {
        let givenArrayOfStrings = "123";

        let functionReturn = numberToWordsAPI.convertToWords(givenArrayOfStrings);

        expect(functionReturn).to.be.an('array').to.deep.equal(['três', 'e', 'vinte', 'e', 'cento']);
    });

    it('should return a wrong string of the given numbers in words for a given string of more than 3 numbers', function () {
        let givenArrayOfStrings = "11123";

        let functionReturn = numberToWordsAPI.convertToWords(givenArrayOfStrings);

        expect(functionReturn).to.be.an('array').that.not.equal(['três', 'e', 'vinte', 'e', 'cento', 'e', 'mil', 'onze']);
    });
});

describe('#numberToWords()', function() {
    it('should return a string of the given numbers in words for a given string of numbers', function() {
        let givenStringOfNumbers = "11123";

        let functionReturn = numberToWordsAPI.numberToWords(givenStringOfNumbers);

        expect(functionReturn).to.equal('onze mil e cento e vinte e três');
    });

    it('should return an wrong string of the given numbers in words for a given strinf of more than 5 digits', function() {
        let givenStringOfNumbers = "5234123";

        let functionReturn = numberToWordsAPI.numberToWords(givenStringOfNumbers);

        expect(functionReturn).to.not.equal('5 milhões duzentos e trinta e quatro mil e cento e vinte e três');
    });
});
