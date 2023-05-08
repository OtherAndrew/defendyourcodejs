import fs from "fs";
import bcrypt from "bcrypt";
import isValidFilename from "valid-filename";

/**
 * Validator validates user input.
 *
 * @author Andrew Nguyen
 * @version 7 May 2023
 */

const MAX_INT_32 = Math.pow(2, 31) - 1;
const MIN_INT_32 = Math.pow(2, 31) * -1;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 256;

let firstInt;

/**
 * Returns the current date and time in ISO format.
 * @return {string} the current date and time in ISO format.
 */
const timestamp = () => (new Date()).toISOString()

/**
 * Validates a given name. A name may only consist of up to 50 alphabetic characters, dashes or apostrophes.
 * @param name The input name.
 * @return {boolean|string} Error message if invalid, true if valid.
 */
export const validateName = (name) => {
    if (!/^[a-zA-Z'-]{1,50}$/.test(name)) {
        fs.appendFileSync('error.log', `[${timestamp()}] INVALID NAME: ${name}\n`);
        return 'Please input a valid name (alphabetic characters, 50 characters max).';
    }
    return true;
};

/**
 * Validates a given integer for form. An integer may only consist of numeric characters with
 * or without minus at the start.
 * @param num The input number.
 * @return {boolean} If the input is an integer.
 */
const validateInt = (num) => /^-?\d+$/.test(num);

/**
 * Validates a given integer for range. An integer must be within the range of a 4 byte int
 * (-2^31 <= num <= 2^31 - 1).
 * @param num The input number.
 * @return {boolean} If the input is within range.
 */
const validateRange = (num) => parseInt(num) >= MIN_INT_32 && parseInt(num) <= MAX_INT_32;

/**
 * Validates a given integer. An integer may only consist of numeric characters and is within the range of a 4 byte int
 * (-2^31 <= num <= 2^31 - 1).
 * @param num The input number.
 * @return {boolean|string} Error message if invalid, true if valid.
 */
export const validateFirstInt = (num) => {
    if (!validateInt(num) || !validateRange(num)) {
        fs.appendFileSync('error.log', `[${timestamp()}] INVALID FIRST INT: ${num}\n`);
        return 'Please input a valid integer (max of 2^31 - 1, min of -2^31).';
    }
    firstInt = parseInt(num);
    return true;
};

/**
 * Validates a given integer. An integer may only consist of numeric characters and is within the range of a 4 byte int
 * (-2^31 <= num <= 2^31 - 1). When added or multiplied with the first integer, it must not cause overflow or underflow.
 * @param num The input number.
 * @return {boolean|string} Error message if invalid, true if valid.
 */
export const validateSecondInt = (num) => {
    if (!validateInt(num)) {
        fs.appendFileSync('error.log', `[${timestamp()}] INVALID SECOND INT: ${num}\n`);
        return 'Please input a valid integer (max of 2^31 - 1, min of -2^31).';
    }
    const inputNum = parseInt(num);
    if (!validateRange(firstInt * inputNum) || !validateRange(firstInt + inputNum)) {
        fs.appendFileSync('error.log', `[${timestamp()}] INVALID SECOND INT OVERFLOW: ${num} (first int: ${firstInt})\n`);
        return 'Please input an integer that will not cause overflow or underflow when added or multiplied with the first integer (max of 2^31 - 1, min of -2^31).';
    }
    return true;
};

/**
 * Validates a given file input name. A file name is valid if it:
 * - ends in ".txt"
 * - does not contain reserved characters
 * - is in the same directory as index.js
 * @param filename The input file name.
 * @return {boolean|string} Error message if invalid, true if valid.
 */
// https://stackoverflow.com/questions/71343219/i-want-to-check-if-this-file-in-this-directory-existing-or-not
export const validateInputTextFile = (filename) => {
    if (!/\.txt$/.test(filename) || !isValidFilename(filename)) {
        fs.appendFileSync('error.log', `[${timestamp()}] INVALID INPUT FILE: ${filename}\n`);
        return 'Please input a valid file name (.txt files only, no reserved characters).';
    }
    if (!fs.existsSync(filename)) {
        fs.appendFileSync('error.log', `[${timestamp()}] FILE DOES NOT EXIST: ${filename}\n`);
        return `"${filename}" does not exist.`;
    }
    return true;
};

/**
 * Validates a given file input name. A file name is valid if it:
 * - ends in ".txt"
 * - does not contain reserved characters
 * - is not already used for another file in the output directory
 * @param filename The output file name.
 * @return {boolean|string} Error message if invalid, true if valid.
 */
export const validateOutputTextFile = (filename) => {
    if (!/\.txt$/.test(filename) || !isValidFilename(filename) || /\.\./.test(filename)) {
        fs.appendFileSync('error.log', `[${timestamp()}] INVALID INPUT FILE: ${filename}\n`);
        return 'Please input a valid file name (.txt files only, no reserved characters).';
    }
    if (fs.existsSync(`output/${filename}`)) {
        fs.appendFileSync('error.log', `[${timestamp()}] FILE ALREADY EXISTS: ${filename}\n`);
        return `"${filename}" already exists.`;
    }
    return true;
};

/**
 * Validates a given password. A password is valid if it contains:
 * - at least 8 characters
 * - less than 256 characters
 * - at least one uppercase letter
 * - at least one lowercase letter
 * - at least one number
 * - at least one special character
 * Will also store the password hash if successful.
 * @param password The input password.
 * @return {boolean|string} Error message if invalid, true if valid.
 */
export const validatePassword = (password) => {
    if (password.length < MIN_PASSWORD_LENGTH) {
        fs.appendFileSync('error.log', `[${timestamp()}] TOO SHORT PASSWORD: ${password}\n`);
        return `Password must contain at least ${MIN_PASSWORD_LENGTH} characters.`;
    }
    if (password.length >= MAX_PASSWORD_LENGTH) {
        fs.appendFileSync('error.log', `[${timestamp()}] TOO LONG PASSWORD: ${password}\n`);
        return `Password must contain less than ${MAX_PASSWORD_LENGTH} characters.`;
    }
    if (!/[A-Z]+/.test(password)) {
        fs.appendFileSync('error.log', `[${timestamp()}] NO UPPERCASE PASSWORD: ${password}\n`);
        return 'Password must contain at least one uppercase letter.';
    }
    if (!/[a-z]+/.test(password)) {
        fs.appendFileSync('error.log', `[${timestamp()}] NO LOWERCASE PASSWORD: ${password}\n`);
        return 'Password must contain at least one lowercase letter.';
    }
    if (!/\d+/.test(password)) {
        fs.appendFileSync('error.log', `[${timestamp()}] NO NUMBER PASSWORD: ${password}\n`);
        return 'Password must contain at least one number.';
    }
    if (!/[!@#$%^&*\-_=+\\|?/,.;:'"`~\[\]{}<>]+/.test(password)) {
        fs.appendFileSync('error.log', `[${timestamp()}] NO SPECIAL CHAR PASSWORD: ${password}\n`);
        return 'Password must contain at least one special character.';
    }
    return true;
};

/**
 * Checks a password against a hash. The password is valid if its hash matches the hash given.
 * @param password The input confirm password.
 * @param hash The password hash.
 * @return {boolean|string} Error message if invalid, true if valid.
 */
export const validatePasswordConfirm = (password, hash) => {
    //https://www.npmjs.com/package/bcrypt
    if (!bcrypt.compareSync(password, hash)) {
        fs.appendFileSync('error.log', `[${timestamp()}] PASSWORD CONFIRM FAIL: ${password}\n`);
        return 'Password does not match.';
    }
    return true;
};