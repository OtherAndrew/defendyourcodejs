# DefendYourCodeJS

A simple CLI program meant to demonstrate input validation and password salting and hashing, written in JavaScript.

## Description

DefendYourCodeJS defends against:

- Spoofing
  - The user must confirm the password they input previously.
- Tampering
  - Input is validated to defend against:
    - Code injection
    - Integer overflow
- Repudiation
  - User cannot undo an input once submitted.
- Information disclosure
  - User password is stored as a hash.
- Elevation of privilege
  - Program can only read and access files in the directory it's in.

## Getting Started

### Requirements

* [Node.js](https://nodejs.org/en) 18.13.0
* [npm](https://www.npmjs.com) 9.2.0

### Dependencies

* [bcrypt](https://www.npmjs.com/package/bcrypt) 5.1.0
* [inquirer](https://www.npmjs.com/package/inquirer) 9.2.2
* [valid-filename](https://www.npmjs.com/package/valid-filename) 4.0.0
* [jest](https://www.npmjs.com/package/jest) 29.5.0 (only for unit testing)

### Installing

Clone repository and install dependencies. 

```
git clone https://github.com/OtherAndrew/defendyourcodejs
cd defendyourcodejs
npm install
```

### Executing program

```
node index.js
```

### Executing tests

```
npm test
```

## Help

### Error logging

Invalid inputs are logged to `error.log`.

### Shortcomings

Input files must be in the same directory as `index.js`.

## Authors

[Andrew Nguyen](https://github.com/OtherAndrew)

## Acknowledgments

[README-template](https://gist.github.com/DomPizzie/7a5ff55ffa9081f2de27c315f5018afc)
