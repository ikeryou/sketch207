
import { Mouse } from "../core/mouse";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Rect } from "../libs/rect";
import { Util } from "../libs/util";


// -----------------------------------------
//
// -----------------------------------------
export class ItemInner extends MyDisplay {

  private _id:number;
  private _posId:number;
  private _mask:HTMLElement;
  private _p:HTMLElement;
  private _size:Rect = new Rect();
  private _total:number = 0;

  constructor(opt:any = {}) {
    super(opt)

    this._id = opt.id;
    this._posId = opt.posId;

    this._mask = this.qs('.mask');
    this._p = this.qs('p');
    this._p.innerHTML = opt.txt;
    this._p.classList.add(opt.className);

    Tween.instance.set(this._p, {
      color:'#FFF'
    })
  }


  public setSize(width:number, height:number, total:number): void {
    this._size.width = width;
    this._size.height = height;

    this._total = total;

    Tween.instance.set(this.getEl(), {
      width: this._size.width,
      height: this._size.height,
    })

    Tween.instance.set(this._mask, {
      width: this._size.width,
      height: this._size.height,
    })

    Tween.instance.set(this._p, {
      fontSize:this._size.height * 1
    })
  }


  protected _update(): void {
    super._update();

    let mx = Mouse.instance.easeNormal.x;
    mx *= 1

    const it = 1 / (this._total)
    let min = this._id * it;
    let max = min + it * 1.5;

    min = min * 2 - 1
    max = max * 2 - 1

    let dist = Util.instance.map(mx, -this._size.width * 1, this._size.width * 1, min, max);

    if(this._posId == 0 || this._posId == 2) {
      Tween.instance.set(this.getEl(), {
        x:dist
      });
      Tween.instance.set(this._mask, {
        x:dist * -1
      })
    }

    // if(this._posId == 1) {
    //   Tween.instance.set(this.getEl(), {
    //     y:dist
    //   });
    //   Tween.instance.set(this._mask, {
    //     y:dist * -1
    //   })
    // }

    if(this._posId == 1 || this._posId == 3) {
      Tween.instance.set(this.getEl(), {
        x:dist * -1
      });
      Tween.instance.set(this._mask, {
        x:dist
      })
    }

    // if(this._posId == 3) {
    //   Tween.instance.set(this.getEl(), {
    //     y:dist * -1
    //   });
    //   Tween.instance.set(this._mask, {
    //     y:dist
    //   })
    // }
  }


}