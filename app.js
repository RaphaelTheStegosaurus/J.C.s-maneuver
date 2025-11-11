"use strict";
class Player extends EngineObject {
  constructor(pos, size) {
    super(pos, size);
    this.color = WHITE;
    this.tileInfo = new TileInfo(vec2(0, 0), vec2(32, 32), 0);
    this.angleDamping = 0.99;
    this.velocityDamping = 0.999;
    this.ACCEL_MAGNITUDE = 0.0005;
  }
  update() {
    // debugText(`angle ${this.angle}`, vec2(0, 2));
    debugText(`pos ${this.pos}`, vec2(this.pos.x, this.pos.y + 2));
    // debugPoint(vec2(this.pos.x, this.pos.y + 2), WHITE, 0, this.angle);
    // debugPoint(vec2(this.pos.x, this.pos.y + 4), WHITE, 0, this.angle);
    // debugPoint(vec2(this.pos.x, this.pos.y + 6), WHITE, 0, this.angle);
    // debugPoint(vec2(this.pos.x, this.pos.y + 8), WHITE, 0, this.angle);
    this.inputs();
    cameraPos = this.pos;
    this.setCollision();
    super.update();
  }
  inputs() {
    let move;
    if (isTouchDevice) {
      touchGamepadEnable = true;
      move = gamepadStick(0);
    } else {
      move = keyDirection();
    }
    this.turn(move.x);
    this.acceleration(move.y);
  }
  acceleration(y) {
    if (y == 0) {
      this.applyAcceleration(vec2(0, 0));
      return;
    }
    const accelerationMagnitude = this.ACCEL_MAGNITUDE * (y > 0 ? 1 : -1);
    const acceleration = vec2().setAngle(this.angle, accelerationMagnitude);
    this.applyAcceleration(acceleration);
  }
  turn(x) {
    if (x == 0) {
      this.applyAngularAcceleration(0);
      return;
    }
    if (x > 0) {
      this.applyAngularAcceleration(0.001);
      return;
    } else {
      this.applyAngularAcceleration(-0.001);
      return;
    }
  }
}
class Planet extends EngineObject {
  constructor(pos, size, player) {
    super(pos, size);
    this.color = WHITE;
    this.setCollision();
    this.Player = player;
    this.GRAVITY_RANGE = 20;
    this.GRAVITY_STRENGTH = 0.0005;
  }
  update() {
    debugCircle(this.pos, this.GRAVITY_RANGE, CYAN);
    debugCircle(this.pos, this.GRAVITY_RANGE / 4, RED);
    this.applyGravity();
    super.update();
  }
  applyGravity() {
    const delta = this.pos.subtract(this.Player.pos);
    const distance = delta.length();
    if (distance > 0 && distance < this.GRAVITY_RANGE) {
      const direction = delta.normalize();
      const forceMagnitude = this.GRAVITY_STRENGTH / distance;
      const gravityAcceleration = direction.scale(forceMagnitude);
      this.Player.velocity = this.Player.velocity.add(gravityAcceleration);
      debugText(
        `Distance: ${distance.toFixed(2)}`,
        vec2(this.Player.pos.x, this.Player.pos.y + 3)
      );
    }
  }
}
function gameInit() {
  const player = new Player(vec2(0, 0), vec2(1, 2));
  new Planet(vec2(5, 20), vec2(1, 1), player);
}
function gameUpdate() {}
function gameUpdatePost() {}
function gameRender() {}
function gameRenderPost() {
  drawTextScreen("Hello World!", mainCanvasSize.scale(0.5), 80);
}
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, [
  "./tiles/Ship.png",
]);
