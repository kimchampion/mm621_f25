
class EmojiButton {
  // (center x, center y, fontSize, regionName, avgScore, regionIdx)
  constructor(cx, cy, fontSize, regName, avgScore, regionIdx) {
    this._cx = cx;
    this._cy = cy;
    this._fs = fontSize;
    this._regName = regName;
    this._avgScore = avgScore;
    this._regionIdx = regionIdx;
    this._emoji = getEmojiForScore(avgScore);
    this._isHover = false;
    this._colorTint = 255; // not applied to emoji text; kept for parity
  }

  rollover(px, py) {
    // approximate bounding box hit-test for the emoji glyph
    textSize(this._fs);
    let halfW = textWidth(this._emoji) * 0.5;
    let halfH = this._fs * 0.6; // rough half-height of glyph
    let left = this._cx - halfW;
    let right = this._cx + halfW;
    let top = this._cy - halfH;
    let bottom = this._cy + halfH;

    if (px >= left && 
        px <= right && 
        py >= top && 
        py <= bottom) {
      this._isHover = true;
      this._colorTint = 220;
    } else {
      this._isHover = false;
      this._colorTint = 255;
    }
  }

  show() {
    // draw the emoji centered at (cx, cy)
    push();
    textAlign(CENTER, CENTER);
    textSize(this._fs);
    // (optional) subtle highlight circle on hover for affordance

    if (this._isHover) {
      noStroke();
      fill(60, 60, 60, 140);
      let r = this._fs * 0.9;
      ellipse(this._cx, this._cy, r * 1.6, r * 1.6);
    }
  
    fill(255); // emoji is colored by font, fill doesn't recolor emoji glyphs in most browsers, but keep for text
    text(this._emoji, this._cx, this._cy);
    pop();
  }

  showPopup(mx, my) {
    // Build lines: title + country/rank list
    let lines = [];

    lines.push(this._regName + " (Avg " + this._avgScore.toFixed(2) + ")");
    lines.push("_______________________________");
    lines.push(" Rank  Country");
    lines.push("_______________________________");
    let idx = this._regionIdx;
    let maxLines = min(countries[idx].length, 12);

    for (let j = 0; j < maxLines; j++) {
      lines.push(rankings[idx][j]+"         "+countries[idx][j] );
    }
    if (countries[idx].length > maxLines) {
      lines.push("... +" + (countries[idx].length - maxLines) + " more");
    }

    // measure and place
    let pad = 10;
    let lineH = 18;
    let w = 0;

    textSize(12);

    for (let k = 0; k < lines.length; k++) {
      let tw = textWidth(lines[k]);
      if (tw > w) w = tw;
    }
    let boxW = w + pad * 2;
    let boxH = lines.length * lineH + pad * 2;

    // try above; if no room, put below; clamp to canvas
    let bx = this._cx + this._fs * 0.8;
    let by = this._cy - boxH - 10;
    if (bx + boxW > width) bx = width - boxW - 6;
    if (bx < 0) bx = 6;
    if (by < 0) by = this._cy + this._fs + 10;
    if (by + boxH > height) by = height - boxH - 6;

    // draw panel
    push();
    noStroke();

    if (this._regName === "Latin America and Caribbean") {
      fill(48, 76, 153);
    } else if (this._regName === "North America") {
      fill(87, 139, 255);     
    } else if (this._regName == "Western Europe") {
      fill(52, 127, 147);  
    } else if (this._regName == "Australia and New Zealand") {
      fill(118, 101, 239);  
    } else if (this._regName == "Sub-Saharan Africa") {
      fill(215, 128, 255);
    } else if (this._regName == "Middle East and Northern Africa") {
      fill(180, 60, 227);
    } else if (this._regName == "Central and Eastern Europe") {
      fill(43, 150, 216);
    } else if (this._regName == "Eastern Asia") {
      fill(119, 34, 152);
    } else if (this._regName == "Southeastern Asia") {
      fill(112, 214, 251);
    } else if (this._regName == "Southern Asia") {
      fill(69, 58, 170);
    } else {
      fill(255, 221, 101);
    }

    rect(bx, by, boxW, boxH, 6);
 
    if (this._regName === "Latin America and Caribbean" ||
        this._regName === "North America" ||
        this._regName === "Western Europe" ||
        this._regName === "Middle East and Northern Africa" ||
        this._regName === "Central and Eastern Europe" ||
        this._regName === "Australia and New Zealand" ||
        this._regName == "Southern Asia" ||
        this._regName == "Eastern Asia" 
    ) {
        fill(255);   
    } else {
        fill(0);
    }

    for (let k = 0; k < lines.length; k++) {
      let ty = by + pad + lineH * (k + 0.8);
      text(lines[k], bx + pad, ty);
    }

    pop();
  }
}