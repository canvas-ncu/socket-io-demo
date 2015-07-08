import _ from 'underscore'

export default class Avatar extends createjs.Sprite{
    constructor(params) {
        super(params);
        // どちらを向いているかのステータス
        this.direction = params.direction || 'down';
        // 歩いてるかどうかだけのフラグ
        this.isWalking = false;
        // どの方向に歩いてるかのフラグ
        this.walkingDirection = null;
        // 歩くスピード
        this.walkspeed = 500;
        // 次にどちらに行くか
        this.nextAction = null;
        // スプライトシート作成
        this.spriteSheet = new createjs.SpriteSheet({
            framerate: 30,
            images: [params.image],
            frames: {
                width: 16,
                height: 16
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
        _.extend(this, params);
    }
    walk(direction) {
        if(!direction) {
            console.error('require: direction');
        }
        this.nextAction = direction;
        if(!this.isWalking) {
            this.isWalking = true;
            this.goNextAction();
        }
    }
    goNextAction() {
        // 次のアクションが入力されていなければ止める
        if(!this.nextAction) {
            this.isWalking = false;
            this.walkingDirection = null;
            switch(this.direction) {
                case 'up'   : this.gotoAndStop(3); break;
                case 'left' : this.gotoAndStop(6); break;
                case 'right': this.gotoAndStop(8); break;
                case 'down' : this.gotoAndStop(0); break;
            }
            return;
        }
        // 次のアクションが入力されていれば歩かせる
        switch(this.nextAction) {
            case 'up'   : this.goUp();    break;
            case 'left' : this.goLeft();  break;
            case 'right': this.goRight(); break;
            case 'down' : this.goDown();  break;
        }
    }
    goUp() {
        this.direction = 'up';
        if(this.walkingDirection !== 'up') {
            this.walkingDirection = 'up';
            this.gotoAndPlay('up');
        }
        createjs.Tween.get(this)
            .to({y: this.y - 16}, this.walkspeed)
            .call(function() {
                this.goNextAction();
            });
    }
    goLeft() {
        this.direction = 'left';
        if(this.walkingDirection !== 'left') {
            this.walkingDirection = 'left';
            this.gotoAndPlay('left');
        }
        createjs.Tween.get(this)
            .to({x: this.x - 16}, this.walkspeed)
            .call(function() {
                this.goNextAction();
            });
    }
    goRight() {
        this.direction = 'right';
        if(this.walkingDirection !== 'right') {
            this.walkingDirection = 'right';
            this.gotoAndPlay('right');
        }
        createjs.Tween.get(this)
            .to({x: this.x + 16}, this.walkspeed)
            .call(function() {
                this.goNextAction();
            });
    }
    goDown() {
        this.direction = 'down';
        if(this.walkingDirection !== 'down') {
            this.walkingDirection = 'down';
            this.gotoAndPlay('down');
        }
        createjs.Tween.get(this)
            .to({y: this.y + 16}, this.walkspeed)
            .call(function() {
                this.goNextAction();
            });
    }
    stopWalk() {
        this.nextAction = null;
    }
}
