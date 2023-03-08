// let fr = 50;

// var slider = document.getElementById("myRange");
//       var output = document.getElementById("myRange");
//       output.innerHTML = slider.value; // Display the default slider value
     
//       // Update the current slider value (each time you drag the slider handle)
//       slider.oninput = function () {
//         output.innerHTML = this.value;
//         fr = parseInt(slider.value);
//         // console.log(fr)
//       };
let randomInit = false;
let fr = 5;
let framerateSlider = document.querySelector("#game-speed")
let framerateDisplay = document.querySelector("#game-speed-display")
framerateDisplay.innerHTML = `Framerate: ${fr} fps`

framerateSlider.value = 5
framerateSlider.addEventListener('click', function() {
  fr = parseInt(framerateSlider.value);
  framerateDisplay.innerHTML = `Framerate: ${fr} fps`
  // console.log(framerateDisplay.innerHTML)
});

let pauseToggle = document.querySelector("#pause-game")
pauseToggle.addEventListener('click', function() {
  if (pauseToggle.classList.contains('active')) {
    loop();
    pauseToggle.classList.remove('active')
    pauseToggle.classList.add('inactive')
    pauseToggle.innerHTML = "STOP"
  } else if (pauseToggle.classList.contains('inactive')) {
    noLoop();
    pauseToggle.classList.remove('inactive')
    pauseToggle.classList.add('active')
    pauseToggle.innerHTML = "START"
  }
})


let colorToggle = document.querySelector("#color-toggle")
colorToggle.addEventListener('click', function() {
  if (colorToggle.classList.contains('active')) {
    colorToggle.classList.remove('active')
  } else {
  colorToggle.classList.add('active')
  }
})

let randomToggle = document.querySelector("#random-init")
randomToggle.addEventListener('click', function() {
  randomInit = true;
  init();
  randomInit = false;
})
// console.log(framerateSlider.value)


// let slider;

      

const unitLength = 20;
const boxColor = 50;
let boxBgColor = 250;
const strokeColor = 50;
let columns; /* To be determined by window width */
let rows; /* To be determined by window height */
let currentBoard;
let nextBoard;

function setup() {
    
  setupGrid();

  // Now both currentBoard and nextBoard are array of array of undefined values.
  init(); // Set the initial values of the currentBoard and nextBoard
}

function setupGrid() {
    /* Set the canvas to be under the element #canvas*/
    const canvas = createCanvas(windowWidth, windowHeight - 100);
    canvas.parent(document.querySelector("#main-canvas"));
  
  
    // const controlCanvas = createCanvas(100, 100);
      // slider = createSlider(1, 100, 100);
      // slider.parent(canvas)
      // slider.position(100, 100);
      // slider.style('width', '80px');
  
    /*Calculate the number of columns and rows */
    columns = floor(width / unitLength);
    rows = floor(height / unitLength);
  
    /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
      currentBoard[i] = [];
      nextBoard[i] = [];
    }
}



/**
 * Initialize/reset the board state
 */
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (randomInit == true) {
      currentBoard[i][j] = random() > 0.9 ? 1 : 0; // one line if
      nextBoard[i][j] = 0;
      } else {
      currentBoard[i][j] = 0;
      nextBoard[i][j] = 0;
      }
    }
  }
}

function draw() {
  frameRate(fr);
  // console.log(fr)
  // console.log(fr)

  // let val = slider.value();
  // console.log(val)

  // if (pauseToggle.classList.contains('active')) {
  //   noLoop();
  // } else {
  //   loop();
  // }

  // let insertRandomColor = Math.floor(Math.random() * 255)
  // let c = color(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));

  background(boxBgColor);
  generate();
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (currentBoard[i][j] == 1) {
        let boxColor = 150
        if (colorToggle.classList.contains('active')) {
          // console.log(colorToggle)
          boxColor = color(Math.floor(Math.random() * 50 + 170), Math.floor(Math.random() * 50 + 170), 230);
          // colorToggle.innerHTML = `<span style="color:rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})">COLOR</span>`
        } else {
          boxColor = 150
          // colorToggle.innerHTML = `<span>COLOR</span>`
        }
         //
          
         //
        fill(boxColor)
      
      } else {
        fill(boxBgColor);
      }
      stroke(strokeColor);
      rect(i * unitLength, j * unitLength, unitLength, unitLength);
    }
  }
}

let lonelinessDie = 2;
let overpopulationDie = 3;
let reproduction = 3;

let lonelinessDieRange = document.querySelector('#die-of-loneliness')
let lonelinessDieRangeDisplay = document.querySelector('#die-of-loneliness-display')
lonelinessDieRangeDisplay.innerHTML = `Die of Loneliness: ${lonelinessDieRange.value}`
lonelinessDieRange.addEventListener('change', function() {
  lonelinessDie = lonelinessDieRange.value
  lonelinessDieRangeDisplay.innerHTML = `Die of Loneliness: ${lonelinessDieRange.value}`
})

let overpopulationDieRange = document.querySelector('#die-of-overpopulation')
let overpopulationDieRangeDisplay = document.querySelector('#die-of-overpopulation-display')
overpopulationDieRangeDisplay.innerHTML = `Die of Overpopulation: ${overpopulationDieRange.value}`
overpopulationDieRange.addEventListener('change', function() {
  overpopulationDie = overpopulationDieRange.value
  overpopulationDieRangeDisplay.innerHTML =  `Die of Overpopulation: ${overpopulationDieRange.value}`
})

let reproductionRange = document.querySelector('#reproduction-new')
let reproductionRangeDisplay = document.querySelector('#reproduction-new-display')
reproductionRangeDisplay.innerHTML = `New life due to Reproduction: ${reproductionRange.value}`
reproductionRange.addEventListener('change', function() {
  reproduction = reproductionRange.value
  reproductionRangeDisplay.innerHTML = `New life due to Reproduction: ${reproductionRange.value}`
})

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
            neighbors +=
              currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
          }
        }
  
        // Rules of Life
        if (currentBoard[x][y] == 1 && neighbors < lonelinessDie) {
          // Die of Loneliness
          nextBoard[x][y] = 0;
        } else if (currentBoard[x][y] == 1 && neighbors > overpopulationDie) {
          // Die of Overpopulation
          nextBoard[x][y] = 0;
        } else if (currentBoard[x][y] == 0 && neighbors == reproduction) {
          // New life due to Reproduction
          nextBoard[x][y] = 1;
        } else {
          // Stasis
          nextBoard[x][y] = currentBoard[x][y];
          if (currentBoard[x][y] == 1) {
          console.log(currentBoard[x][y])
          }
          // i=x;
          // j=y;
          // fill(boxColor)
        }
      }
    }
    
    // Swap the nextBoard to be the current Board
    [currentBoard, nextBoard] = [nextBoard, currentBoard];
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
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    currentBoard[x][y] = 1;
    fill(boxColor);
    stroke(strokeColor);
    rect(x * unitLength, y * unitLength, unitLength, unitLength);
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
    loop();
  }


  document.querySelector("#reset-game").addEventListener("click", function () {
    init();
  });



  // function windowResized() {
  //   resizeCanvas(windowWidth, windowHeight, [true]);
  //   setupGrid();
  // }