var start = function() {
    var stage;
    var animation;
    var stageWidth;
    var stageHeight;
    function initialize() {
        var canvasElement = document.getElementById("my-canvas");
        stageWidth = canvasElement.width;
        stageHeight = canvasElement.height;
        stage = new createjs.Stage(canvasElement);
        animation = createAnimation("/img/pokemonrgb_various_sheet.png");
        animation.scaleX = 2;
        animation.scaleY = 2;
        stage.addChild(animation);
        animation.x = stageWidth / 2;
        animation.y = stageHeight / 2;
        animation.gotoAndPlay("walk");
        createjs.Ticker.addEventListener("tick", animate);
    }
    function animate(eventObject) {
        stage.update();
    }
    function createAnimation(file) {
        var data = {};
        data.images = [file];
        data.frames = { width: 16, height: 16, regX: 8, regY: 8 };
        data.animations = {
            walk: {
                frames: [0, 1],
                speed: 0.3
            }
        };
        var mySpriteSheet = new createjs.SpriteSheet(data);
        var mySprite = new createjs.BitmapAnimation(mySpriteSheet);
        return mySprite;
    }
    initialize();
}

//
//
//// 1.イベントとコールバックの定義
//var socketio = io.connect('http://localhost:8080');
//
//socketio.on("connected", function(name) {});
//socketio.on("publish", function (data) { addMessage(data.value); });
//socketio.on("disconnect", function () {});
//
//// 2.イベントに絡ませる関数の定義
//function start(name) {
//    socketio.emit("connected", name);
//}
//
//function publishMessage() {
//    var textInput = document.getElementById('msg_input');
//    var msg = "[" + myName + "] " + textInput.value;
//    socketio.emit("publish", {value: msg});
//    textInput.value = '';
//}
//
//function addMessage (msg) {
//    var domMeg = document.createElement('div');
//    domMeg.innerHTML = new Date().toLocaleTimeString() + ' ' + msg;
//    msgArea.appendChild(domMeg);
//}
//
//// 3.開始処理
//var msgArea = document.getElementById("msg");
//var myName = Math.floor(Math.random()*100) + "さん";
//addMessage("貴方は" + myName + "として入室しました");
//start(myName);

