import _ from 'underscore';
var mapData = {
  demo: [
    //00  01  02  03  04  05  06  07  08  09
    [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ], // 00
    [  1,  0,  0,  0,  0,  0,  0,  0,  0,  1 ], // 01
    [  1,  0,  0,  0,  0,  0,  0,  0,  0,  1 ], // 02
    [  1,  0,  0,  0,  0,  0,  0,  0,  0,  1 ], // 03
    [  1,  0,  0,  0,  1,  1,  1,  0,  0,  1 ], // 04
    [  1,  0,  0,  0,  1,  0,  1,  0,  0,  1 ], // 05
    [  1,  0,  0,  0,  1,  1,  1,  0,  0,  1 ], // 06
    [  1,  0,  0,  0,  0,  0,  0,  0,  0,  1 ], // 07
    [  1,  0,  0,  0,  0,  0,  0,  0,  0,  1 ], // 08
    [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ]  // 09
  ]
};

export default class Avatar extends createjs.Container{
  constructor(params) {
    super(params);
    _.extend(this, params);
    this.initialize();

    // マップのタイルのベース
    var mapTileBase = new createjs.SpriteSheet({
        images: ['/img/map.png'],
        frames: {
            width: 16,
            height: 16
        }
    });

    // 15 * 15マスのマップ作成
    for(let y = 0; y < mapData[params.stage].length; y++) {
        for(let x = 0; x < mapData[params.stage][y].length; x++) {
            var tile = new createjs.Sprite(mapTileBase);
            tile.setTransform(x * 16, y * 16);
            tile.gotoAndStop(mapData[params.stage][y][x] ? 0 : 1);
            this.addChild(tile);
        }
    }

  }
}
