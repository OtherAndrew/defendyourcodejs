// noinspection JSUnresolvedFunction

import {validateFirstInt, validateSecondInt} from "../validator.js";

const MAX = 2147483647;
const MIN = -2147483648;

test('one digit SUCCESS', () => {
    validateFirstInt(1);
    expect(validateSecondInt('1')).toBe(true);
});

test('multiple digit SUCCESS', () => {
    validateFirstInt(1);
    expect(validateSecondInt('2342')).toBe(true);
});

test('max minus one plus one SUCCESS', () => {
    const testNum = MAX - 1;
    validateFirstInt(testNum);
    expect(validateSecondInt('1')).toBe(true);
});

test('min plus one minus one SUCCESS', () => {
    const testNum = MIN + 1;
    validateFirstInt(testNum);
    expect(validateSecondInt('1')).toBe(true);
});

test('max value SUCCESS', () => {
    const sqrtMax = Math.floor(Math.sqrt(MAX));
    validateFirstInt(sqrtMax)
    expect(validateSecondInt(-sqrtMax)).toBe(true);
});

test('zero and zero SUCCESS', () => {
    validateFirstInt(0);
    expect(validateSecondInt('0')).toBe(true);
});

test('nothing ERROR', () => {
    validateFirstInt(0);
    expect(validateSecondInt('')).not.toBe(true);
});

test('dash only ERROR', () => {
    validateFirstInt(0);
    expect(validateSecondInt('-')).not.toBe(true);
});

test('not a number ERROR', () => {
    validateFirstInt(0);
    expect(validateSecondInt('ten')).not.toBe(true);
});

test('has symbols ERROR', () => {
    validateFirstInt(0);
    expect(validateSecondInt('$19')).not.toBe(true);
});

test('decimal ERROR', () => {
    validateFirstInt(0);
    expect(validateSecondInt('4.99')).not.toBe(true);
});

test('over max number ERROR', () => {
    validateFirstInt(MAX);
    expect(validateSecondInt('1')).not.toBe(true);
    const halfMax = MAX/2;
    validateFirstInt(halfMax);
    expect(validateSecondInt(halfMax)).not.toBe(true);
    const sqrtMax = Math.ceil(Math.sqrt(MAX))
    validateFirstInt(sqrtMax);
    expect(validateSecondInt(sqrtMax)).not.toBe(true);
});

test('under min number ERROR', () => {
    validateFirstInt(0);
    expect(validateSecondInt(MIN - 1)).not.toBe(true);
    validateFirstInt(MIN);
    expect(validateSecondInt('-1')).not.toBe(true);
});