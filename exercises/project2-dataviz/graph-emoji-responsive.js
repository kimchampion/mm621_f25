let data;
let worldMap;

// Arrays
let happiness   = [];
let countries   = [];
let rankings    = [];
let country     = [];
let rank        = [];
let regionNames = [];
let avgScores   = [];
let barButtons  = [];

/* a variable that holds, key value pairs  
   of region names to absolute x,y coordinates
   each string (like "Australia and New Zealand") matches 
   how the region appears in the regionNames array.
*/
let regionPos = {
  "Australia and New Zealand":    { x: 908, y: 529 },
  "Western Europe":               { x: 464, y: 159 },
  "North America":                { x: 247, y: 196 },
  "Latin America and Caribbean":  { x: 327, y: 483 },
  "Sub-Saharan Africa":           { x: 560, y: 425 },
  "Middle East and Northern Africa": { x: 592, y: 308 },
  "Central and Eastern Europe":   { x: 672, y: 194 },
  "Eastern Asia":                 { x: 792, y: 290 },
  "Southeastern Asia":            { x: 819, y: 429 },
  "Southern Asia":              { x: 722, y: 349 }
};

// Centering controls
let offsetX = 0;         // computed in setup()

let url_2015 = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ07SZMbiRdmrPknlWygBavRTJUFOHFBjtIKvu0RlQhfAQG04ChKcdCgeUOC8a1Fvzky_wQsuZmwJa6/pub?gid=955253070&single=true&output=csv";
let url_2016 = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRe7KTdz0f9x3ZLCZG_XZDODEncmHJaQkXDwe_e8KX9GsC1-f9a2ETZuD5HufwwO9rUWBImV4MT3i9z/pub?gid=421456057&single=true&output=csv";
let url_2017 = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRr9jdIkveSJt_DMyqthVkLUXptKNKDz5ksfIjNL0pJVjttVqw8tVNr3nc-9DaO9qOTad575bL4RoRF/pub?gid=995302721&single=true&output=csv";
let url_2018 = "https://docs.google.com/spreadsheets/d/e/2PACX-1vStXe5En7crJU_InRgvpa9H2yfCDGtDlD65PbU4r2QWiF90gukel7ARavpUdzxuyiQcay5kk3xPySop/pub?gid=684616749&single=true&output=csv";
let url_2019 = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRwDZ_X-KxciLIt2pct6P_SJEXmYctE-o1zFRpjGFbGjh4tzweXQjcNM4umjIftZFjMClK_YhX9dTxN/pub?gid=1742236585&single=true&output=csv";

let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ07SZMbiRdmrPknlWygBavRTJUFOHFBjtIKvu0RlQhfAQG04ChKcdCgeUOC8a1Fvzky_wQsuZmwJa6/pub?gid=955253070&single=true&output=csv";


let BASE_W = 1024;   // map img width
let BASE_H = 647;    // map img height

let s = 1;           // current scale
let tx = 0;          // translated x value
let ty = 0;          // translate y value

//preload data used in this view
function preload() {

  data2015 = loadTable(url_2015, "csv", "header"); //load data
  data2016 = loadTable(url_2016, "csv", "header"); //load data
  data2017 = loadTable(url_2017, "csv", "header"); //load data
  data2018 = loadTable(url_2018, "csv", "header"); //load data
  data2019 = loadTable(url_2019, "csv", "header"); //load data

  worldMap = loadImage('assets/worldMap.png');  //load map
}

function getEmojiForScore(score) {
  if (score >= 9) return "❤️";
  else if (score >= 8) return "😁";
  else if (score >= 7) return "🥰";
  else if (score >= 6) return "🙂";
  else if (score >= 5) return "🫠";
  else if (score >= 4) return "🫩";
  else if (score >= 3) return "🥺";
  else if (score >= 2) return "🫣";
  else if (score >= 1) return "😢";
  else return "😭";
}

function setup() {

  //create canvas the size of the image, define above
  createCanvas(BASE_W, BASE_H);

  textSize(12);
  textAlign(LEFT, CENTER);

  // compute the horizontal centering offset ONCE
  offsetX = (width - displayWidth) / 2;


  //TODO: grab year parameter from URL, to grab data by year
  let params = getURLParams();
  console.log("params year: " + params.year);

  if (params.year === "2015") {
    data = data2015;
    print("2015 happiness rows:", data2015.getRowCount());

  } else if (params.year === "2016") {
    data = data2016;
    print("2016 happiness rows:", data2016.getRowCount());

  } else if (params.year === "2017") {
    data = data2017;
      print("2017 happiness rows:", data2017.getRowCount());

  } else if (params.year === "2018") {
    data = data2018;
      print("2018 happiness rows:", data2018.getRowCount());

  } else if (params.year === "2019") {
    data = data2019;
    print("2019 happiness rows:", data2019.getRowCount());
  } else {
    data = data2015;
        print("2015 happiness rows:", data2015.getRowCount());
  }


  if (!data) return; //if there is no data then return

  let numRows = data.getRowCount();


  /**
   * Get and format data for display
   */

  // 0: unique region names
  for (let i = 0; i < numRows; i++) {
    let region = data.getString(i, "Region").trim();

    if (!regionNames.includes(region)) {
      regionNames.push(region);
      happiness.push([]);
      countries.push([]);
      rankings.push([]);
    }
  }

  // 1: fill per-region arrays
  for (let i = 0; i < numRows; i++) {
  
    let region  =   data.getString(i, "Region").trim();
    let score   =   data.getNum(i, "Happiness Score");
    let ctry    =   data.getString(i, "Country").trim();
    let rnk     =   data.getNum(i, "Happiness Rank");

    let index = regionNames.indexOf(region);
    if (index !== -1) {
      happiness[index].push(score);
      countries[index].push(ctry);
      rankings[index].push(rnk);
    }
  }

  // 2: flat lists (optional; not used in this view)
  for (let i = 0; i < regionNames.length; i++) {
    for (let j = 0; j < countries[i].length; j++) {
      country.push(countries[i][j]);
      rank.push(rankings[i][j]);
    }
  }

  // 3: averages
  for (let i = 0; i < happiness.length; i++) {
    let scores = happiness[i];
    let total = 0;

    for (let j = 0; j < scores.length; j++) {
      total += scores[j];
    }

    let avg = scores.length ? total / scores.length : 0;
    avgScores.push(avg);
  }

  // 4: sort regions by avg score (highest first)
  for (let i = 0; i < avgScores.length - 1; i++) {
    for (let j = i + 1; j < avgScores.length; j++) {
      if (avgScores[j] > avgScores[i]) {

        // sort and swap averages
        let tempAvg = avgScores[i]; 
        avgScores[i] = avgScores[j]; 
        avgScores[j] = tempAvg;
 
        // sort and swap region names
        let tempRegion = regionNames[i]; 
        regionNames[i] = regionNames[j]; 
        regionNames[j] = tempRegion;

        // sort and swap each of the regions arrays too
        let tempH = happiness[i]; 
        happiness[i] = happiness[j]; 
        happiness[j] = tempH;

        let tempC = countries[i]; 
        countries[i] = countries[j]; 
        countries[j] = tempC;

        let tempK = rankings[i]; 
        rankings[i] = rankings[j]; 
        rankings[j] = tempK;
      }
    }
  }

// build one emoji per region (use explicit (x,y) if provided)
barButtons = [];
  for (let i = 0; i < regionNames.length; i++) {
    let minSize = 10;
    let maxSize = 40;
    let eFontSize = map(avgScores[i], 0, 10, minSize, maxSize);

    //default if responsive doesn't work
    let cx = offsetX + 500;
    let cy = 120 + i * 50;

    // if a manual position exists for this region, use it
    let pos = regionPos[regionNames[i]];
    if (pos) {
      cx = pos.x;
      cy = pos.y;
    }

    let btn = new EmojiButton(cx, cy, eFontSize, regionNames[i], avgScores[i], i);
    barButtons.push(btn);
  }
}

function draw() {
  background(0);

  // Compute transform to fit base into window
  s  = min(width / BASE_W, height / BASE_H);
  tx = (width  - BASE_W * s) / 2;
  ty = (height - BASE_H * s) / 2;

  let mxBase = (mouseX - tx) / s;
  let myBase = (mouseY - ty) / s;


  /**
   * push() Saves the current drawing state (styles and transformations).
   * pop()  Restores the most recently saved state.
   * ensures that any transformations or color changes applied inside those 
   * sections don’t mess up the rest of your drawing
   */
  push();

  translate(tx, ty);
  scale(s);
  // console.log("mouseX: "+ mouseX);
  // console.log("mouseY: "+ mouseY);

   // if the map is loaded then, draw map to the base canvas size
  if (worldMap) {
   image(worldMap, 0, 0, BASE_W, BASE_H);
  }

  // labels per row (left-aligned within the centered block)
  for (let i = 0; i < regionNames.length; i++) {
    let y = 120 + i * 50;
  }

  //draw an emoji Legend (on top of map, semi-transparent)
  // bottom-left of canvas
  LEG_X = 20;  
  LEG_Y = BASE_H - 20 - 260;
  drawEmojiLegend(LEG_X, LEG_Y);

  // draw labels, emojis, etc. using BASE coordinates
  // emojis + popups (rollover uses base-space mouse)
  let hovered = [];
  for (let i = 0; i < barButtons.length; i++) {

    let btn = barButtons[i];
    btn.rollover(mxBase, myBase);  // base-space mouse
    btn.show();                    // draw in base space

    if (btn._isHover) {
      hovered.push(btn);
    }
  }

   // Draw popups last so they’re on top
  for (let i = 0; i < hovered.length; i++) {
    hovered[i].showPopup(mxBase, myBase);
  }

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
