function draw() {
  c.background(back);
  UIbackground();
  setupEnvironment();
  translate(width / 4, (height * 5) / 6);
  if (running) {
    ball.move();
    t += 1 / 60;
  }
  ball.show();
  if (ball.y > 0) {
    running = false;
    ball.drawInfo();
  }
}

class Ball {
  constructor(x, y, w, v, a) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.v = v;
    this.a = a;
    this.oldy = this.y;
    this.Vup;
    this.Vacross;
    this.h = 2;
  }

  move() {
    this.y = this.oldy - this.h;
    this.x = this.Vacross * t * scale;
    this.h = (this.Vup * t - (1 / 2) * g * pow(t, 2)) * scale;
    this.distance = round(this.Vacross * t, 1);
  }

  calculateInfo() {
    range = round((pow(this.v, 2) * sin(2 * this.a)) / g, 1);
    tflight = round((2 * this.Vup) / g, 2);
    hmax = round(pow(this.Vup, 2) / (2 * g), 1);
  }

  drawInfo() {
    // setup the pop-up box
    translate(-width / 4, -(height * 5) / 6);
    fill(255);
    strokeWeight(4);
    stroke(0);
    rect(width / 2 - 250, 10, 500, uisize);
    translate(width / 2 - 250, 10);
    noStroke();
    fill(0);
    textSize(35);
    textStyle(BOLD);
    text("Results", 200, 37);
    // draw tflight
    textSize(25);
    textStyle(NORMAL);
    text("Time of flight =    " + tflight + " s", 5, 80);
    // draw range
    text("Range of projectile =    " + range + " m", 5, 120);
    text("Maximum height reached =    " + hmax + " m", 5, 160);
    translate(-width / 2 + 250, -10);
    translate(width / 4, (height * 5) / 6);
    stroke(0);
    line(0, 10, this.x, 10);
    noStroke();
    fill(0);
    textSize(32);
    text(range + " m", this.x / 2 - 40, 40);
    // draw max height
    stroke(0);
    noFill();
    line(this.x / 2, 0, this.x / 2, -hmax * scale);
    beginShape();
    for (let i = 0; i < path.length; i++) {
      vertex(path[i].x, path[i].y);
    }
    endShape();
  }

  show() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y - this.w / 2, this.w);
    stroke(0);
    strokeWeight(1);
    dx = 200 * cos(-this.a);
    dy = 200 * sin(-this.a);
    if (drawLine) {
      line(this.x, this.y - this.w / 2, this.x + dx, this.y - this.w / 2 + dy);
    }
    strokeWeight(4);
    point(this.x, this.y - this.w / 2);
    if (running) {
      path.push(createVector(this.x, this.y));
    }
  }
}

function checkAngle() {
  ball.a = float(this.value());
}

function run() {
  running = true;
  drawLine = false;
  ball.v = float(speed.value());
  ball.a = float(angle.value());
  ball.Vup = ball.v * sin(ball.a);
  ball.Vacross = ball.v * cos(ball.a);
  ball.calculateInfo();
}

function quit() {
  running = false;
  location.reload();
}
