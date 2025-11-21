let angle =0;

function setup() {
      // Create a canvas in WebGL mode
      createCanvas(475, 375,WEBGL);
  }

function draw() {


  let dx = mouseX - width /2;
  let dy = mouseY - height/2;
  let v = createVector(dx,dy,0);

  directionalLight(255, 255, 0, v);


  //pointLight(255, 0, 0, 200, 0, 0);
  background(175); 
  frameRate(20);

  rotateX(angle);
  rotateY(angle * 0.3);
  rotateZ(angle * 1.2 );
  noStroke(0,0,255);
  ambientLight(0,0,255)
  ambientMaterial(255);
  sphere(100,20);

  angle += 0.07;  
}