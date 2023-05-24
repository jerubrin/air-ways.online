import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sort-title',
  templateUrl: './sort-title.component.html',
  styleUrls: ['./sort-title.component.scss']
})
export class SortTitleComponent {
  @Input() title?: string;

  @Input() hideSort?: boolean;

  @Input() isUpActive?: boolean;

  @Input() isDownActive?: boolean;

  @Output() sortUpEmitter = new EventEmitter<() => void>();

  @Output() sortDownEmitter = new EventEmitter<() => void>();

  sortUp() {
    this.sortUpEmitter.emit();
  }

  sortDown() {
    this.sortDownEmitter.emit();
  }
}
