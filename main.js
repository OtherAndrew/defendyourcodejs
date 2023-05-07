import inquirer from 'inquirer';
import * as fs from "fs";
import bcrypt from 'bcrypt';

const MAX_INT_32 = Math.pow(2, 31) - 1;
const MIN_INT_32 = Math.pow(2, 31) * -1;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 50;
const SALT_ROUNDS = 10;

let firstInt;
let passwordHash;

const validateName = (name) => {
    if (!/^[a-zA-Z]{1,50}$/.test(name)) {
        return 'Please input a valid name (alphabetic characters, 50 characters max).';
    }
    return true;
}

const validateInt = (num) => /^\d+$/.test(num) && num >= MIN_INT_32 && num <= MAX_INT_32;

const validateFirstInt = (num) => {
    const inputNum = parseInt(num);
    if (!validateInt(inputNum)) {
        return 'Please input a valid integer (max of 2^31 - 1, min of -2^31).';
    }
    firstInt = inputNum;
    return true;
}

const validateSecondInt = (num) => {
    const inputNum = parseInt(num);
    if (!validateInt(inputNum) || !validateInt(firstInt + num) || !validateInt(firstInt * num)) {
        return 'Please input a valid integer (max of 2^31 - 1, min of -2^31).';
    }
    return true;
}

const formatNumber = (num) => new Intl.NumberFormat().format(num)

// https://stackoverflow.com/questions/71343219/i-want-to-check-if-this-file-in-this-directory-existing-or-not
const validateTextFile = (filename) => {
    if (!/^.*\.txt$/.test(filename)) return 'Please input a valid file name (.txt files only).';
    if (!fs.existsSync(filename)) return `"${filename}" does not exist.`;
    return true;
}

const validatePassword = (password) => {
    if (password.length <= MIN_PASSWORD_LENGTH) {
        return `Password must be longer than ${MIN_PASSWORD_LENGTH} characters.`;
    }
    if (password.length > MAX_PASSWORD_LENGTH) {
        return `Password must be shorter than ${MAX_PASSWORD_LENGTH} characters.`;
    }
    if (!/[A-Z]+/.test(password)) {
        return 'Password must contain at least one capital letter.';
    }
    if (!/\d+/.test(password)) {
        return 'Password must contain at least one number.';
    }
    if (!/[!@#$%^&*\-_=+\\|?/,.;:'"`~\[\]{}<>]+/.test(password)) {
        return 'Password must contain at least one special character.';
    }
    //https://www.npmjs.com/package/bcrypt
    passwordHash = bcrypt.hashSync(password, SALT_ROUNDS);
    return true;
}

const validatePasswordConfirm = (password) => {
    if (!bcrypt.compareSync(password, passwordHash)) return 'Password does not match.';
    return true;
}

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
        name: 'fileName',
        message: 'Input the file name of your text file:',
        validate: validateTextFile
    },
    {
        type: 'password',
        name: 'userPassword',
        message: 'Enter your password:',
        validate: validatePassword,
        mask: true
    },
    {
        type: 'password',
        name: 'userPasswordConfirm',
        message: 'Enter your password again:',
        validate: validatePasswordConfirm,
        mask: true
    },
];

/**
 * Echos user input to console.
 * @param answers user input.
 * @param answers.firstName the user's first name.
 * @param answers.lastName the user's last name.
 * @param answers.firstInteger the first integer the user provided.
 * @param answers.secondInteger the last integer the user provided.
 * @param answers.fileName the file name the user provided.
 */
const writeToConsole = (answers) => {
    const sum = formatNumber(parseInt(answers.firstInteger) + parseInt(answers.secondInteger));
    const product = formatNumber( parseInt(answers.firstInteger) * parseInt(answers.secondInteger));
    const firstIntOut = formatNumber(answers.firstInteger);
    const secondIntOut = formatNumber(answers.secondInteger);
    const fileContents = fs.readFileSync(answers.fileName, 'utf8');

    console.log();
    console.log(`Hello, ${answers.firstName} ${answers.lastName}.`);
    console.log(`Your integers are ${firstIntOut} and ${secondIntOut}.`);
    console.log(`The sum of ${firstIntOut} and ${secondIntOut} is ${sum}.`);
    console.log(`The product of ${firstIntOut} and ${secondIntOut} is ${product}.`);
    console.log(`The text file you chose is "${answers.fileName}".`);
    console.log(`The contents of "${answers.fileName}" are:`);
    console.log(fileContents);
}

/**
 * Writes user input to file.
 * @param answers user input.
 * @param answers.firstName the user's first name.
 * @param answers.lastName the user's last name.
 * @param answers.firstInteger the first integer the user provided.
 * @param answers.secondInteger the last integer the user provided.
 * @param answers.fileName the file name the user provided.
 */
const writeToFile = (answers) => {
    const sum = formatNumber(parseInt(answers.firstInteger) + parseInt(answers.secondInteger));
    const product = formatNumber( parseInt(answers.firstInteger) * parseInt(answers.secondInteger));
    const firstIntOut = formatNumber(answers.firstInteger);
    const secondIntOut = formatNumber(answers.secondInteger);
    const outputFileName = `output/${answers.lastName}_${answers.firstName}_${Date.now()}.txt`;
    const inputFileContents = fs.readFileSync(answers.fileName, 'utf8');
    const outputFileContents = [
        `First name: ${answers.firstName}`,
        `Last name: ${answers.lastName}`,
        `First integer: ${firstIntOut}`,
        `Second integer: ${secondIntOut}`,
        `Sum: ${sum}`,
        `Product: ${product}`,
        `Input file name: ${answers.fileName}`,
        `Contents of "${answers.fileName}":`,
        inputFileContents
    ]
    //https://nodejs.dev/en/learn/writing-files-with-nodejs/
    fs.writeFileSync(outputFileName, outputFileContents.join('\n'));
    console.log(`Saved results to: ${outputFileName}`);
}

// https://www.npmjs.com/package/inquirer
inquirer
    .prompt(questions, () => {})
    .then((answers) => {
        writeToConsole(answers);
        writeToFile(answers);
    });