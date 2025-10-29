let data;
let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRqvbay5cKJNlFcebJVYr1b_1u0c4FF87vTjELwgmonYUr79Qmd5vnLjLgyGn5evVgOLhnquWpPhWCY/pub?gid=0&single=true&output=csv";

function preload() {
  data = loadTable(url, "csv", "header");
}

function setup() {
  createCanvas(600, 400);
  noLoop(); // draw once, no animation needed
}

function draw() {
  background(0);

  if (data) {
    let numRows = data.getRowCount();
    let carbs = data.getColumn("carbs");
    let names = data.getColumn("food");

    /* carbs is an array of strings, convert to numbers
       map takes the carb array and converts to a number 
       using an arrow function, where
       v is an imput and => means “use input to do this…”
      The part after the arrow float(v) is what it returns.
     **/
    carbs = carbs.map(v => float(v));
   
    // find max number of carbs for scaling the circle
    let maxCarbs = max(carbs);

    //canvas heading
    textAlign(CENTER);
    fill(255);
    textSize(20);
    text("Carbs", width / 2, 60);

    // draw bubbles
    for (let i = 0; i < numRows; i++) {
      let x = map(i, 0, numRows - 1, 100, width - 100);
      let y = height / 2;

      /* take the # of carbs for a specific item, which is between 
         0 & the maxCarb amount and map it to a circle size between 10 and 80
         so if the maxCarb value is 53, then the map command maps 
         0 - 53 to 10 - 80 for the circle size that values is 
      */
      let r = map(carbs[i], 0, maxCarbs, 10, 80); // circle size
      fill("purple");
      //noStroke();
      ellipse(x, y, r, r);

      // position the labels on above (#of carbs) and below (food name) circles
      fill(255);
      textSize(12);
      text(names[i], x, y + r / 2 + 15);
      text(carbs[i], x, y - r / 2 - 5);
    }
  }
}
