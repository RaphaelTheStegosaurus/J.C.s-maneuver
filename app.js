"use strict";
class Player extends EngineObject {
  constructor(pos, size) {
    super(pos, size);
    this.color = WHITE;
    this.tileInfo = new TileInfo(vec2(0, 0), vec2(32, 32), 0);
  }
  update() {
    this.inputs();
  }
  inputs() {
    let turn, acceleration, deceleration;
    let move;
    if (isTouchDevice) {
      touchGamepadEnable = true;
      move = gamepadStick(0);
    } else {
      move = keyDirection();
    }
    this.turn(move.x);
  }
  turn(x) {
    if (x == 0) {
      this.angleVelocity = 0;
      return;
    }
    if (x > 0) {
      this.angleVelocity = 0.01;
      return;
    } else {
      this.angleVelocity = -0.01;
      return;
    }
  }
}
function gameInit() {
  new Player(vec2(0, 0), vec2(1, 2));
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
