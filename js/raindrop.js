'use strict';

(function() {


var RainSize = {
  WIDTH: 244,
  HEIGHT: 295,
  DROP_COUNT: 200,
  DROP_COLOR: '#99C8EF'
};

var Raindrop = function() {
  this._reset();
};

Raindrop.prototype.render = function(ctx) {
  ctx.strokeStyle = RainSize.DROP_COLOR;
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x + this.size / 5, this.y - this.size);
  ctx.closePath();
  ctx.stroke();
};
Raindrop.prototype.update = function() {
  this.x += this.hVelocity;
  this.y += this.velocity;

  if(this.isOffscreen()){
    this._reset();
  }
}
Raindrop.prototype.isOffscreen = function() {
  return this.y > RainSize.HEIGHT + this.size ||
         this.x > RainSize.WIDTH + this.size ||
         this.x < -this.size;
};
Raindrop.prototype._reset = function() {
  this.size = getRandomValue(1,6);
  this.x = getRandomValue(-RainSize.WIDTH * 0.3, RainSize.WIDTH * 1.6);
  this.y = getRandomValue(0, RainSize.HEIGHT);

  this.velocity = this.size;
  this.hVelocity = -this.size / 3;
};


var cleanupFrame = function(ctx) {
  ctx.clearRect(0, 0, RainSize.WIDTH, RainSize.HEIGHT);
}

var renderFrame = function(ctx, raindrops) {
  cleanupFrame(ctx);

  raindrops.forEach(function(it) {
    it.render(ctx);
    it.update();
  });

  requestAnimationFrame(
    renderFrame.bind(null, ctx, raindrops)
  );
}

var raining = function() {
  var canvas = document.querySelector("#rain");
  var ctx = canvas.getContext("2d");

  canvas.width = RainSize.WIDTH;
  canvas.height = RainSize.HEIGHT;

  var raindrops = new Array(RainSize.DROP_COUNT)
                      .fill('')
                      .map(function() {
                        return new Raindrop();
                      })

  renderFrame(ctx, raindrops);
}
raining();

function getRandomValue(min, max) {
  return Math.random() * (max - min) + min;
}

})();