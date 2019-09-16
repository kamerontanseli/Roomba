/*
	Splits plain text dimensions into an array of numbers
	String -> Number[]
*/
function getDimensions(dimensions) {
	return dimensions.split(' ').map(n => Number(n));
}

/*
	Changes the coords to match the new direction
	(String, [Number, Number]) -> [Number, Number]
*/
function moveDirection(direction, [x, y]) {
	switch (direction) {
		case 'N':
			return [x, y - 1];
		case 'E':
			return [x + 1, y];
		case 'S':
			return [x, y + 1];
		case 'W': 
			return [x - 1, y];
		default:
			return [x, y];
	}
}

/*
	Reads text and extracts the commands.
  
	String -> { 
		room: { x: Number, y: Number },
    hoover: [Number, Number],
    dirt: Number[Number[]],
    instructions: String[]
	}
*/
function getInputCommands (commands) {
	const contents = commands.toString().split('\n');
	
	const [roomX, roomY] = getDimensions(contents[0]);
	const hoover = getDimensions(contents[1]);
	const dirt = contents.slice(2, -1).map(getDimensions);
	const instructions = contents.slice(-1)[0].split('');
	
	return {
		room: { x: roomX, y: roomY },
		hoover,
		dirt,
		instructions
	}
}

/*
	Generates a gameboard in which to operate the Roomba from
  
	{ 
		room: { x: Number, y: Number }, 
		hoover: [Number, Number],  
		dirt: Number[Number[]] 
	} -> Number[Number[]]
*/
function generateGrid ({ room, hoover, dirt }) {
	 const grid = [];
	 
	 for (let y = 0; y < room.y; y += 1) {
	 	 grid[y] = [];
		 for (let x = 0; x < room.x; x += 1) {
			 if (hoover[0] === x && hoover[1] === y) {
				 grid[y][x] = 2; // Roomba
			 } else if (dirt.some(d => d[0] === x && d[1] === y)) {
 			 	 grid[y][x] = 1; // Dirt
			 } else {
  			 grid[y][x] = 0; // Empty
			 }
		 }	 	
	 }
	
	 return grid;
}

/*
	Simulates moving a Roomba around the gameboard.
  
	{ 
		grid: Number[Number[]], 
		hoover: [Number, Number],  
		instructions: String[]
	} -> Number
*/
function simulateInstructions ({ grid, hoover, instructions }) {
	const gridCopy = JSON.parse(JSON.stringify(grid));
	let [hooverX, hooverY] = hoover;
	let dirtCollected = 0;
	
	for (const direction of instructions) {	
		let [nextX, nextY] = moveDirection(direction, [hooverX, hooverY]);
		
		const coordsWithinGrid = (
			Array.isArray(gridCopy[nextY]) && 
			nextX < gridCopy[nextY].length && 
			nextX >= 0
		);
		
		if (coordsWithinGrid) {
			if (gridCopy[nextY][nextX] === 1) {
				dirtCollected += 1;
			}
			gridCopy[hooverY][hooverX] = 0;
			gridCopy[nextY][nextX] = 2;
			hooverX = nextX;
			hooverY = nextY;
		}
	}
	
	return dirtCollected;
}

module.exports = {
	getInputCommands,
	generateGrid,
	simulateInstructions
};