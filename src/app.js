import _ from 'underscore'
import * as Util from './js/utility.js';
import Map from './js/map.js';
import Avatar from './js/avatar.js';

class App {
    constructor(params) {
        
        // ステージの準備
        var canvasElement = document.getElementById("my-canvas");
        this.stage = new createjs.Stage(canvasElement);

        // マップ生成
        this.map = new Map();
        this.stage.addChild(this.map);

        // アバターのリスト
        this.avatarList = [];

        // 自分のアバター
        this.myAvatar = new Avatar({
            cellX: 1,
            cellY: 1,
            image: '/img/pokemonrgb_various_sheet.png'
        });
        this.map.addChild(this.myAvatar);

        // 自分のアバターをリストに追加
        this.avatarList.push(this.myAvatar);

        // キーボード入力を監視
        document.onkeydown = (e) => {
            var _dir = null;
            var _walkDisable = false;
            var nowX = this.myAvatar.getCellX(),
                nowY = this.myAvatar.getCellY();
            switch(e.keyCode) {
                case 38: 
                    _dir = 'up';
                    break;
                case 37:
                    _dir = 'left';
                    break;
                case 39:
                    _dir = 'right';
                    break;
                case 40:
                    _dir = 'down';
                    break;
                default: return;
            }
            this.myAvatar.walk(_dir);
        };

        // キーボード入力終了を監視
        document.onkeyup = (e) => {
            this.myAvatar.stopWalk();
        };

        // 1コマ毎にupdate
        createjs.Ticker.addEventListener("tick", () => {
            this.stage.update();
        });
    }
}

new App();
