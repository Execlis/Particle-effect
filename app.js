let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
let width = canvas.width;
let height = canvas.height;
let context = canvas.getContext("2d");


// config
let quantity = 100;
let speed = 0.6;
let widthLine = 100;
let myX;
let myY;
let distanceBalls;
let maxSize = 1;

function Ball() {
  this.x = Math.floor(Math.random() * width);
  this.y = Math.floor(Math.random() * height);
  this.xSpeed = Math.random() * speed - (speed / 2);
  this.ySpeed = Math.random() * speed - (speed / 2);
  const color = ["red", "green", "fuchsia", "blue", "yellow", "purple", "Orange", "Aqua"];
  this.color = random(color);
  //this.color = 'rgb(' + Math.round(Math.random()*255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random()*255) +')';
  this.size = Math.floor(Math.random() * (6 - 3) + 3);
}

function random(arr) {
  return arr [Math.floor(Math.random() * arr.length)];
}

function circle(x, y, radius, fillCircle = false) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    context.fill();
  } else {
    context.stroke();
  }
}

Ball.prototype.draw = function () {
  context.fillStyle = this.color;
  context.strokeStyle = this.color;
  context.lineWidth = 1.5;
  context.globalAlpha = 0.8;
  circle(this.x, this.y, this.size, true); 
};

Ball.prototype.move = function () {
  this.x += this.xSpeed;
  this.y += this.ySpeed;
  
};

Ball.prototype.checkCollision = function () {
  if (this.x < 0 || this.x > width) {
    this.xSpeed = -this.xSpeed;
  }
  if (this.y < 0 || this.y > height) {
    this.ySpeed = -this.ySpeed;
  }
};


Ball.prototype.collisionTouch = function() {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      let dx = this.x - balls[j].x;
      let dy = this.y - balls[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let lineDistance = 1 - ((100 / widthLine * distance) / 100);
      if (distance <= widthLine) {
        context.lineWidth = 1.0;
        context.globalAlpha = lineDistance;
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(balls[j].x, balls[j].y);
        context.stroke();
      }
      // if (distance < this.size + balls[j].size) {
      //   if (this.size > balls[j].size) {
      //     balls[j].color = this.color
      //   }
      // }
    }
  }
}

const balls = [];
for (let i = 0; i < quantity; i++) {
  balls[i] = new Ball(); 
}

setInterval(function () {
  context.clearRect(0, 0, width, height);
  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].move();
    balls[i].checkCollision();  
    balls[i].collisionTouch();
  }
}, 10);

