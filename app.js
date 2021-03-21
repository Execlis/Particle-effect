let canvas = document.getElementById("canvas");
let width = canvas.scrollWidth;
let height = canvas.scrollHeight;
let context = canvas.getContext("2d");

// config
let quantity = 100;
let speed = 0.3;
let widthLine = 100;
let myX;
let myY;
let distanceBalls;


function Ball() {
  this.x = Math.floor(Math.random() * width);
  this.y = Math.floor(Math.random() * height);
  this.xSpeed = Math.random() * speed - (speed / 2);
  this.ySpeed = Math.random() * speed - (speed / 2);
  const color = ["red", "green", "fuchsia", "blue", "yellow", "purple", "Orange", "Aqua"];
  this.color = random(color);
  //this.color = 'rgb(' + Math.round(Math.random()*255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random()*255) +')';
  this.size = Math.floor(Math.random() * (5 - 2) + 2);
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
  context.lineWidth = 1.0;
  circle(this.x, this.y, this.size, false); 
  
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
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = "lime";
      }
    }
  }
}

Ball.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < widthLine) {
        context.lineWidth = 0.3;
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(balls[j].x, balls[j].y);
        context.stroke();
      }
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
    balls[i].collisionDetect(); 
    //balls[i].collisionTouch();
  }
  context.strokeRect(0, 0, width, height);
}, 10);

