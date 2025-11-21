let angle =0;
let banana;
let cam;

function preload() {
    planet = loadImage('assets/planet1.jpg');
}

function setup() {
      // Create a canvas in WebGL mode
      createCanvas(475, 375,WEBGL);
      cam = createCapture(VIDEO);
      cam.size(320,200);
      cam.hide();
  }

function draw() {

    let dx = mouseX - width  / 2;
    let dy = mouseY - height / 2;
    let v = createVector(dx, dy, 0)
    v.div(100);
    //ambientLight(255);
    //directionalLight(255,255,255,v);
    background(16,0,60);

    push();
    //rotateX(angle);
    rotateY(angle * 1.3);
    //rotateZ(angle * 0.7);
    noStroke();

    //texture(cam);
    texture(planet);
    sphere(100);
    pop();

    //translate(0,100);
   // rotateX(HALF_PI);
    ambientMaterial(0);
    //noStroke();
    //plane(500,500);

    angle += 0.03;

}