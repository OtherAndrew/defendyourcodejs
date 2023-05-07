// noinspection JSUnresolvedFunction

import {validateAndStorePassword, validatePasswordConfirm} from "../validator.js";

/**
 * Tests password confirmation validation.
 *
 * @author Andrew Nguyen
 * @version 7 May 2023
 */

const PASSWORD = 'P@ssw0rd';
beforeEach(() => {
    validateAndStorePassword(PASSWORD);
});

test('password match SUCCESS', () => {
   expect(validatePasswordConfirm(PASSWORD)).toBe(true);
});

test('nothing ERROR', () => {
    expect(validatePasswordConfirm('')).not.toBe(true);
});

test('password not match ERROR', () => {
    expect(validatePasswordConfirm('does not match')).not.toBe(true);
});