import _ from 'underscore'
import * as CFG from '../config.js';
import * as Util from './utility.js';

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
        this.nextAction = {
            action: null,       // 次の動作
            walkDisable: false  // 進めるかどうかのフラグ
        };

        // 歩くスピード
        var walkSpeed = 0.3;
        // スプライトシート作成
        var spriteSheet = new createjs.SpriteSheet({
            framerate: 30,
            images: [params.image],
            frames: {
                width:  CFG.TILE_SIZE,
                height: CFG.TILE_SIZE
            },
            animations: {
                up: {
                    frames: [ 3, 4, 3, 5 ],
                    next: 'up',
                    speed: walkSpeed
                },
                left: {
                    frames: [ 6, 7 ],
                    next: 'left',
                    speed: walkSpeed
                },
                right: {
                    frames: [ 8, 9 ],
                    next: 'right',
                    speed: walkSpeed
                },
                down: {
                    frames: [ 0, 1, 0, 2 ],
                    next: 'down',
                    speed: walkSpeed
                }
            }
        });
        // createJSコンポーネントをイニシャライズ
        this.initialize(spriteSheet);
        // 初期立ち位置をセット
        this.setCellX(params.cellX || 1);
        this.setCellY(params.cellY || 1);
    }
    // アバターの位置のセッター
    setCellX(x) {
        this.cellX = x;
        this.x = Util.getX(x);
    }
    setCellY(y) {
        this.cellY = y;
        this.y = Util.getY(y);
    }
    // アバターの位置のゲッター
    getCellX() {
        return 0 + this.cellX;
    }
    getCellY() {
        return 0 + this.cellY;
    }
    // 次のアクションをセット
    walk(direction, walkDisable) {
        if(!direction) {
            console.error('require: direction');
        }
        // 次のアクションの予約
        this.nextAction = {
            action: direction,
            walkDisable: walkDisable
        };
        // 現時点で歩いていなければ
        // 歩き始める
        if(!this.isWalking) {
            this.isWalking = true;
            this.goNextAction();
        }
    }
    // 予約されている動作を実行
    goNextAction() {
        // 次のアクションが入力されていなければ止める
        if(!this.nextAction.action) {
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

        // 向いている方向を更新
        this.direction = this.nextAction.action;
        // 今歩いている方向と次の動作が違った場合は
        // 新規にスプライトアニメーションを始める
        if(this.walkingDirection !== this.direction) {
            // 歩いている方向を更新
            this.walkingDirection = this.direction;
            // スプライトアニメーションを開始
            this.gotoAndPlay(this.direction);
        }
        // 次の立ち位置を計算
        var getNextPos = (_dir) => {
            var nowPos = [this.getCellX(), this.getCellY()];
            // 今回移動が許可されていなければその場で足踏み
            if(this.nextAction.walkDisable) {
                return nowPos;
            }
            switch(_dir) {
                case 'up'   : return [nowPos[0],     nowPos[1] - 1];
                case 'left' : return [nowPos[0] - 1, nowPos[1]    ];
                case 'right': return [nowPos[0] + 1, nowPos[1]    ];
                case 'down' : return [nowPos[0],     nowPos[1] + 1];
            }
        };
        // 次の立ち位置座標を保持
        var nextPos = getNextPos(this.direction);
        // 立ち位置座標の更新
        this.cellX = nextPos[0];
        this.cellY = nextPos[1];
        // 移動アニメーションを開始
        createjs.Tween.get(this)
            .to(
                {
                    x: Util.getX(nextPos[0]),
                    y: Util.getY(nextPos[1]),
                },
                this.walkspeed
            )
            .call(function() {
                // 終了したら再起的に次のアクションを実行
                this.goNextAction();
            });
    }
    // 次のアクションをキャンセルして
    // 現時点のアクションで終了させる
    stopWalk() {
        this.nextAction = {
            action: null,
            walkDisable: false
        };
    }
}
