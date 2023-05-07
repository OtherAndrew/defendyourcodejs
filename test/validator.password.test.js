// noinspection JSUnresolvedFunction

import {validateAndStorePassword} from "../validator.js";

/**
 * Tests password validation.
 *
 * @author Andrew Nguyen
 * @version 7 May 2023
 */

test('password SUCCESS', () => {
    expect(validateAndStorePassword('P@ssw0rd')).toBe(true);
});

test('password with space SUCCESS', () => {
    expect(validateAndStorePassword('A password123*')).toBe(true);
});

test('password with underscore SUCCESS', () => {
    expect(validateAndStorePassword('A_password123')).toBe(true);
});

test('password most caps SUCCESS', () => {
    expect(validateAndStorePassword('PASSWORD_123a')).toBe(true);
});

test('password min length SUCCESS', () => {
    expect(validateAndStorePassword('P@ssw0rd')).toBe(true);
});

test('password max length SUCCESS', () => {
    let password = 'Apassword123*';
    const appendLength = 256 - password.length - 1;
    for (let i = 0; i < appendLength; i++) password += 'a'
    expect(validateAndStorePassword(password)).toBe(true);
});

test('nothing ERROR', () => {
    expect(validateAndStorePassword('')).not.toBe(true);
});

test('too short ERROR', () => {
    expect(validateAndStorePassword('P@sw0rd'))
        .toBe('Password must contain at least 8 characters.');
});

test('too long ERROR', () => {
    let password = 'Apassword123*';
    const appendLength = 256 - password.length;
    for (let i = 0; i < appendLength; i++) password += 'a';
    expect(validateAndStorePassword(password))
        .toBe('Password must contain less than 256 characters.');
});

test('no uppercase ERROR', () => {
    expect(validateAndStorePassword('p@ssw0rd'))
        .toBe('Password must contain at least one uppercase letter.');
});

test('no lowercase ERROR', () => {
    expect(validateAndStorePassword('P@SSW0RD'))
        .toBe('Password must contain at least one lowercase letter.');
});

test('no number ERROR', () => {
    expect(validateAndStorePassword('P@ssword'))
        .toBe('Password must contain at least one number.');
});

test('no special character ERROR', () => {
    expect(validateAndStorePassword('Passw0rd'))
        .toBe('Password must contain at least one special character.');
});