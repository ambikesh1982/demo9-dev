import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Fooditem } from 'src/app/core/models';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() fooditem: Fooditem;
  @Input() cardAction: string;
  @Output() cardActionClicked = new EventEmitter<string>();
  star: number[];

  constructor() {
    this.star = [1, 2, 3, 4, 5];
  }
  ngOnInit() {
    console.log('ProductCardComponent: ngOnInit()');
  }

  cardActionSelected(action) {
    this.cardActionClicked.emit(action);
  }

}
