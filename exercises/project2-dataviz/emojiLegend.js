/**
 * This code provided by ChatGPT 5 based on my main file.
 * slightly modified
 */
let LEG_X = 20;
let LEG_Y = 20;

function getLegendRows() {
  // return an array of [p5.Image, label]
  return [
    [happyImg9, "9.0–10.0 (Happiest)"],
    [happyImg8, "8.0–8.9"],
    [happyImg7, "7.0–7.9"],
    [happyImg6, "6.0–6.9"],
    [happyImg5, "5.0–5.9"],
    [happyImg4, "4.0–4.9"],
    [happyImg3, "3.0–3.9"],
    [happyImg2, "2.0–2.9"],
    [happyImg1, "0.0–1.9 (Saddest)"]
  ];
}


// // Legend position in BASE space
// let LEG_X = 20;
// let LEG_Y = 20;


// // legend rows: [emoji, label]
// let emojiLegend = [
//     [happyImg9, "9.0–10.0 (Happiest)"],
//     [happyImg8, "8.0–8.9"],
//     [happyImg7, "7.0–7.9"],
//     [happyImg6, "6.0–6.9"],
//     [happyImg5, "5.0–5.9"],
//     [happyImg4, "4.0–4.9"],
//     [happyImg3, "3.0–3.9"],
//     [happyImg2, "2.0–2.9"],
//     [happyImg1, "0.0–1.9 (Saddest)"]
// ];

// draws a semi-transparent legend in BASE space
// function drawEmojiLegend(x, y) {
//   // base sizes (will scale visually with the canvas)
//   let pad = 12;
//   let rowH = 22;
//   let labelSize = 14;   // text size for labels
//   let emojiSize = 18;   // text size for emojis
//   let gap = 8;          // space between emoji and label

//   // measure max label width
//   let maxW = 0;
//   textSize(labelSize);
//   for (let i = 0; i < emojiLegend.length; i++) {
//     let tw = textWidth(emojiLegend[i][1]);
//     if (tw > maxW) maxW = tw;
//   }

//   // measure emoji width (they vary slightly; take a safe max)
//   textSize(emojiSize);
//   let eW = textWidth("😄");

//   let boxW = pad + eW + gap + maxW + pad;
//   let boxH = pad + emojiLegend.length * rowH + pad;

//   // background panel: translucent, so it doesn't obscure the map
//   noStroke();
//   fill(0, 0, 0, 110); // dark glass
//   rect(x, y, boxW, boxH, 8);

//   // rows
//   for (let i = 0; i < emojiLegend.length; i++) {
//     let rowY = y + pad + i * rowH + rowH * 0.5;

//     // emoji
//     textAlign(LEFT, CENTER);
//     textSize(emojiSize);
//     fill(255);
//     text(emojiLegend[i][0], x + pad, rowY);

//     // label
//     textSize(labelSize);
//     fill(255, 220);
//     text(emojiLegend[i][1], x + pad + eW + gap, rowY);
//   }
// }
function drawEmojiLegend(x, y) {
  let rows = getLegendRows();
  // sizes are in base space; they’ll scale visually with your translate/scale
  let pad = 12;
  let rowH = 24;      // row height
  let iconSize = 18;  // image icon size
  let gap = 10;       // space between icon and text
  let labelSize = 14;

  // measure widest label
  textSize(labelSize);
  let maxW = 0;
  for (let i = 0; i < rows.length; i++) {
    let tw = textWidth(rows[i][1]);
    if (tw > maxW) maxW = tw;
  }

  // panel size
  let boxW = pad + iconSize + gap + maxW + pad;
  let boxH = pad + rows.length * rowH + pad;

  // translucent background so map shows through
  noStroke();
  fill(0, 0, 0, 110);
  rect(x, y, boxW, boxH, 8);

  // draw rows
  imageMode(CENTER);
  textAlign(LEFT, CENTER);
  for (let i = 0; i < rows.length; i++) {
    let rowY = y + pad + i * rowH + rowH * 0.5;

    // icon
    let img = rows[i][0];
    if (img) image(img, x + pad + iconSize * 0.5, rowY, iconSize, iconSize);

    // label
    fill(255);
    textSize(labelSize);
    text(rows[i][1], x + pad + iconSize + gap, rowY);
  }
}

