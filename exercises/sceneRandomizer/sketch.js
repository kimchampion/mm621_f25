
/** 
 * Program: My funny face
 *  Assignement: Project 1: Interactive Randomizer
 *  Developer: Kim Champion
 *  Date: September 9, 2025
 */

let faceFull;

// Array sizes
let eyes  = 7;
let mouth = 7;
let nose  = 5;

// Arrays to store images for display
let eyesArray  = [];
 let noseArray = [];
 let mouthArray = [];

// Coordinates for help text display
 let x = 25;
 let y= 200;


function setup() {

  // width , height
  createCanvas(775, 600);

  background(220);

  // Display my face.
  image(faceFull,300, 0,473,600 );

  describe('An image of my face.');

  // text(string, x, y);
  textSize(24);
  text("My funny face",x,200);

  textSize(16);
  text("Use the arrow keys to \nchange my expression\nand click your mouse\nto reset it.",x,y+40);

  textSize(14);
  text("eyes             ↑  up arrow",x,y+140);
  text("mouth          ↓  down arrow",x,y+160);
  text("nose            →  right arrow",x,y+180);
  //text("background ←  left arrow",x,y+200);

}

function draw() {

//up arrow to randomly change my eyes
  if(keyIsDown(UP_ARROW)) {

    //eyes image(img, x, y, width, height)
    image(eyesArray[int(random(0,eyesArray.length))],432, 185,210,88 );
  }

  //right arrow to randomly change my nose
  if(keyIsDown(RIGHT_ARROW)) {

    //nose image(img, x, y, width, height)
    image(noseArray[int(random(0,noseArray.length))],454, 280,170,70 );
  } 

  //down arrow to randomly change my mouth
  if(keyIsDown(DOWN_ARROW)) {
    //mouthColor=mouthArray[int(random(0,mouthArray.length))]
    image(mouthArray[int(random(0,mouthArray.length))],474, 370,130,54 );
  }

}

//reset my face 
function mousePressed() {
  // Display face image.
   image(faceFull,300, 0,473,600 );
}

// Load images used for my funny face.
function preload() {

  faceFull = loadImage('/assets/faceFull.png');  


  //load eye images
  for (let i = 0; i < eyes; i++) {
    eyesArray[i] = loadImage('/assets/eyes'+i+'.png');
    //console.log('/assets/eyes'+i+'.png');
  }

  //load nose images
  for (let j = 0; j < nose; j++) {
    noseArray[j] = loadImage('/assets/nose'+j+'.png');
    //console.log('/assets/nose'+j+'.png');
  }

    //load mouth images
  for (let k = 0; k < mouth; k++) {
    mouthArray[k] = loadImage('/assets/mouth'+k+'.png');
    //console.log('/assets/mouth'+k+'.png');
  }

}
