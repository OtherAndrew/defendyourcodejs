import inquirer from 'inquirer';
import * as fs from "fs";
import bcrypt from 'bcrypt';

import {
    validateFirstInt,
    validateInputTextFile,
    validateName,
    validateOutputTextFile,
    validatePassword,
    validatePasswordConfirm,
    validateSecondInt,
} from './validator.js';
import { OUTPUT_DIRECTORY } from './directories.js';

/**
 * Main is the CLI front end for DefendYourCodeJS.
 *
 * @author Andrew Nguyen
 * @version 7 May 2023
 */

const SALT_ROUNDS = 10;
const questions = [
    {
        type: 'input',
        name: 'firstName',
        message: 'Enter your first name:',
        validate: validateName
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Enter your last name:',
        validate: validateName
    },
    {
        type: 'input',
        name: 'firstInteger',
        message: 'Enter your first integer:',
        validate: validateFirstInt
    },
    {
        type: 'input',
        name: 'secondInteger',
        message: 'Enter your second integer:',
        validate: validateSecondInt
    },
    {
        type: 'input',
        name: 'inputFileName',
        message: 'Input the file name of your input text file:',
        validate: validateInputTextFile
    },
    {
        type: 'input',
        name: 'outputFileName',
        message: 'Input the file name of your output text file:',
        validate: validateOutputTextFile,
        default: (answers) => `${answers.lastName}_${answers.firstName}_${Date.now()}.txt`
    },
    {
        type: 'password',
        name: 'userPassword',
        message: 'Enter your password:',
        validate: validatePassword,
        mask: true
    },
];

/**
 * Formats a number with an absolute value in the thousands with commas.
 * @param num The number to format.
 * @return {string} The number formatted with commas.
 */
const formatNumber = (num) => new Intl.NumberFormat().format(num);

/**
 * Writes user input to file.
 * @param answers user input.
 * @param answers.firstName the user's first name.
 * @param answers.lastName the user's last name.
 * @param answers.firstInteger the first integer the user provided.
 * @param answers.secondInteger the last integer the user provided.
 * @param answers.inputFileName the input file name the user provided.
 * @param answers.outputFileName the output file name the user provided.
 * @param answers.userPassword the password the user provided.
 * @return {string} the output file name.
 */
const writeToFile = (answers) => {
    if (!fs.existsSync(OUTPUT_DIRECTORY)) fs.mkdirSync(OUTPUT_DIRECTORY);
    const sum = formatNumber(parseInt(answers.firstInteger) + parseInt(answers.secondInteger));
    const product = formatNumber(parseInt(answers.firstInteger) * parseInt(answers.secondInteger));
    const firstIntOut = formatNumber(answers.firstInteger);
    const secondIntOut = formatNumber(answers.secondInteger);
    const outputFileName = `${OUTPUT_DIRECTORY}/${answers.outputFileName}`;
    const inputFileContents = fs.readFileSync(answers.inputFileName, 'utf8');

    const outputFileContents = [
        `First name: ${answers.firstName}`,
        `Last name: ${answers.lastName}`,
        `First integer: ${firstIntOut}`,
        `Second integer: ${secondIntOut}`,
        `Sum: ${sum}`,
        `Product: ${product}`,
        `Input file name: ${answers.inputFileName}`,
        `Contents of ${answers.inputFileName}:`,
        inputFileContents,
        `Password hash:`,
        //https://www.npmjs.com/package/bcrypt
        bcrypt.hashSync(answers.userPassword, SALT_ROUNDS)
    ];
    //https://nodejs.dev/en/learn/writing-files-with-nodejs/
    fs.writeFileSync(outputFileName, outputFileContents.join('\n'));
    console.log(`Saved results to: ${outputFileName}`);
    return outputFileName;
};

/**
 * Echos user input to console.
 * @param answers user input.
 * @param answers.firstName the user's first name.
 * @param answers.lastName the user's last name.
 * @param answers.firstInteger the first integer the user provided.
 * @param answers.secondInteger the last integer the user provided.
 * @param answers.inputFileName the file name the user provided.
 */
const writeToConsole = (answers) => {
    const sum = formatNumber(parseInt(answers.firstInteger) + parseInt(answers.secondInteger));
    const product = formatNumber(parseInt(answers.firstInteger) * parseInt(answers.secondInteger));
    const firstIntOut = formatNumber(answers.firstInteger);
    const secondIntOut = formatNumber(answers.secondInteger);
    const fileContents = fs.readFileSync(answers.inputFileName, 'utf8');

    console.log();
    console.log(`Hello, ${answers.firstName} ${answers.lastName}.`);
    console.log(`Your integers are ${firstIntOut} and ${secondIntOut}.`);
    console.log(`The sum of ${firstIntOut} and ${secondIntOut} is ${sum}.`);
    console.log(`The product of ${firstIntOut} and ${secondIntOut} is ${product}.`);
    console.log(`The text file you chose is "${answers.inputFileName}".`);
    console.log(`The contents of "${answers.inputFileName}" are:`);
    console.log(fileContents);
};

// https://www.npmjs.com/package/inquirer
inquirer
    .prompt(questions)
    .then((answers) => {
        const outputFile = writeToFile(answers);
        const file = fs.readFileSync(outputFile, 'utf8').split('\n');
        const hash = file[file.length - 1];
        const confirmPassword = (password) => validatePasswordConfirm(password, hash);
        inquirer
            .prompt({
                type: 'password',
                name: 'userPasswordConfirm',
                message: 'Enter your password again:',
                validate: confirmPassword,
                mask: true
            })
            .then(() => {
                writeToConsole(answers);
            });
    });
