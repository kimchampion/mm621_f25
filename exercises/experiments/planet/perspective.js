let angle =0;
let banana;
let cam;

function preload() {
    banana = loadImage('assets/banana-tree.jpeg');
}

function setup() {
      // Create a canvas in WebGL mode
      createCanvas(600, 600,WEBGL);
    //   cam = createCapture(VIDEO);
    //   cam.size(320,200);
    //   cam.hide();
  }

function draw() {

    // frameRate(8);
    // let dx = mouseX - width  / 2;
    // let dy = mouseY - height / 2;
    // let v = createVector(dx, dy, 0)
    // v.div(100);
    // //ambientLight(255);
    // directionalLight(255,255,255,v);
    background(175);
    //translate(0, 0, mouseX);

    //let camx = map(mouseX,0,width,-200,0)
    // let camx = random(-5,5);
    // let camy = random(-5,5);
    // let camz = random(-5,5);
    // camera(camx, camy, camz + (height/2)/tan(PI/6), camx, camy, camz, 0, 1, 0);
    //camera(x, y, z, centerX, centerY, centerZ, upX, upY, upZ);
    //ortho(-200,200,200,-200,0.01,1000);
    //ortho();
    ambientLight(0,0,255);
    //let fov = PI/3;
    // let fov = map (mouseX, 0, width,0, PI);
    // let cameraZ = (height/2.0) / tan(PI/3/2.0);
    // perspective(fov, width/height, cameraZ/10.0, 2000);
    
    pointLight(0,255,0,0,-200,200);

    for (let x = -200; x < 200; x +=50) {
        push();

        translate(x, 0, x-200);
        rotateX(angle);
        rotateY(angle * 0.3);
        rotateZ(angle * 1.2);
        noStroke();
        ambientMaterial(255);
        box(30);

        pop();
    }

    translate(0,100);
    rotateX(HALF_PI);
    ambientMaterial(0);
    noStroke();
    plane(500,500);

    angle += 0.03;

}