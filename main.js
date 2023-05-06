// import inquirer from "inquirer";

import { input } from '@inquirer/prompts';

const validateName = (name) => /[a-zA-Z]{1,50}/.test(name);

const firstName = await input({
    message: 'Enter your first name:',
    validate: validateName
});

const lastName = await input({
    message: 'Enter your last name:',
    validate: validateName
});

console.log(`Hello, ${firstName} ${lastName}.`);