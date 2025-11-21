let angle =0;

function setup() {
      // Create a canvas in WebGL mode
      createCanvas(475, 375,WEBGL);
  }

function draw() {
  
  background(175); 
  frameRate(6);

  rectMode(CENTER);
  noStroke();
  fill(0,0,255);
  translate(mouseX - width/2, mouseY - height/2);
  //translate(0,0,mouseX);
  rotateX(angle);
  rotateY(angle * 0.3);
  rotateZ(angle * 1.2 );

  torus(90,20);
  //box(10,100,50);

  angle += 0.07;  
}