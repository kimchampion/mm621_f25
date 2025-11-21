
function setup() {
      // Create a canvas in WebGL mode
      createCanvas(400, 400, WEBGL);
  }

function draw() {
  
  background(220); // Light gray background
      
  // Add some basic lighting
  lights();
      
  // Rotate the scene based on mouse position
  rotateX(map(mouseY, 0, height, -PI, PI));
  rotateY(map(mouseX, 0, width, -PI, PI));
      
  // Draw a rotating box
  noStroke(); // No outline for the box
  fill(255, 0, 0); // Red color
  box(80); // Draw a box with side length 80
}