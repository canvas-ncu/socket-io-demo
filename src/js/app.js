import _ from 'lodash'
import * as Util from './utility.js';
import Map from './map.js';
import Avatar from './avatar.js';

class App {
    constructor(params) {
        // 自分アバターの仮ID
        var myId = '';
        var myAvatar = null;
        var FPS = 60;

        // socket.ioの準備
        var socket = io();

        // 生成されたアバターリスト
        this.userList = {};
        // 入力されているキー
        this.inputingKey = null;

        // ステージの準備
        var canvasElement = document.getElementById("my-canvas");
        this.stage = new createjs.Stage(canvasElement);

        // マップ生成
        this.map = new Map();
        this.stage.addChild(this.map);

        // 初回ログイン
        socket.on('connected', (e) => {
            myId = e.userId;
            _.each(e.userList, (_userId) => {
                this.addAvatar(_userId);
            });
            myAvatar = this.userList[myId];
        });

        // 他人のアバターを追加
        socket.on('loginuser', (e) => {
            this.addAvatar(e.userId);
        });

        // 他人のアバターを追加
        socket.on('logoutuser', (e) => {
            var target = this.userList[e.userId];
            this.map.removeChild(target);
        });

        // 他人のアバターが移動したことを監視
        socket.on('moveuser', (e) => {
            this.moveAvatar(this.userList[e.userId], e.direction);
        });

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
            if(!myAvatar) {
                return;
            }
            myAvatar.setNextAction(null);
        }

        var upButton =     document.getElementById('up'),
            leftButton =   document.getElementById('left'),
            rightButton =  document.getElementById('right'),
            downButton = document.getElementById('down');
        upButton.addEventListener('touchstart', () => {
            myAvatar.setNextAction('up');
        });
        leftButton.addEventListener('touchstart', () => {
            myAvatar.setNextAction('left');
        });
        rightButton.addEventListener('touchstart', () => {
            myAvatar.setNextAction('right');
        });
        downButton.addEventListener('touchstart', () => {
            myAvatar.setNextAction('down');
        });
        document.addEventListener('touchend', () => {
            myAvatar.setNextAction(null);
        });
        document.addEventListener('touchmove', (e) => {
          if (window.innerHeight >= document.body.scrollHeight) {
            e.preventDefault();
          }
        }, false);

        // 1コマ毎にupdate
        createjs.Ticker.on("tick", () => {
            // stageの再描画
            this.stage.update();

            _.each(this.userList, (_avatar) => {
                // 動作が入力されていればアバターを動かす
                var nextAction = _avatar.getNextAction();
                if(nextAction) {
                    //if(_avatar.userId === myId) {
                        socket.emit('move', nextAction);
                    //}
                    this.moveAvatar(_avatar, nextAction);
                    return;
                } else {
                    if(!_avatar.isMoving) {
                        _avatar.stop();
                    }
                }
            });
        });

        // 接続を伝える
        socket.emit('beforeconnect');

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
        this.userList[id] = avatar;
    }

    // アバターを動かす
    moveAvatar(target, direction) {

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
                    y: Util.getY(target.getCellY()) - 4
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
