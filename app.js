"use strict";
class Player extends EngineObject {
  constructor(pos, size) {
    super(pos, size);
    this.color = WHITE;
    this.tileInfo = new TileInfo(vec2(0, 0), vec2(32, 32), 0);
    this.angleDamping = 0.95;
    console.log(this);
  }
  update() {
    debugText(`angle ${this.angle}`, vec2(0, 2));
    debugText(`pos ${this.pos}`, vec2(this.pos.x, this.pos.y + 2));
    this.inputs();
    cameraPos = this.pos;
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
    if (y > 0) {
      const acceleration = vec2().setAngle(this.angle, 0.001);
      this.applyAcceleration(acceleration);
      return;
    } else {
      const acceleration = vec2().setAngle(this.angle, -0.001);
      this.applyAcceleration(acceleration);
      return;
    }
  }
  turn(x) {
    if (x == 0) {
      this.applyAngularAcceleration(0);
      return;
    }
    if (x > 0) {
      this.applyAngularAcceleration(0.01);
      return;
    } else {
      this.applyAngularAcceleration(-0.01);
      return;
    }
  }
}
class Planet extends EngineObject {
  constructor(pos, size) {
    super(pos, size);
    this.color = WHITE;
  }
}
function gameInit() {
  new Player(vec2(0, 0), vec2(1, 2));
  new Planet(vec2(10, 10), vec2(1, 1));
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
