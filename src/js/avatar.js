import _ from 'underscore'

export default class Avatar extends createjs.Sprite{
  constructor(params) {
    super(params);
    _.extend(this, params);
    // どちらを向いているかのステータス
    this.direction = params.direction || 'down';
    // 歩いているかのフラグ
    this.isUpWalking = false;
    this.isLeftWalking = false;
    this.isRightWalking = false;
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
      this.stopWalk();
      this.isUpWalking = true;
      this.direction = 'up';
      this.gotoAndPlay('up');
    }
  }
  goLeft() {
    if(!this.isLeftWalking) {
      this.stopWalk();
      this.isLeftWalking = true;
      this.direction = 'left';
      this.gotoAndPlay('left');
    }
  }
  goRight() {
    if(!this.isRightWalking) {
      this.stopWalk();
      this.isRightWalking = true;
      this.direction = 'right';
      this.gotoAndPlay('right');
    }
  }
  goDown() {
    if(!this.isDownWalking) {
      this.stopWalk();
      this.isDownWalking = true;
      this.direction = 'down';
      this.gotoAndPlay('down');
    }
  }
  stopWalk() {
    this.isUpWalking = false;
    this.isLeftWalking = false;
    this.isRightWalking = false;
    this.isDownWalking = false;
    var stopFrame = 0;
    if(this.direction === 'up') {
        stopFrame = 3;
    } else if(this.direction === 'left') {
        stopFrame = 6;
    } else if(this.direction === 'right') {
        stopFrame = 8;
    } else if(this.direction === 'down') {
        stopFrame = 0;
    }
    this.gotoAndStop(stopFrame);
  }
}
