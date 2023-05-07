// noinspection JSUnresolvedFunction

import {validateName} from "../validator.js";

test('caps SUCCESS', () => {
    expect(validateName('Andrew')).toBe(true);
});

test('no caps SUCCESS', () => {
    expect(validateName('andrew')).toBe(true);
});

test('all caps SUCCESS', () => {
    expect(validateName('ANDREW')).toBe(true);
});

test('has dash SUCCESS', () => {
    expect(validateName('Lopez-Alt')).toBe(true);
});

test('has apostrophe SUCCESS', () => {
    expect(validateName('d\'Arras')).toBe(true);
});

test('nothing ERROR', () => {
    expect(validateName('')).not.toBe(true);
});

test('too long ERROR', () => {
    let testString = '';
    for (let i = 0; i < 51; i++) testString += 'a';
    expect(validateName(testString)).not.toBe(true);
});

test('has numbers ERROR', () => {
    expect(validateName('andrew1')).not.toBe(true);
});

test('only numbers ERROR', () => {
    expect(validateName('1234')).not.toBe(true);
});

test('has space ERROR', () => {
    expect(validateName('J Kenji Lopez-Alt')).not.toBe(true);
});

test('has symbol ERROR', () => {
    expect(validateName('$am')).not.toBe(true);
});