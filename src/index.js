const fs = require('fs');
const path = require('path');
const { getInputCommands, generateGrid, simulateInstructions } = require('./simulation');

const input = fs.readFileSync(path.join(__dirname, '..', 'input.txt'));
const commands = getInputCommands(input);
const grid = generateGrid(commands);

console.log(commands.hoover.join(' '));
console.log(simulateInstructions({ grid, ...commands }));	