let c, ui, start, stop, speed, speedLabel, angle, angleLabel;
let dx, dy;
let g1, g2, g3, gLabel;
let range, tflight, hmax;

let path = [];

let g = 9.8;
let gravity = 1;
let scale = 10;
let running = false;
let drawLine = true;
let width = window.innerWidth;
let height = window.innerHeight;
let uisize = 235;
let ball;
let t = 0;

function preload() {
  back = loadImage("Images/bg.jpg");
  ball = new Ball(0, -2, 70, 0, 0);
}

function setup() {
  c = createCanvas(width, height);
  angleMode(DEGREES);
  UI();
  checkButtons();
  frameRate(60);
}

function setupEnvironment() {
  stroke(0);
  fill(54, 138, 52);
  rect(0, (height * 5) / 6, width, (height * 5) / 6);
}

function UI() {
  speed = createInput();
  speedLabel = createElement("h3", "Speed (m/s):");
  speedLabel.position(10 + uisize / 12, 3);
  speed.class("input");
  speed.position(10 + uisize / 12, 42);
  speed.size((5 / 6) * uisize);
  speed.id("speed");

  angle = createInput();
  angleLabel = createElement("h3", "Angle (\xB0):");
  angleLabel.position(10 + uisize / 12, 90 - 39);
  angle.class("input");
  angle.position(10 + uisize / 12, 90);
  angle.size((5 / 6) * uisize);
  angle.input(checkAngle);
  angle.id("angle");

  gLabel = createElement("h3", "Acceleration (m/s\xB2):");
  gLabel.position(10 + uisize / 12, uisize - 135);

  g1 = createButton("9.8");
  g1.position(10 + uisize / 12, uisize - 94);
  g1.mousePressed(setG1);
  g1.size(45);
  g1.class("button");
  g1.id("g1");

  g2 = createButton("9.81");
  g2.position(85 + uisize / 12, uisize - 94);
  g2.mousePressed(setG2);
  g2.size(45);
  g2.class("button");
  g2.id("g2");

  g3 = createButton("10");
  g3.position(158 + uisize / 12, uisize - 94);
  g3.mousePressed(setG3);
  g3.size(45);
  g3.class("button");
  g3.id("g3");

  start = createButton("Start");
  start.class("button");
  start.position(10 + uisize / 12, uisize - 60);
  start.mousePressed(run);
  start.size((5 / 6) * uisize);

  reset = createButton("Reset");
  reset.class("button");
  reset.position(10 + uisize / 12, uisize - 25);
  reset.mousePressed(quit);
  reset.size((5 / 6) * uisize);
}

function UIbackground() {
  fill(255);
  strokeWeight(4);
  stroke(0);
  rect(10, 10, uisize);
}

function setG1() {
  gravity = 1;
  checkButtons();
  g = 9.8;
}

function setG2() {
  gravity = 2;
  checkButtons();
  g = 9.81;
}

function setG3() {
  gravity = 3;
  checkButtons();
  g = 10;
}
