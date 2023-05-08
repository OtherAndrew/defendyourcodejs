// noinspection JSUnresolvedFunction

import {validateInputTextFile} from "../validator.js";
import fs from "fs";

/**
 * Tests input text file validation.
 *
 * @author Andrew Nguyen
 * @version 7 May 2023
 */

beforeAll(() => {
   fs.writeFileSync('test.txt', 'test');
   fs.writeFileSync('.hidden.txt', 'hidden');
   fs.writeFileSync('test file.txt', 'test file');
   fs.writeFileSync('test.file.txt', 'test.file');
   fs.writeFileSync('test[file].txt', 'test[file]');
});

afterAll(() => {
    fs.unlinkSync('test.txt');
    fs.unlinkSync('.hidden.txt');
    fs.unlinkSync('test file.txt');
    fs.unlinkSync('test.file.txt');
    fs.unlinkSync('test[file].txt');
});

test('valid file SUCCESS', () => {
    expect(validateInputTextFile('test.txt')).toBe(true);
});

test('valid file hidden SUCCESS', () => {
    expect(validateInputTextFile('.hidden.txt')).toBe(true);
});

test('valid file space SUCCESS', () => {
    expect(validateInputTextFile('test file.txt')).toBe(true);
});

test('valid file dot SUCCESS', () => {
    expect(validateInputTextFile('test.file.txt')).toBe(true);
});

test('valid file symbols SUCCESS', () => {
    expect(validateInputTextFile('test[file].txt')).toBe(true);
});

test('nothing ERROR', () => {
   expect(validateInputTextFile('')).not.toBe(true);
});

test('not .txt ERROR', () => {
    expect(validateInputTextFile('test')).not.toBe(true);
    expect(validateInputTextFile('test.md')).not.toBe(true);
    expect(validateInputTextFile('////')).not.toBe(true);
});

test('does not exist ERROR', () => {
    const badFileName = 'doesNotExist.txt';
    expect(validateInputTextFile(badFileName))
        .toBe(`"${badFileName}" does not exist.`);
});

test('dot slash ERROR', () => {
    expect(validateInputTextFile('./test.txt')).not.toBe(false);
});

test('from root ERROR', () => {
    const path = `${process.cwd()}/test.txt`
    expect(validateInputTextFile(path)).not.toBe(false);
});
