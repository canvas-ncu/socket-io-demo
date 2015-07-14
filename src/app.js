import _ from 'underscore'
import * as Util from './js/utility.js';
import Map from './js/map.js';
import Avatar from './js/avatar.js';

class App {
    constructor(params) {
        // 自分アバターの仮ID
        var myId = 'asdfadfasdfa';
        var FPS = 60;
        // 生成されたアバターリスト
        this.avatarList = {};
        // 入力されているキー
        this.inputingKey = null;

        // ステージの準備
        var canvasElement = document.getElementById("my-canvas");
        this.stage = new createjs.Stage(canvasElement);

        // マップ生成
        this.map = new Map();
        this.stage.addChild(this.map);

        // 自分のアバターを追加
        this.addAvatar(myId);
        var myAvatar = this.avatarList[myId];

        // キーボード入力を監視
        document.onkeydown = (e) => {
            var _dir = null;
            switch(e.keyCode) {
                case 38: _dir = 'up';    break;
                case 37: _dir = 'left';  break;
                case 39: _dir = 'right'; break;
                case 40: _dir = 'down';  break;
            }
            myAvatar.setNextAction(_dir);
        };

        // キーを離したら入力をキャンセル
        document.onkeyup = () => {
            myAvatar.setNextAction(null);
        }

        // 1コマ毎にupdate
        createjs.Ticker.on("tick", () => {
            // stageの再描画
            this.stage.update();
            // 動作が入力されていればアバターを動かす
            var nextAction = myAvatar.getNextAction();
            if(nextAction) {
                this.moveAvatar(myId, nextAction);
                return;
            } else {
                if(!myAvatar.isMoving) {
                    myAvatar.stop();
                }
            }
        });
    }

    // アバターの追加
    addAvatar(id) {
        var avatar = new Avatar({
            cellX: 1,
            cellY: 1,
            image: '/img/avatars/boy.png'
        });
        // マップ上に追加
        this.map.addChild(avatar);
        // アバターのリストに追加
        this.avatarList[id] = avatar;
    }

    // アバターを動かす
    moveAvatar(id, direction) {
        // 対象となるアバター
        var target = this.avatarList[id];

        // 移動中であれば処理しない
        if(target.isMoving) {
            return;
        };

        // 移動中にフラグ変更
        target.isMoving = true;

        // 足踏みをさせる
        target.stamp(direction);

        // 歩行する方向に座標を更新
        var nextCellX = target.getCellX(),
            nextCellY = target.getCellY();
        switch(direction) {
            case 'up'   : nextCellY -= 1; break;
            case 'left' : nextCellX -= 1; break;
            case 'right': nextCellX += 1; break;
            case 'down' : nextCellY += 1; break;
        }

        // 次のマスが歩行可能であれば座標を更新する
        if(this.map.validateCell(nextCellX, nextCellY)) {
            target.setCellX(nextCellX);
            target.setCellY(nextCellY);
        }

        // 移動アニメーションを開始
        createjs.Tween.get(target)
            .to(
                {
                    x: Util.getX(target.getCellX()),
                    y: Util.getY(target.getCellY())
                },
                500
            )
            .call(function() {
                // 移動終了状態にフラグを戻す
                target.isMoving = false;
            });
    }
}

new App();
