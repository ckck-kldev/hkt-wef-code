const unitLength = 20;
const boxColor = (67, 203, 255, 50);
const strokeColor = (0,0,0,0);
let columns; /* To be determined by window width */
let rows; /* To be determined by window height */
let board;


let lonelinessValue = 2;
let overpopulationValue = 3;
let repopulationValue = 3;

// Keyboard position
let kbPos = {
  prev: {x: 0, y: 0},
  curr: {x: 0, y: 0},
}
let keyPosX = 0;
let keyPosY = 0;
let randomStatus = false;
let patternMode = '1';
let frameRateValue = 30;

let stopButton = document.querySelector('#stop-game');
stopButton.addEventListener('click', function() {
  if (stopButton.classList.contains('active')) {
    // If the button has the 'active' class, remove it and add the 'inactive' class
    stopButton.classList.remove('active');
    stopButton.classList.add('inactive');
    stopButton.innerHTML = '<i class="fa fa-play" aria-hidden="true"><div class="icon-text">Start</div></i>';
  } else if (stopButton.classList.contains('inactive')) {
    // If the button has the 'inactive' class, remove it and add the 'active' class
    stopButton.classList.remove('inactive');
    stopButton.classList.add('active');
    stopButton.innerHTML = '<i class="fa fa-stop" aria-hidden="true"><div class="icon-text">Stop</div></i>';
  }
});


let gridButton = document.querySelector('#grid-display');
gridButton.addEventListener('click', function() {
  if (gridButton.classList.contains('active')) {
    // console.log("active-->inactive");
    gridButton.classList.remove('active');
    gridButton.classList.add('inactive');
  } else if (gridButton.classList.contains('inactive')) {
    // console.log("inactive-->active");
    gridButton.classList.remove('inactive');
    gridButton.classList.add('active');
  }
});

let resetButton;
let randomButton;
let kbCtrlButton;
let patternButton;

let speedSlider;
let lonelinessSlider;
let overpopulationSlider;
let repopulationSlider;

let patternSelector;
let patternArray = [];

let patternText0 = `
.
O
.
`.trim()

let patternText1 = `
.......
.O....OO
.O.....O
O..OO.O.
........
O.O..OOO
OO......
.......
`.trim()

let patternText2 = `
...............................................
.O.............................................
..O............................................
OOO............................................
...............................................
...............................................
...............................................
...............................................
...............................................
...............O...............................
...............OOOO............................
................OOOO..........OO...............
.....OO.........O..O.........O.O...............
.....OO.........OOOO........OOO........OO......
...............OOOO........OOO.........OO......
...............O............OOO................
.............................O.O...............
..............................OO...............
...............................................
...............................................
...............................................
...............................................
...............................................
...............................................
.............................................OO
............................................OO.
..............................................O
...............................................
`.trim()

let patternText3 = `
...
.O
..O
OOO
...
`.trim()


let patternText4 = `
....
..............OOO.OOO
.............O..O.O..O
............O...O.O...O
.......OOO.O..O.O.O.O..O.OOO
......O..O.O....O.O....O.O..O
.....O...O.O.O.O...O.O.O.O...O
.....O.......................O
.......O...................O
....O.O.....................O.O
...OO.O.OOO.............OOO.O.OO
..O.O.O...O.............O...O.O.O
.OO.O.........................O.OO
O...O.....OO...........OO.....O...O
....
OO.OO.........................OO.OO
....
`.trim()

let patternTextCus = ``.trim()

let patternTextRle = ``



function inputControl() {

  document.querySelector("#reset-game").addEventListener('click', function() {
    initBoard();
  })

  document.querySelector("#random-button").addEventListener('click', function() {
    toggleRandom();
  })

  let speedSlider = document.querySelector("#speed-slider");
  speedSlider.addEventListener("input", (event) => {
    frameRateValue = parseInt(event.target.value);
    console.log(event.target.value);
    document.querySelector("#speed-slider-display").innerHTML = `FPS: ${frameRateValue}`
  })

  let lonelinessSlider = document.querySelector("#loneliness-slider");
  lonelinessSlider.addEventListener("input", (event) => {
    lonelinessValue = parseInt(event.target.value);
    console.log(event.target.value);
    document.querySelector("#loneliness-slider-display").innerHTML = `Die of Loneliness: ${lonelinessValue}`
  })

  let overpopulationSlider = document.querySelector("#overpopulation-slider");
  overpopulationSlider.addEventListener("input", (event) => {
    overpopulationValue = parseInt(event.target.value);
    console.log(event.target.value);
    document.querySelector("#overpopulation-slider-display").innerHTML = `Die of Overpopulation: ${overpopulationValue}`
  })

  let repopulationSlider = document.querySelector("#repopulation-slider");
  repopulationSlider.addEventListener("input", (event) => {
    repopulationValue = parseInt(event.target.value);
    console.log(event.target.value);
    document.querySelector("#repopulation-slider-display").innerHTML = `Repopulation: ${repopulationValue}`
  })


  
  patternSelector = createSelect();
  patternSelector.position(20, 100);
  patternSelector.size(70,30);
  patternSelector.style("font-family", "Bodoni");
  patternSelector.style("font-size", "10px");
  patternSelector.option('One Pixel', '0');
  patternSelector.option('Sample 1', '1');
  patternSelector.option('Gosper Glider Gun', '2');
  patternSelector.option('Glider', '3');
  patternSelector.option('Lightweight Train', '4');
  patternSelector.option('Customize - Text Code', 'text');
  patternSelector.option('Customize - RLE', 'rle');
  patternSelector.selected('One Pixel');
  patternSelector.changed(changeMousePattern);
}

function toggleRandom() {
  randomStatus = true;
  initBoard(); 
  randomStatus = false;
}

function changeMousePattern() {

  patternMode = patternSelector.value();
  
  let textInput = `
  .
  O
  .
  `.trim()
  console.log(patternMode)

  switch (patternMode) {
    case '0':
      textInput = patternText0;
      break;
    case '1':
      textInput = patternText1;
      break;
    case '2':
      textInput = patternText2;
      break;
    case '3':
      textInput = patternText3;
      break;
    case '4':
      textInput = patternText4;
      break;  
    }

  patternArray = textInput.split("\n")
    .flatMap((line,y)=> 
      line.split("").map((char,x)=>({x,y,alive: char== "O"})))
}


function setup() {

  /* Set the canvas to be under the element #canvas*/
  const gameCanvas = createCanvas(windowWidth, windowHeight);
  gameCanvas.parent(document.querySelector("#game-canvas"));

  /*Calculate the number of columns and rows */
  columns = floor(width / unitLength);
  rows = floor(height / unitLength);

  /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
  board = [];
  for (let i = 0; i < columns; i++) {
    board[i] = [];
  }

  kbPos.curr.y = Math.floor(rows / 2);
  kbPos.curr.x = Math.floor(columns / 2);
  
  // Now both currentBoard and nextBoard are array of array of undefined values.

  initBoard(); // Set the initial values of the currentBoard and nextBoard

  inputControl();
  windowResized();
}

/**
 * Initialize/reset the board state
 */

function initBoard() {
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      if (randomStatus == true) {
      board[x][y] = {
        alive: random() > 0.8 ? true : false,
        nextAlive: false,
        neighbors: 0,
        age: 0,
      }} else {
        board[x][y] = {
          alive: false,
          nextAlive: false,
          neighbors: 0,
          age: 0,
      }
    };
    }
  }
}

function draw() {
  frameRate(frameRateValue);
  // draw logic here
  background(color(167, 199, 231));
  clear();
  generate();
  bgBroader();
}


function bgBroader() {
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      let cell = board[x][y];
      if (cell.alive) {
        let r = 67 + (Math.floor(x / columns) * 84);
        let g = 8 + Math.floor((y / rows) * 195);
        let b = 204 + Math.floor(Math.random() * 51);
        let a = Math.floor(cell.age * 15);
        fill([r, g, b, a]);
      } else {
        fill([0, 0, 0, 0]);
      }
      if (gridButton.classList.contains('active')) {
        // console.log("grid contain active");
        strokeWeight(1);
      } else if (gridButton.classList.contains('inactive')) {
        strokeWeight(0);
        // console.log("grid contain inactive");
      }
      rect(x * unitLength, y * unitLength, unitLength, unitLength, Math.floor(unitLength/3));
    }
  }
}

function generate() {
  //Loop over every single box on the board
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      // Count all living members in the Moore neighborhood(8 boxes surrounding)
      let neighbors = 0;

      for (let i of [-1, 0, 1]) {
        for (let j of [-1, 0, 1]) {
          if (i == 0 && j == 0) {
            // the cell itself is not its own neighbor
            continue;
          }

          // The modulo operator is crucial for wrapping on the edge
          let peerX = (x + i + columns) % columns;
          let peerY = (y + j + rows) % rows;
          if (board[peerX][peerY].alive) {
            neighbors++;
          }
        }
      }
      let cell = board[x][y];
      cell.neighbors = neighbors;

      // Rules of Life
      if (cell.alive && neighbors < lonelinessValue) {
        // Die of Loneliness
        cell.nextAlive = false;
      } else if (cell.alive && neighbors > overpopulationValue) {
        // Die of Overpopulation
        cell.nextAlive = false;
      } else if (!cell.alive && neighbors == repopulationValue) {
        // New life due to Reproduction
        cell.nextAlive = true;
        cell.age = 1;
      } else {
        // Stasis
        cell.nextAlive = cell.alive;
        if (cell.age <= 10) {
          cell.age++;
        }
      }
    }
  }

  // Swap the nextBoard to be the current Board
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      let cell = board[x][y];
      cell.alive = cell.nextAlive;
    }
  }
}

/**
 * When mouse is dragged
 */
function mouseDragged() {
  /**
   * If the mouse coordinate is outside the board
   */
  if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
    return;
  }

  const refX = Math.floor(mouseX / unitLength);
  const refY = Math.floor(mouseY / unitLength);

  if (patternMode == '1') {
    board[refX][refY].alive = true;
    fill(67, 203, 255, 50);
    stroke(0,0,0,0);
    rect(refX * unitLength, refY * unitLength, unitLength, unitLength, Math.floor(unitLength/3));
    console.log('mode 1')
  } else {
    patternArray.forEach(cell => {
      // console.log("x:",refX + cell.x);
    placeLife(refX + cell.x, refY + cell.y, cell.alive)
    })
    console.log('mode 2');
  }
}


function placeLife(x, y, alive) {
  board[x][y].alive = alive
  if (alive) {
    fill(67, 203, 255, 50)
  } else {
    noFill()
  }
  stroke(strokeColor)
  rect(x * unitLength, y * unitLength, unitLength, unitLength, Math.floor(unitLength/3))
}

/**
 * When mouse is pressed
 */
function mousePressed() {
  noLoop();
  mouseDragged();
}

/**
 * When mouse is released
 */
function mouseReleased() {

  if (stopButton.classList.contains('inactive')) {
  loop();}
}

function keyPressed() {
  //default kb location
  clear();
  let selectorColor = color(0,0,0,0)
  let selectorStrokeColor = color(50) 
  bgBroader();
  kbPos.prev.x = kbPos.curr.x;
  kbPos.prev.y = kbPos.curr.y;
 
  if (keyCode === LEFT_ARROW) {
    if (kbPos.curr.x == 0) {kbPos.curr.x = columns} else {kbPos.curr.x--};
  } else if (keyCode === RIGHT_ARROW) {
    if (kbPos.curr.x == columns) {kbPos.curr.x = 0} else {kbPos.curr.x++};
  } else if (keyCode === UP_ARROW) {
    if (kbPos.curr.y == 0) {keyPosY = rows} else {kbPos.curr.y--};
  } else if (keyCode === DOWN_ARROW) {
    if (kbPos.curr.y == rows) {kbPos.curr.y = 0} else {kbPos.curr.y++};
  }

  fill(selectorColor);
  strokeWeight(1);
  stroke(selectorStrokeColor);
  rect(kbPos.curr.x * unitLength, kbPos.curr.y * unitLength, unitLength, unitLength);
  strokeWeight(0);
  
  if (keyCode === 67) {
  board[kbPos.curr.x][kbPos.curr.y].alive = true;
  fill(boxColor);
  stroke(strokeColor);
  rect(kbPos.curr.x * unitLength, kbPos.curr.y * unitLength, unitLength, unitLength);
  }
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  inputControl();
  bgBroader();
}