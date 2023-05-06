const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question(
    "What is your first name?",
    (answer) => {
        console.log(`So your name is ${answer}`);
        rl.close();
    }
);
