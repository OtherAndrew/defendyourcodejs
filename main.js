import inquirer from 'inquirer';
import {input} from "@inquirer/prompts";


const MAX_INT_32 = Math.pow(2, 31) - 1;
const MIN_INT_32 = Math.pow(2, 31) * -1;

const validateName = (name) => {
    return /^[a-zA-Z]{1,50}$/.test(name)
        ? true
        : "Please input a valid name (alphabetic characters, 50 characters max).";
}

const clamp = (num, min, max) => Math.max(min, Math.min(num, max));

const validateInt = (num) => {
    return /^\d+$/.test(num) && num >= MIN_INT_32 && num <= MAX_INT_32
        ? true
        : "Please input a valid integer (max of 2^32 - 1, min of -2^32).";
}

const validateIntAddition = (num1, num2) => validateInt(num1 + num2);

const validateIntMultiplication = (num1, num2) => validateInt(num1 * num2);

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
            validate: validateInt
        },
        {
            type: input,
            name: 'secondInteger',
            message: 'Enter your second integer:',
            validate: validateInt
        }
    ])
    .then((answers) => {
        console.log();
        console.log(`Hello, ${answers['firstName']} ${answers['lastName']}.`);
        console.log(`Your two integers are ${answers['firstInteger']} and ${answers['secondInteger']}.`);
        console.log(`The sum of ${answers['firstInteger']} and ${answers['secondInteger']}`
            + ` is ${answers['firstInteger'] + answers['secondInteger']}.`);
        console.log(`The product of ${answers['firstInteger']} and ${answers['secondInteger']}`
            + ` is ${answers['firstInteger'] * answers['secondInteger']}.`);
    });