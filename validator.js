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
const LOG_DIRECTORY = 'logs';

let firstInt;

/**
 * Returns the current date and time in ISO format.
 * @return {string} the current date and time in ISO format.
 */
const timestamp = () => (new Date()).toISOString();

/**
 * Logs error message to logs/[date]error.log.
 * @param message The error message.
 */
const logError = (message) => {
    if (!fs.existsSync(LOG_DIRECTORY)) fs.mkdirSync(LOG_DIRECTORY);
    const date = timestamp().split('T')[0];
    fs.appendFileSync(`${LOG_DIRECTORY}/${date}_error.log`, `[${timestamp()}] ${message}\n`);
}

/**
 * Validates a given name. A name may only consist of up to 50 alphabetic characters, dashes or apostrophes.
 * @param name The input name.
 * @return {boolean|string} Error message if invalid, true if valid.
 */
export const validateName = (name) => {
    if (!/^[a-zA-Z'-]{1,50}$/.test(name)) {
        logError(`INVALID NAME: "${name}"`);
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
        logError(`INVALID FIRST INT: "${num}"`);
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
        logError(`INVALID SECOND INT: "${num}"`);
        return 'Please input a valid integer (max of 2^31 - 1, min of -2^31).';
    }
    const inputNum = parseInt(num);
    if (!validateRange(firstInt * inputNum) || !validateRange(firstInt + inputNum)) {
        logError(`INVALID SECOND INT OVERFLOW: "${num}" (first int: "${firstInt}")`);
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
    if (!/^.+\.txt$/.test(filename) || !isValidFilename(filename)) {
        logError(`INVALID INPUT FILE: "${filename}"`);
        return 'Please input a valid file name (.txt files only, no reserved characters).';
    }
    if (!fs.existsSync(filename)) {
        logError(`FILE DOES NOT EXIST: "${filename}"`);
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
    if (!/^.+\.txt$/.test(filename) || !isValidFilename(filename) || /\.\./.test(filename)) {
        logError(`INVALID OUTPUT FILE: "${filename}"`);
        return 'Please input a valid file name (.txt files only, no reserved characters).';
    }
    if (fs.existsSync(`output/${filename}`)) {
        logError(`FILE ALREADY EXISTS: "${filename}"`);
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
        logError(`TOO SHORT PASSWORD: "${password}"`);
        return `Password must contain at least ${MIN_PASSWORD_LENGTH} characters.`;
    }
    if (password.length >= MAX_PASSWORD_LENGTH) {
        logError(`TOO LONG PASSWORD: "${password}"`);
        return `Password must contain less than ${MAX_PASSWORD_LENGTH} characters.`;
    }
    if (!/[A-Z]+/.test(password)) {
        logError(`NO UPPERCASE PASSWORD: "${password}"`);
        return 'Password must contain at least one uppercase letter.';
    }
    if (!/[a-z]+/.test(password)) {
        logError(`NO LOWERCASE PASSWORD: "${password}"`);
        return 'Password must contain at least one lowercase letter.';
    }
    if (!/\d+/.test(password)) {
        logError(`NO NUMBER PASSWORD: "${password}"`);
        return 'Password must contain at least one number.';
    }
    if (!/[!@#$%^&*\-_=+\\|?/,.;:'"`~\[\]{}<>]+/.test(password)) {
        logError(`NO SPECIAL CHAR PASSWORD: "${password}"`);
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
        logError(`PASSWORD CONFIRM FAIL: "${password}"`);
        return 'Password does not match.';
    }
    return true;
};
