import _ from 'underscore';
import * as Util from './utility.js';
import * as CFG from '../config.js';


export default class Map extends createjs.Container{
  constructor(params) {
    super(params);
    _.extend(this, params);
    // createjsコンポーネントをイニシャライズ
    this.initialize();

    // マップのタイルのベース
    var mapCellBase = new createjs.SpriteSheet({
        images: ['/img/map.png'],
        frames: {
            width:  CFG.TILE_SIZE,
            height: CFG.TILE_SIZE
        }
    });

    // 15 * 15マスのマップ作成
    for(let y = 0; y < CFG.MAP_DATA.length; y++) {
        for(let x = 0; x < CFG.MAP_DATA[y].length; x++) {
            var tile = new createjs.Sprite(mapCellBase);
            // 座標をセット
            tile.setTransform(Util.getX(x), Util.getY(y));
            // 木か床かどちらかのスプライトを表示
            tile.gotoAndStop(CFG.MAP_DATA[y][x] ? 0 : 1);
            this.addChild(tile);
        }
    }

  }
  // 指定したマスが歩行可能か確認
  validateCell(x, y) {
      return CFG.MAP_DATA[y][x] === 0 ? true : false;
  }
}
