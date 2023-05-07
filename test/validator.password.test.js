// noinspection JSUnresolvedFunction

import {validatePassword} from "../validator.js";

/**
 * Tests password validation.
 *
 * @author Andrew Nguyen
 * @version 7 May 2023
 */

test('password SUCCESS', () => {
    expect(validatePassword('P@ssw0rd')).toBe(true);
});

test('password with space SUCCESS', () => {
    expect(validatePassword('A password123*')).toBe(true);
});

test('password with underscore SUCCESS', () => {
    expect(validatePassword('A_password123')).toBe(true);
});

test('password most caps SUCCESS', () => {
    expect(validatePassword('PASSWORD_123a')).toBe(true);
});

test('password min length SUCCESS', () => {
    expect(validatePassword('P@ssw0rd')).toBe(true);
});

test('password long SUCCESS', () => {
    let password = 'Apassword123*';
    const appendLength = 256 - password.length - 1;
    for (let i = 0; i < appendLength; i++) password += 'a'
    expect(validatePassword(password)).toBe(true);
});

test('nothing ERROR', () => {
    expect(validatePassword('')).not.toBe(true);
});

test('too short ERROR', () => {
    expect(validatePassword('P@sw0rd'))
        .toBe('Password must contain at least 8 characters.');
});

test('too long ERROR', () => {
    let password = 'Apassword123*';
    const appendLength = 256 - password.length;
    for (let i = 0; i < appendLength; i++) password += 'a';
    expect(validatePassword(password))
        .toBe('Password must contain less than 256 characters.');
});

test('no uppercase ERROR', () => {
    expect(validatePassword('p@ssw0rd'))
        .toBe('Password must contain at least one uppercase letter.');
});

test('no lowercase ERROR', () => {
    expect(validatePassword('P@SSW0RD'))
        .toBe('Password must contain at least one lowercase letter.');
});

test('no number ERROR', () => {
    expect(validatePassword('P@ssword'))
        .toBe('Password must contain at least one number.');
});

test('no special character ERROR', () => {
    expect(validatePassword('Passw0rd'))
        .toBe('Password must contain at least one special character.');
});