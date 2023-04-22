let handpose;
let video;
let predictions = [];

let rectX = 0;
let rectY = 0;
let rectSize = 100;
let rectOpacity = 255;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();

  handpose = createHandPose();
  handpose.initialize();
}

function draw() {
  // Get predictions from handpose
  handpose.update(video);
  predictions = handpose.getPredictions();

  // Move the rectangle based on hand position
  if (predictions.length > 0) {
    rectX = map(predictions[0].landmarks[1][0], 0, width, 0, width - rectSize);
    rectY = map(predictions[0].landmarks[1][1], 0, height, 0, height - rectSize);
    rectOpacity = map(dist(predictions[0].landmarks[1][0], predictions[0].landmarks[1][1], rectX + rectSize/2, rectY + rectSize/2), 0, 200, 255, 50);
  }

  // Draw the rectangle
  background(200);
  fill(255, rectOpacity);
  rect(rectX, rectY, rectSize, rectSize);
}
