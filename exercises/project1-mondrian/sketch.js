// Coordinates for help text display
 let x = 620;
 let y= 150;
 let mondrianCanvas;
 let pietMondrian;
 let paintBrush;

// primary colors for square
let mColorsArr = ["red", "yellow", "blue"];

// abstract grid setup
let xRectArr = [
0, 0, 0, 0, 100, 100, 100, 100, 150, 150, 200, 250, 250, 250, 250, 250, 250,
300, 300, 300, 300, 350, 350, 350, 350, 400, 400, 400, 400, 400, 450, 450,
450, 500, 500, 500, 500, 550, 200,
];

let yRectArr = [
0, 250, 350, 400, 450, 400, 550, 550, 350, 400, 400, 0, 100, 150, 200, 250,
450, 0, 150, 450, 500, 150, 300, 350, 400, 0, 50, 200, 350, 500, 50, 400, 500,
50, 100, 400, 550, 0, 550,
];

let wRectArr = [
250, 250, 150, 100, 150, 50, 100, 100, 100, 50, 150, 50, 150, 50, 100, 100,
50, 100, 50, 150, 100, 50, 50, 50, 100, 150, 50, 150, 200, 50, 50, 50, 50, 50,
50, 100, 100, 50, 50,
];

let hRectArr = [
250, 100, 50, 200, 100, 50, 50, 50, 50, 50, 50, 100, 50, 50, 50, 150, 150,
100, 50, 50, 100, 150, 50, 50, 50, 50, 150, 150, 50, 100, 150, 100, 100, 50,
100, 150, 50, 350, 50,
];

let fillColors = []; // store each square's color

function setup() {
  mondrianCanvas = createCanvas(800, 800);

  describe('An image piet mondrian');

  /* initialize all squares to white, use the xRectArr to get the count of squares */  
  for (let i = 0; i < xRectArr.length; i++) {
    fillColors[i] = "white";
  }
}

function draw() {
background('black');
strokeWeight(6);

 for (let i = 0; i < xRectArr.length; i++) {
   if (
    mouseX > xRectArr[i] &&
    mouseX < xRectArr[i] + wRectArr[i] &&
    mouseY > yRectArr[i] &&
    mouseY < yRectArr[i] + hRectArr[i]
    ) {
      // custom paintbrush mouse
      cursor('assets/paintbrush.png');
    } else {
      // custom paintbrush mouse
       cursor(ARROW);    
   }
}
 
  // Display image of piet mondrian
  image(pietMondrian,15, 635,75,75 );

  // text(string, x, y);
  textSize(28);
  text("Primary Play",x,y);
  textSize(16);
  text("Click on a square \nto change the color\nCreate your own\nMondrian masterpiece.",x,y+55);
  textSize(14);
  text("Press the [ c ] key to reset\n colors back to white",x,y+160);
  text("Press the [ s ] key to save\na screenshot\n",x,y+210);

  text("Piet Mondrian (1872–1944) was a Dutch painter and key figure in the De Stijl movement, known\nfor his abstract compositions of straight black lines, white space, and blocks of primary colors. \nHe believed that this stripped-down style expressed universal harmony and balance, \ninfluencing modern art, design, and architecture.",110,650);

  textSize(18);
  text("Keep clicking until\nthe colors feel right\nto you, then save\nor clear it and\ndo it again ♡\n",x,y+280);

  // build mondrian squares with stored colors
  for (let i = 0; i < xRectArr.length; i++) {
    fill(fillColors[i]);
    rect(xRectArr[i], yRectArr[i], wRectArr[i], hRectArr[i]);
  }
}

function mousePressed() {
// check which square is clicked
  for (let i = 0; i < xRectArr.length; i++) {
    if (
    mouseX > xRectArr[i] &&
    mouseX < xRectArr[i] + wRectArr[i] &&
    mouseY > yRectArr[i] &&
    mouseY < yRectArr[i] + hRectArr[i]
    ) {
    // assign a new random color to that square
    fillColors[i] = random(mColorsArr);
  
    } 
  }
}

//Press 'c' to clear all colors back to white
function keyPressed() {
  if (key === 'c' || key === 'C') {
    fillColors.fill("white");
  }

  if (key === 's' || key === 'S') {
    saveCanvas(mondrianCanvas, 'mondrian_masterpiece', 'png'); 
  }
}

// Load images used for primary play.
function preload() {
  pietMondrian = loadImage('assets/piet.png');  
  paintBrush = loadImage('assets/paintbrush.png');  
}
