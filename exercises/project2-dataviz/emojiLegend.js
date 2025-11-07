/**
 * This code provided by ChatGPT 5 based on my main file.
 * slightly modified
 */
// Legend position in BASE space
let LEG_X = 20;
let LEG_Y = 20;


// legend rows: [emoji, label]
let emojiLegend = [
  ["❤️", "9.0 – 10.0 (Happiest)"],
  ["😁", "8.0 – 8.9"],
  ["🥰", "7.0 – 7.9"],
  ["🙂", "6.0 – 6.9"],
  ["🫠", "5.0 – 5.9"],
  ["🥴", "4.0 – 4.9"],
  ["🥺", "3.0 – 3.9"],
  ["🫣", "2.0 – 2.9"],
  ["😢", "1.0 – 1.9"],
  ["😭", "0.0 – 0.9 (Saddest)"]
];

// draws a semi-transparent legend in BASE space
function drawEmojiLegend(x, y) {
  // base sizes (will scale visually with the canvas)
  let pad = 12;
  let rowH = 22;
  let labelSize = 14;   // text size for labels
  let emojiSize = 18;   // text size for emojis
  let gap = 8;          // space between emoji and label

  // measure max label width
  let maxW = 0;
  textSize(labelSize);
  for (let i = 0; i < emojiLegend.length; i++) {
    let tw = textWidth(emojiLegend[i][1]);
    if (tw > maxW) maxW = tw;
  }

  // measure emoji width (they vary slightly; take a safe max)
  textSize(emojiSize);
  let eW = textWidth("😄");

  let boxW = pad + eW + gap + maxW + pad;
  let boxH = pad + emojiLegend.length * rowH + pad;

  // background panel: translucent, so it doesn't obscure the map
  noStroke();
  fill(0, 0, 0, 110); // dark glass
  rect(x, y, boxW, boxH, 8);

  // rows
  for (let i = 0; i < emojiLegend.length; i++) {
    let rowY = y + pad + i * rowH + rowH * 0.5;

    // emoji
    textAlign(LEFT, CENTER);
    textSize(emojiSize);
    fill(255);
    text(emojiLegend[i][0], x + pad, rowY);

    // label
    textSize(labelSize);
    fill(255, 220);
    text(emojiLegend[i][1], x + pad + eW + gap, rowY);
  }
}
