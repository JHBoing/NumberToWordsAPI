var express = require("express");
var app = express();

const numbersEnum = require("./enums").numbersEnum;
const uniqueTens = require("./enums").uniqueTens;


app.listen(3000, function () {
    console.log("Server working on port 3000!");
});

app.get("/:number", function (req, res) {
    try {
        let receivedParameter = req.params.number;
        validate(receivedParameter);

        let wordifiedNumber = numberToWords(receivedParameter);
        
        res.status(200).send({extenso: wordifiedNumber});
    } catch (err) {
        res.status(400).send("Erro ao processar sua requisição: " + err.message);
    }
});


function numberToWords(receivedParameter) {
    let numberToConvert = parameterCleaner(receivedParameter);
    let isNegative = isNumberNegative(numberToConvert);
    
    if(receivedParameter == 0) {
        return "zero";
    }
        
    if(isNegative) {
        numberToConvert = numberToConvert.substring(1, numberToConvert.length);
    }


    let groupsOfThrees = numberToGroupsOfThrees(numberToConvert);
    let hundreds = groupsOfThrees[0];
    let thousands = groupsOfThrees[1];
    
    let wordifiedHundreds = convertToWords(hundreds);
    let convertedNumber = wordifiedHundreds;
    let wordifiedThousands = [];
    
    if(thousands && thousands == 1) {
        hundreds == "000" ? null : wordifiedThousands.push("e");
        wordifiedThousands.push("mil");
        convertedNumber = wordifiedHundreds.concat(...wordifiedThousands);
            
    } else if (thousands) {
        hundreds == "000" ? null : wordifiedThousands.push("e");
        wordifiedThousands.push("mil");
        wordifiedThousands.push(convertToWords(thousands));
        convertedNumber = wordifiedHundreds.concat(...wordifiedThousands);
    }

    if(isNegative) {
        convertedNumber.push("menos");
    }

    return convertedNumber.reverse().join(' ').trim();
}

function convertToWords(hundreds) {

    hundreds = stringSpliter(hundreds).reverse();
    let unit = hundreds[0]; 
    let ten = hundreds[1];
    let hundred = hundreds[2];

    let wordifiedHundreds = [];

    if (ten == 1) {
        wordifiedHundreds.push(uniqueTens[ten + unit]);
    } else {            
        wordifiedHundreds.push(numbersEnum[unit].units);
        if (ten) {
            unit == 0 || ten == 0 ? null : wordifiedHundreds.push("e");
            wordifiedHundreds.push(numbersEnum[ten].tens);
        }
    }

    if (hundred == 1 && ( unit == 0 && ten == 0)) {
        wordifiedHundreds.push("cem");
    } else if(hundred & hundred != 0) {
        console.log("este e");
        (unit == 0 && ten == 0)? null : wordifiedHundreds.push("e");
        wordifiedHundreds.push(numbersEnum[hundred].hundreds);
    }

    return wordifiedHundreds;
}

function numberToGroupsOfThrees(numberToConvert) {
    let groupsOfThrees = [];
    let start = numberToConvert.length;
    let end = 0;
    while(start > 0) {
        end = start;
        groupsOfThrees.push(numberToConvert.slice((Math.max(0, start-3)), end));
        start = Math.max(0, start-3);
    }
    return groupsOfThrees;
}

function parameterCleaner(receivedParameter) {
    return "" + parseInt(receivedParameter);
}

function validate(receivedParameter) {
    
    if(!isNumber(receivedParameter)) { 
        throw new Error("Um número era esperado, ele deve tem um valor entre -99999 e 99999.");
    }

    if(!isCompatibleSize(receivedParameter)) {
        throw new Error("Seu número tem um valor fora dos padrões, ele deve ter um valor entre -99999 e 99999.");
    }

    if(!Number.isInteger(Number(receivedParameter))) {
        throw new Error("Seu número deve ser inteiro, ele deve ter um valor entre -99999 e 99999.");
    }
    return true;
}

function isNumber(receivedParameter) {
    if(receivedParameter == "") {
        return false;
    }
    return !isNaN(receivedParameter);
}

function isCompatibleSize(receivedParameter) {
    receivedParameter = toString(receivedParameter);
    if(isNumberNegative(receivedParameter)) {
        if(receivedParameter.length > 6) {
            return false;
        }
    } else {
        if( receivedParameter.length > 5 ) {
            return false;
        }
    }

    return true;
}

function isNumberNegative(receivedParameter) {
    let splitParameter = stringSpliter(receivedParameter);

    if(splitParameter[0] === "-") {
        return true;
    } else {
        return false;
    }
}

function stringSpliter(value) {
    string = toString(value);
    return string.split('');
}

function toString(value) {
    return "" + value;
}

module.exports = {
    isNumberNegative,
    isCompatibleSize,
    isNumber,
    numberToGroupsOfThrees,
    convertToWords,
    numberToWords
}
