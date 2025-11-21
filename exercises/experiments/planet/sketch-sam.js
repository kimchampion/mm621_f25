function setup() {
  
  // Create a canvas in WebGL mode
  createCanvas(400, 400, WEBGL);
}

function draw() {
  
  background(220);
  lights();
  rotateX(map(mouseY, 0, height, -PI, PI));
  rotateY(map(mouseX, 0, width, -PI, PI));
  //noStroke();

  stroke(0);
  // Color changes with rotation
  let r = map(sin(frameCount * 0.02), -1, 1, 100, 255);
  let g = map(cos(frameCount * 0.03), -1, 1, 50, 200);
  let b = 150;

  fill(r, g, b);
  sphere(80, 50, 50);
}