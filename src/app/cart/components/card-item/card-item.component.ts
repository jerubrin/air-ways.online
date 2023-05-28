import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent {
  @Input() picture?: string;

  @Input() number?: string;

  @Output() pay = new EventEmitter();
}
