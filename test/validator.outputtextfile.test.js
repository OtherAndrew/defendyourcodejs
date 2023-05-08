// noinspection JSUnresolvedFunction

import {validateOutputTextFile} from "../validator.js";
import fs from "fs";

/**
 * Tests output text file validation.
 *
 * @author Andrew Nguyen
 * @version 7 May 2023
 */

const OUTPUT_DIRECTORY = 'output';

test('default SUCCESS', () => {
   expect(validateOutputTextFile('person_guy_1683503877707.txt')).toBe(true);
});

test('one letter SUCCESS', () => {
    expect(validateOutputTextFile('a.txt')).toBe(true);
});

test('numbers SUCCESS', () => {
    expect(validateOutputTextFile('1234.txt')).toBe(true);
});

test('dot SUCCESS', () => {
    expect(validateOutputTextFile('output.file.txt')).toBe(true);
});

test('hidden SUCCESS', () => {
    expect(validateOutputTextFile('.hiddenfile.txt')).toBe(true);
});

test('nothing ERROR', () => {
    expect(validateOutputTextFile('')).not.toBe(true);
});

test('not .txt ERROR', () => {
    expect(validateOutputTextFile('output.md')).not.toBe(true);
    expect(validateOutputTextFile('output')).not.toBe(true);
});

test('has slashes ERROR', () => {
    expect(validateOutputTextFile('/output.txt')).not.toBe(true);
});

test('has double dots ERROR', () => {
    expect(validateOutputTextFile('..output.txt')).not.toBe(true);
    expect(validateOutputTextFile('aaa..output.txt')).not.toBe(true);
});

test('symbols ERROR', () => {
    expect(validateOutputTextFile('&*%&.txt')).not.toBe(true);
});

test('already exists ERROR', () => {
    const filename = 'test.txt';
    const filenameWithPath = `${OUTPUT_DIRECTORY}/${filename}`;
    if (!fs.existsSync(OUTPUT_DIRECTORY)) fs.mkdirSync(OUTPUT_DIRECTORY);
    fs.writeFileSync(filenameWithPath, 'output test');
    expect(validateOutputTextFile(filename))
        .toBe(`"${filename}" already exists.`);
    fs.unlinkSync(filenameWithPath);
});
