import fs from "fs";
import bcrypt from "bcrypt";

/**
 * Validator validates user input.
 *
 * @author Andrew Nguyen
 * @version 7 May 2023
 */

const MAX_INT_32 = Math.pow(2, 31) - 1;
const MIN_INT_32 = Math.pow(2, 31) * -1;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 50;
const SALT_ROUNDS = 10;

let firstInt;
let passwordHash;

/**
 * Validates a given name. A name may only consist of up to 50 alphabetic characters.
 * @param name The input name.
 * @return {boolean|string} Error message if invalid, true if valid.
 */
export const validateName = (name) => {
    if (!/^[a-zA-Z]{1,50}$/.test(name)) {
        return 'Please input a valid name (alphabetic characters, 50 characters max).';
    }
    return true;
};

/**
 * Validates a given integer. An integer may only consist of numeric characters and is within the range of a 4 byte int
 * (-2^31 <= num <= 2^31 - 1).
 * @param num The input number.
 * @return {boolean} if the input is an integer and within range.
 */
const validateInt = (num) => /^\d+$/.test(num) && num >= MIN_INT_32 && num <= MAX_INT_32;

/**
 * Validates a given integer. An integer may only consist of numeric characters and is within the range of a 4 byte int
 * (-2^31 <= num <= 2^31 - 1).
 * @param num The input number.
 * @return {boolean|string} Error message if invalid, true if valid.
 */
export const validateFirstInt = (num) => {
    const inputNum = parseInt(num);
    if (!validateInt(inputNum)) {
        return 'Please input a valid integer (max of 2^31 - 1, min of -2^31).';
    }
    firstInt = inputNum;
    return true;
};

/**
 * Validates a given integer. An integer may only consist of numeric characters and is within the range of a 4 byte int
 * (-2^31 <= num <= 2^31 - 1). When added or multiplied with the first integer, it must not cause overflow or underflow.
 * @param num The input number.
 * @return {boolean|string} Error message if invalid, true if valid.
 */
export const validateSecondInt = (num) => {
    const inputNum = parseInt(num);
    if (!validateInt(inputNum) || !validateInt(firstInt + num) || !validateInt(firstInt * num)) {
        return 'Please input an integer that will not cause overflow or underflow when added or multiplied with the first integer (max of 2^31 - 1, min of -2^31).';
    }
    return true;
};

/**
 * Validates a given file name. A file name is valid if it ends in ".txt" and it exists.
 * @param filename The input file name.
 * @return {boolean|string} Error message if invalid, true if valid.
 */
// https://stackoverflow.com/questions/71343219/i-want-to-check-if-this-file-in-this-directory-existing-or-not
export const validateTextFile = (filename) => {
    if (!/^.*\.txt$/.test(filename)) return 'Please input a valid file name (.txt files only).';
    if (!fs.existsSync(filename)) return `"${filename}" does not exist.`;
    return true;
};

/**
 * Validates a given password. A password is valid if it contains:
 * - more than 8 characters
 * - less than 50 characters
 * - at least one capital letter
 * - at least one number
 * - at least one special character
 * Will also store the password hash if successful.
 * @param password The input password.
 * @return {boolean|string} Error message if invalid, true if valid.
 */
export const validatePassword = (password) => {
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
};

/**
 * Confirms a given password. A password will be confirmed if the hash matches that of the first password.
 * @param password The input confirm password.
 * @return {boolean|string} Error message if invalid, true if valid.
 */
export const validatePasswordConfirm = (password) => {
    if (!bcrypt.compareSync(password, passwordHash)) return 'Password does not match.';
    return true;
};