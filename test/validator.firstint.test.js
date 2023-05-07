// noinspection JSUnresolvedFunction

import {validateFirstInt} from "../validator.js";

const MAX = 2147483647;
const MIN = -2147483648;

test('one digit SUCCESS', () => {
    expect(validateFirstInt('1')).toBe(true);
});

test('multiple digit SUCCESS', () => {
    expect(validateFirstInt('234')).toBe(true);
});

test('negative number SUCCESS', () => {
    expect(validateFirstInt('-234')).toBe(true);
});

test('zero SUCCESS', () => {
    expect(validateFirstInt('0')).toBe(true);
});

test('negative zero SUCCESS', () => {
    expect(validateFirstInt('-0')).toBe(true);
});

test('max number SUCCESS', () => {
    expect(validateFirstInt(MAX)).toBe(true);
});

test('min number SUCCESS', () => {
    expect(validateFirstInt(MIN)).toBe(true);
});

test('nothing ERROR', () => {
    expect(validateFirstInt('')).not.toBe(true);
});

test('dash only ERROR', () => {
    expect(validateFirstInt('-')).not.toBe(true);
});

test('not a number ERROR', () => {
    expect(validateFirstInt('ten')).not.toBe(true);
});

test('has symbols ERROR', () => {
    expect(validateFirstInt('$19')).not.toBe(true);
});

test('decimal ERROR', () => {
    expect(validateFirstInt('4.99')).not.toBe(true);
});

test('over max number ERROR', () => {
    expect(validateFirstInt(MAX + 1)).not.toBe(true);
});

test('under min number ERROR', () => {
    expect(validateFirstInt(MIN - 1)).not.toBe(true);
});