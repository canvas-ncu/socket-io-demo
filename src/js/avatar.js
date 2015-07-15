import _ from 'underscore'
import * as CFG from './config.js';
import * as Util from './utility.js';

export default class Avatar extends createjs.Sprite{

    constructor(params) {
        super(params);
        // どちらを向いているかのステータス
        this._direction = params.direction || 'down';
        // どの方向に歩いてるかのフラグ
        this._walkingDirection = null;
        // 次の動作
        this._nextAction = null;

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
        this._cellX = params.cellX || 1;
        this._cellY = params.cellY || 1;
        this.x = Util.getX(this._cellX);
        this.y = Util.getY(this._cellY);
    }

    // アバターの位置のセッター
    setCellX(x) {
        this._cellX = x;
    }
    setCellY(y) {
        this._cellY = y;
    }

    // アバターの位置のゲッター
    getCellX() {
        return 0 + this._cellX;
    }
    getCellY() {
        return 0 + this._cellY;
    }

    // 次のアクションをセット
    setNextAction(direction) {
        this._nextAction = direction;
    }
    // 次のアクションをゲット
    getNextAction() {
        return this._nextAction;
    }

    // 足踏みをさせる
    stamp(direction) {
        // 向きを更新
        this._direction = direction;
        // 歩こうとしている向きにすでに歩いていなければ
        // スプライトシートアニメーション開始
        if(this._walkingDirection !== direction) {
            this.gotoAndPlay(direction);
            // 歩行中の向きを更新
            this._walkingDirection = direction;
        }

    }

    // 足踏みを止める
    stop() {
        // 歩行終了にフラグを変更
        this._walkingDirection = null;
        // 向いている方向で足を止める
        switch(this._direction) {
            case 'up'   : this.gotoAndStop(3); break;
            case 'left' : this.gotoAndStop(6); break;
            case 'right': this.gotoAndStop(8); break;
            case 'down' : this.gotoAndStop(0); break;
        }
    }

}
