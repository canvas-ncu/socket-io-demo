import _ from 'underscore'

export default class Avatar extends createjs.Sprite{
  constructor(params) {
    super(params);
    _.extend(this, params);
    // 歩いているかのフラグ
    this.isUpWalking = false;
    this.isDownWalking = false;
    // スプライトシート作成
    this.spriteSheet = new createjs.SpriteSheet({
      framerate: 30,
      images: [params.image],
      frames: {
        width: 16,
        height: 16,
        regX: 8,
        regY: 8
      },
      animations: {
        up: {
          frames: [ 3, 4, 3, 5 ],
          next: 'up',
          speed: 0.3
        },
        left: {
          frames: [ 6, 7 ],
          next: 'left',
          speed: 0.3
        },
        right: {
          frames: [ 8, 9 ],
          next: 'right',
          speed: 0.3
        },
        down: {
          frames: [ 0, 1, 0, 2 ],
          next: 'down',
          speed: 0.3
        }
      }
    });
    this.initialize(this.spriteSheet);
  }
  goUp() {
    if(!this.isUpWalking) {
      this.stop();
      this.isUpWalking = true;
      this.gotoAndPlay('up');
    }
  }
  goLeft() {
    if(!this.isLeftWalking) {
      this.stop();
      this.isLeftWalking = true;
      this.gotoAndPlay('left');
    }
  }
  goRight() {
    if(!this.isRightWalking) {
      this.stop();
      this.isRightWalking = true;
      this.gotoAndPlay('right');
    }
  }
  goDown() {
    if(!this.isDownWalking) {
      this.stop();
      this.isDownWalking = true;
      this.gotoAndPlay('down');
    }
  }
  stop() {
    this.isUpWalking = false;
    this.isLeftWalking = false;
    this.isRightWalking = false;
    this.isDownWalking = false;
    this.gotoAndStop();
  }
}
