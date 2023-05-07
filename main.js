import inquirer from 'inquirer';
import {input} from "@inquirer/prompts";


const MAX_INT_32 = Math.pow(2, 31) - 1;
const MIN_INT_32 = Math.pow(2, 31) * -1;

let firstInt = 0;

const validateName = (name) => {
    return /^[a-zA-Z]{1,50}$/.test(name)
        ? true
        : "Please input a valid name (alphabetic characters, 50 characters max).";
}

const clamp = (num, min, max) => Math.max(min, Math.min(num, max));

const validateInt = (num) => /^\d+$/.test(num) && num >= MIN_INT_32 && num <= MAX_INT_32;

const validateFirstInt = (num) => {
    const inputNum = parseInt(num);
    if (validateInt(inputNum)) {
        firstInt = inputNum;
        return true;
    } else {
        return "Please input a valid integer (max of 2^31 - 1, min of -2^31)."
    }
}

const validateSecondInt = (num) => {
    const inputNum = parseInt(num);
    if (validateInt(inputNum)
            && validateInt(firstInt + inputNum)
            && validateInt(firstInt * inputNum)) {
        return true
    } else {
        return "Please input a valid integer (max of 2^31 - 1, min of -2^31).";
    }
}

const formatNumber = (num) => new Intl.NumberFormat().format(num)

inquirer
    .prompt([
        {
            type: input,
            name: 'firstName',
            message: 'Enter your first name:',
            validate: validateName
        },
        {
            type: input,
            name: 'lastName',
            message: 'Enter your last name:',
            validate: validateName
        },
        {
            type: input,
            name: 'firstInteger',
            message: 'Enter your first integer:',
            validate: validateFirstInt
        },
        {
            type: input,
            name: 'secondInteger',
            message: 'Enter your second integer:',
            validate: validateSecondInt
        }
    ])
    .then((answers) => {
        const sum = formatNumber(
            parseInt(answers['firstInteger']) + parseInt(answers['secondInteger']));
        const product = formatNumber(
            parseInt(answers['firstInteger']) * parseInt(answers['secondInteger']));
        const firstIntOut = formatNumber(answers['firstInteger']);
        const secondIntOut = formatNumber(answers['secondInteger']);
        console.log();
        console.log(`Hello, ${answers['firstName']} ${answers['lastName']}.`);
        console.log(`Your two integers are ${firstIntOut} and ${secondIntOut}.`);
        console.log(`The sum of ${firstIntOut} and ${secondIntOut} is ${sum}.`);
        console.log(`The product of ${firstIntOut} and ${secondIntOut} is ${product}.`);
    });