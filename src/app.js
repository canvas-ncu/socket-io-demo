import _ from 'underscore'
import Map from './js/map.js';
import Avatar from './js/avatar.js';

function initialize() {
    var stage;
    var stageWidth;
    var stageHeight;
    var tileSize = 16;

    // canvasタグを取得
    var canvasElement = document.getElementById("my-canvas");

    // ステージの準備
    stageWidth = canvasElement.width;
    stageHeight = canvasElement.height;
    stage = new createjs.Stage(canvasElement);


    // マップ生成
    var map = new Map({
        width: tileSize * 15,
        height: tileSize * 15,
        stage: 'demo'
    });
    stage.addChild(map);


    // アバター
    var avatar = new Avatar({
        x: tileSize * 5,
        y: tileSize * 5,
        image: '/img/pokemonrgb_various_sheet.png'
    });
    map.addChild(avatar);


    // キーボーdド入力を監視
    document.onkeydown = (e) => {
        if(e.keyCode === 38) {
            // 上に行く
            avatar.walk('up');
        } else if(e.keyCode === 37) {
            // 左に行く
            avatar.walk('left');
        } else if(e.keyCode === 39) {
            // 右に行く
            avatar.walk('right');
        } else if(e.keyCode === 40) {
            // 下に行く
            avatar.walk('down');
        }
    };

    // キーボード入力終了を監視
    document.onkeyup = (e) => {
        avatar.stopWalk();
    };

    // 1コマ毎にupdate
    createjs.Ticker.addEventListener("tick", () => {
        stage.update();
    });

}

initialize();
