import Avatar from './js/avatar.js';

function initialize() {
    var stage;
    var animation;
    var stageWidth;
    var stageHeight;

    // canvasタグを取得
    var canvasElement = document.getElementById("my-canvas");
    canvasElement.width = window.innerWidth - 300;
    canvasElement.height = window.innerHeight;

    // ステージの準備
    stageWidth = canvasElement.width;
    stageHeight = canvasElement.height;
    stage = new createjs.Stage(canvasElement);
   
    // アバター
    var avatar = new Avatar({
        x: stageWidth / 2,
        y: stageHeight / 2,
        scaleX: 2,
        scaleY: 2,
        image: './img/pokemonrgb_various_sheet.png'
    });
    stage.addChild(avatar);
   
    // 1コマ毎にupdate
    createjs.Ticker.addEventListener("tick", () => {
        stage.update();
    });

    document.onkeydown = (e) => {
        if(e.keyCode === 38) {
            // 上に行く
            avatar.goUp();
        } else if(e.keyCode === 37) {
            // 左に行く
            avatar.goLeft();
        } else if(e.keyCode === 39) {
            // 右に行く
            avatar.goRight();
        } else if(e.keyCode === 40) {
            // 下に行く
            avatar.goDown();
        }
    };

    document.onkeyup = (e) => {
        avatar.stopWalk();
    };
}

initialize();
