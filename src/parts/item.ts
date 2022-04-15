
import { MyDisplay } from "../core/myDisplay";
import { Color } from "three/src/math/Color";
import { Util } from "../libs/util";
import { HSL } from "../libs/hsl";
import { Conf } from "../core/conf";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _id:number;
  private _colors:Array<Color> = [];
  private _p:HTMLElement;
  private _nowPClass:string;

  constructor(opt:{el:HTMLElement; id:number}) {
    super(opt)

    this._id = opt.id;

    this._makeColors();

    // スタイルの追加
    const hsl = new HSL();
    hsl.s = 1;
    hsl.l = 0.5;
    hsl.h = Util.instance.map(Math.sin(this._id * 0.05), 0, 1, -1, 1);

    const baseCol = new Color()
    baseCol.setHSL(hsl.h, hsl.s, hsl.l);

    let styleCol:String = baseCol.getStyle();
    const sheets = document.styleSheets
    const sheet = sheets[sheets.length - 1];
    sheet.insertRule(
      '.item-' + this._id + '::selection { background: ' + styleCol + '; }',
      sheet.cssRules.length
    );

    this._nowPClass = 'item-' + this._id
    this._p = this.qs('p')
    const txt = Util.instance.randomArr('ABCDEFGHIKLMNOPRSTUVWXYZ0123456789'.split(''));
    this._p.innerHTML = txt;
    this._p.classList.add(this._nowPClass);
    this.css(this._p, {
      color: '#FFF',
      fontSize: '36px',
    })

    // const num = 4
    // this.qsAll('.inner').forEach((val,i) => {
    //   this._inner.push(new ItemInner({
    //     el:val,
    //     className:'item-' + this._id,
    //     txt:txt,
    //     id:i,
    //     posId:(i + opt.id) % num,
    //   }))
    // })

    this._resize();
  }


  //
  // ------------------------------------
  private _makeColors():void {
    this._colors = []

    const keyColor:Array<Color> = [];

    // キーカラー適当に決定
    for(let i = 0; i < 3; i++) {
      keyColor.push(new Color(Util.instance.random(0, 1), Util.instance.random(0, 1), Util.instance.random(0, 1)))
    }

    for(let i = 0; i < 20; i++) {
      const colA:Color = Util.instance.randomArr(keyColor).clone();
      let hsl = new HSL();
      colA.getHSL(hsl);
      // hsl.s = Util.instance.random(0, 1);
      hsl.l = Util.instance.random(0, 1);

      const col = new Color();
      col.setHSL(hsl.h, hsl.s, hsl.l);

      this._colors.push(col)
    }

    Util.instance.shuffle(this._colors);
  }




  protected _update(): void {
    super._update();

    this._p.classList.remove(this._nowPClass);
    this._nowPClass = 'item-' + ((this._id + this._c) % Conf.instance.NUM);
    this._p.classList.add(this._nowPClass);
  }


  protected _resize(): void {
    super._resize();
  }
}