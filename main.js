
const LEFT_MOUSE_BUTTON = 1;
const RIGHT_MOUSE_BUTTON = 2;

const MAX_GRIDSIZE = 100;
var currentGridSize = 16;
var paintCellEnabled = false;

function createStyleSheet() {
	styleSheet = document.createElement("style");
	styleSheet.type = 'text/css';
	styleSheet.innerText = "\
		.content { display: flex; flex-direction: column; align-items: center; gap:20px;}\
		div.cell:hover { background: yellow; }\
		";
	document.head.appendChild(styleSheet);
}

function resetGrid() {
	gridSize = promptForGridSize();
	if (gridSize == null) return; // 'Cancel' was pressed
	removeGridNode();
	drawGrid(gridSize);
	currentGridSize = gridSize;
}

function promptForGridSize() {
	let gridSize = -1;
	
	while ( ! Number.isInteger(gridSize) || gridSize <= 0 || gridSize > MAX_GRIDSIZE) {
		gridSize = prompt("Please enter Grid size A (AxA), MAX VALUE = " + MAX_GRIDSIZE + " : ", currentGridSize);
		if (gridSize == null) { return null; } // 'Cancel' was pressed
		else { gridSize = parseInt(gridSize); }
	}
	return gridSize;
}

function removeGridNode() {
	let grid = document.getElementById("grid");
	grid.parentNode.removeChild(grid);
}

function drawGrid(gridSize) {
	let row = null;
	let cell = null;

	let contentElement = document.getElementsByClassName("content")[0];

	let grid = document.createElement("div");
	grid.id = "grid";
	grid.className = "grid";
	grid.draggable = false;

	grid.style += "\
	display: flex;\
	flex-direction: column;\
	align.items: center;\
	justify-content: center;\
	width: 6000px;\
	height: 6000px;\
	"

	for (let i = 1; i <= gridSize; i++) {

	row = document.createElement("div");
	row.id = "row" + i;
	row.className = "row";
	row.draggable = false;
	row.style = "\
		display: flex;\
		flex-direction: horizontal;\
		align.items: center;\
		justify-content: center;\
		"

	for (let j = 1; j <= gridSize; j++) {
		cell = document.createElement("div");
		cell.id = "cell" + i + "." + j;
		cell.className = "cell";
		cell.draggable = false;
		cell.style = "\
			justify-content: center;\
			border:1px solid black;\
			width: 60px;\
			height: 60px;\
			"
		row.appendChild(cell);
		cell.addEventListener("mouseover", paintCell);
		//cell.addEventListener("mousedown", e => {e.preventDefault()}); // Disable drag event when left-clicking
		cell.addEventListener("mousedown", enablePaintCell);
		cell.addEventListener("mouseup", disablePaintCell);
		cell.addEventListener("contextmenu", e => {e.preventDefault()}); // Disable context menu on right click
	}

	grid.appendChild(row);
	}

	contentElement.appendChild(grid);
	createStyleSheet();
}

function paintCell(event) {
	if (paintCellEnabled) {
		console.log("event: " + event);
		console.log("event.buttons: " + event.buttons);
		console.log("event.target.id: " + event.target.id);
		//console.log("event.target.style.backgroundColor [BEFORE]: " + event.target.style.backgroundColor);
		if (event.buttons == LEFT_MOUSE_BUTTON) {
			event.target.style.backgroundColor = "gray"; // paint current Cell
		} else if (event.buttons == RIGHT_MOUSE_BUTTON) {
			event.target.style.backgroundColor = "white"; // clear current Cell
		}
		//console.log("event.target.style.backgroundColor [AFTER]: " + event.target.style.backgroundColor);
	}
	event.stopPropagation();
}

function enablePaintCell(event) {
	event.preventDefault(); // Disable drag event when left-clicking
	paintCellEnabled = true;
	paintCell(event);
	event.stopPropagation();
}

function disablePaintCell(event) {
	paintCellEnabled = false;
	event.stopPropagation();
}

// Main

// Reset button Event listener
let buttonElem = document.getElementById("resetButton");
buttonElem.addEventListener("click", resetGrid);

drawGrid(currentGridSize);


