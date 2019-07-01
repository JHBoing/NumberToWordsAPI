const numbersEnum = {
    '0': {
        units: '',
        tens: '',
        hundreds: '',
    },
    '1': {
        units: 'um',
        tens: 'dez',
        hundreds: 'cento',
    },
    2: {
        units: 'dois',
        tens: 'vinte',
        hundreds: 'duzentos'
    },
    3: {
        units: 'três',
        tens: 'trinta',
        hundreds: 'trezentos'
    },
    4: {
        units: 'quatro',
        tens: 'quarenta',
        hundreds: 'quatrocentos'
    },
    5: {
        units: 'cinco',
        tens: 'cinquenta',
        hundreds: 'quinhentos'
    },
    6: {
        units: 'seis',
        tens: 'sessenta',
        hundreds: 'seiscentos'
    },
    7: {
        units: 'sete',
        tens: 'setenta',
        hundreds: 'setecentos'
    },
    8: {
        units: 'oito',
        tens: 'oitenta',
        hundreds: 'oitocentos'
    },
    9: {
        units: 'nove',
        tens: 'noventa',
        hundreds: 'novecentos'
    }
}

const uniqueTens = {
    00: "",
    10: "dez",
    11: "onze",
    12: "doze",
    13: "treze",
    14: "quatorze",
    15: "quinze",
    16: "dezesseis",
    17: "dezesete",
    18: "dezoito",
    19: "dezenove"
}

module.exports = {
    uniqueTens,
    numbersEnum
}