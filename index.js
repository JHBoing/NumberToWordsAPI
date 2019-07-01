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
    let numberToConvert = receivedParameter;
    let isNegative = isNumberNegative(numberToConvert);
    let words = [];

    if(isNegative) {
        numberToConvert = numberToConvert.substring(1, numberToConvert.length);
    }

    let groupsOfThrees = numberToGroupsOfThrees(numberToConvert);

    for(let i = 0; i < groupsOfThrees.length; i++) {
        let group = groupsOfThrees[i];
        group = stringSpliter(group);
        group.reverse();

        if (i == 1 && group[0] != 1) {
            words.push(words[0] == "" && words[1] == "" && words[2] == "" ? " mil" : " mil e ");
        }

        if (i == 1 && group[0] == 1 && group[1] === undefined) {
            words.push(words[0] == "" && words[1] == "" && words[2] == "" ? "mil" : "mil e ");
        } else if (group[1] == 1) {
            words.push(uniqueTens[group[1] + group[0]]);
        } else {            
            words.push(numbersEnum[group[0]].units);
            if (group[1] !== undefined && group[1] !== 0) {
                words.push(numbersEnum[group[1]].tens + (group[0] == 0 ? "" : " e "));
            }
        }

        if (i == 0 && group[2] == 1 && ( group[0] == 0 & group[1] == 0)) {
            words.push("cem");
        } else if(group[2] !== undefined && group[2] !== 0) {
            words.push(numbersEnum[group[2]].hundreds + (group[0] == 0 && group[1] == 0 ? "" : " e "));
        }
    } 

    if(isNegative) {
        words.push("menos ");
    }

    return words.reverse().join('');
}

function numberToGroupsOfThrees(numberToConvert) {
    let groupsOfThrees = [];
    let start = numberToConvert.length;
    let end = 0;
    while(start > 0) {
        end = start;
        groupsOfThrees.push(numberToConvert.slice((start = Math.max(0, start-3)), end));
    }
    return groupsOfThrees;
}

function validate(receivedParameter) {
    
    if(!isNumber(receivedParameter)) { 
        throw new Error("Um número era esperado, ele deve tem um valor entre -99999 e 99999.");
    }

    if(!isCompatibleSize(receivedParameter)) {
        throw new Error("Seu número tem um valor fora dos padrões, ele deve ter um valor entre -99999 e 99999.");
    }

    return true;
}

function isNumber(receivedParameter) {
    return !isNaN(receivedParameter);
}

function isCompatibleSize(receivedParameter) {
    
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

function stringSpliter(string) {
    return string.split('');
}
