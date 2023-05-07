// noinspection JSUnresolvedFunction

import {validatePassword, validatePasswordConfirm} from "../validator.js";

const PASSWORD = 'P@ssw0rd';
beforeEach(() => {
    validatePassword(PASSWORD);
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