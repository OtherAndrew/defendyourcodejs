// noinspection JSUnresolvedFunction

import {validateTextFile} from "../validator.js";

/**
 * Tests text file validation.
 *
 * @author Andrew Nguyen
 * @version 7 May 2023
 */

test('valid file SUCCESS', () => {
    expect(validateTextFile('test.txt')).toBe(true);
});

test('valid file dot slash SUCCESS', () => {
    expect(validateTextFile('./test.txt')).toBe(true);
});

test('valid file from root SUCCESS', () => {
    const path = `${process.cwd()}/test.txt`
    expect(validateTextFile(path)).toBe(true);
});

test('valid file hidden SUCCESS', () => {
    expect(validateTextFile('.hidden.txt')).toBe(true);
});

test('valid file space SUCCESS', () => {
    expect(validateTextFile('test file.txt')).toBe(true);
});

test('nothing ERROR', () => {
   expect(validateTextFile('')).not.toBe(true);
});

test('not .txt ERROR', () => {
    expect(validateTextFile('test')).not.toBe(true);
    expect(validateTextFile('test.md')).not.toBe(true);
    expect(validateTextFile('////')).not.toBe(true);
});

test('does not exist ERROR', () => {
    const badFileName = 'doesNotExist.txt';
    expect(validateTextFile(badFileName))
        .toBe(`"${badFileName}" does not exist.`);
});