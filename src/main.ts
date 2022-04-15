import { Conf } from './core/conf';
import { Item } from './parts/item'
import './style.css'


// 複製
const num = Conf.instance.NUM;
const temp:HTMLElement = document.querySelector('.l-main-item') as HTMLElement;
for(let i = 0; i < num; i++) {
  document.querySelector('.l-main')?.append(temp.cloneNode(true));
}

document.querySelectorAll('.l-main-item').forEach((val,i) => {
  new Item({
    el:val as HTMLElement,
    id:i,
  })
})