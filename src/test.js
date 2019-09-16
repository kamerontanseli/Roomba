const assert = require('assert');
const { getInputCommands, generateGrid, simulateInstructions } = require('./simulation');

const COLLECT_ALL_DIRT = `
5 5
2 2
3 2
4 1
1 1
EENWWWSE
`.trim();

const COLLECT_ALL_DIRT_BIG_GRID = `
10 10
4 4
6 4
8 2
2 2
EEEENNWWWWWWSSEE
`.trim();

const COLLECT_ONE_DIRT = `
5 5
1 2
1 0
2 2
2 3
NNESEESWNWW
`.trim();

const MOVE_NOWHERE = `
5 5
0 5
1 0
2 2
2 3
SSSSSSSSSSS
`.trim();

function testThatItCollectsAllTheDirt () {
	console.log('Test: Collects all the dirt');
	
	try {
		const commands = getInputCommands(COLLECT_ALL_DIRT);
		const grid = generateGrid(commands);
		const collected = simulateInstructions({ grid, ...commands });
		assert.strictEqual(collected, 3);
		console.log('PASSED: Collects all the dirt');
	} catch (error) {
		console.error(error);
		console.log('FAILED: Collects all the dirt');
	}
}

function testThatItCollectsAllTheDirtInABigGrid () {
	console.log('Test: Collects all the dirt in a big grid');
	
	try {
		const commands = getInputCommands(COLLECT_ALL_DIRT_BIG_GRID);
		const grid = generateGrid(commands);
		const collected = simulateInstructions({ grid, ...commands });
		assert.strictEqual(collected, 3);
		console.log('PASSED: Collects all the dirt in a big grid');
	} catch (error) {
		console.error(error);
		console.log('FAILED: Collects all the dirt in a big grid');
	}
}


function testThatItCollectsOneDirt () {
	console.log('Test: Collects one dirt');
	
	try {
		const commands = getInputCommands(COLLECT_ONE_DIRT);
		const grid = generateGrid(commands);
		const collected = simulateInstructions({ grid, ...commands });
		assert.strictEqual(collected, 1);
		console.log('PASSED: Collects one dirt');
	} catch (error) {
		console.error(error);
		console.log('FAILED: Collects one dirt');
	}
}

function testThatItCollectsNoDirt () {
	console.log('Test: Collects no dirt');
	
	try {
		const commands = getInputCommands(MOVE_NOWHERE);
		const grid = generateGrid(commands);
		const collected = simulateInstructions({ grid, ...commands });
		assert.strictEqual(collected, 0);
		console.log('PASSED: Collects no dirt');
	} catch (error) {
		console.error(error);
		console.log('FAILED: Collects no dirt');
	}
}


testThatItCollectsAllTheDirt();
testThatItCollectsAllTheDirtInABigGrid();
testThatItCollectsOneDirt();
testThatItCollectsNoDirt();