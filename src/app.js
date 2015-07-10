import _ from 'underscore'
import * as Util from './js/utility.js';
import Map from './js/map.js';
import Avatar from './js/avatar.js';

var stage, map, myAvatar;
var others = [];


function initialize() {
    // canvasタグを取得
    var canvasElement = document.getElementById("my-canvas");
    // ステージの準備
    stage = new createjs.Stage(canvasElement);

    // マップ生成
    map = new Map();
    stage.addChild(map);

    // 自分のアバター
    myAvatar = new Avatar({
        cellX: 1,
        cellY: 1,
        image: '/img/pokemonrgb_various_sheet.png'
    });
    map.addChild(myAvatar);

    // キーボード入力を監視
    document.onkeydown = (e) => {
        switch(e.keyCode) {
            case 38: myAvatar.walk('up');    break;
            case 37: myAvatar.walk('left');  break;
            case 39: myAvatar.walk('right'); break;
            case 40: myAvatar.walk('down');  break;
        }
    };

    // キーボード入力終了を監視
    document.onkeyup = (e) => {
        myAvatar.stopWalk();
    };

    // 1コマ毎にupdate
    createjs.Ticker.addEventListener("tick", () => {
        stage.update();
    });
}


function addOtherAvatar() {

}


initialize();
