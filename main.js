import { input } from '@inquirer/prompts';

const MAX_INT_32 = Math.pow(2, 31) - 1;
const MIN_INT_32 = Math.pow(2, 31) * -1;

const validateName = (name) => /^[a-zA-Z]{1,50}$/.test(name);

const clamp = (num, min, max) => Math.max(min, Math.min(num, max));

const validateInt = (num) => {
    return /^\d+$/.test(num)
        && num >= MIN_INT_32
        && num <= MAX_INT_32;
}

const validateIntAddition = (num1, num2) => validateInt(num1 + num2);

const validateIntMultiplication = (num1, num2) => validateInt(num1 * num2);

const firstName = await input({
    message: 'Enter your first name:',
    validate: validateName
});

const lastName = await input({
    message: 'Enter your last name:',
    validate: validateName
});

const firstInt = await input({
    message: 'Enter your first integer:',
    validate: validateInt
});

const secondInt = await input({
    message: 'Enter your second integer:',
    validate: validateInt
});

const filename = await input({
    message: 'Enter an input file:'
})

console.log();
console.log(`Hello, ${firstName} ${lastName}.`);
console.log(`Your two integers are ${firstInt} and ${secondInt}.`);
console.log(`The sum of ${firstInt} and ${secondInt} is ${firstInt + secondInt}.`);
console.log(`The product of ${firstInt} and ${secondInt} is ${firstInt * secondInt}.`);
console.log(`The file you chose is "${filename}".`);