// noinspection JSUnresolvedFunction

import {validatePasswordConfirm} from "../validator.js";
import bcrypt from "bcrypt";

/**
 * Tests password confirmation validation.
 *
 * @author Andrew Nguyen
 * @version 7 May 2023
 */

const PASSWORD = 'P@ssw0rd';
const PASSWORD_HASH = bcrypt.hashSync(PASSWORD, 10);

test('password match SUCCESS', () => {
   expect(validatePasswordConfirm(PASSWORD, PASSWORD_HASH)).toBe(true);
});

test('nothing ERROR', () => {
    expect(validatePasswordConfirm('', PASSWORD_HASH)).not.toBe(true);
});

test('password not match ERROR', () => {
    expect(validatePasswordConfirm('does not match', PASSWORD_HASH)).not.toBe(true);
});