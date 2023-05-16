import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-second-menu',
  templateUrl: './second-menu.component.html',
  styleUrls: ['./second-menu.component.scss']
})
export class SecondMenuComponent {
  @Input() fromCityName?: string;

  @Input() toCityName?: string;

  @Input() forwardDate?: Date;

  @Input() backDate?: Date;

  @Input() persons?: number;

  @Input() isShowingEditButton?: boolean;

  @Output() editClick = new EventEmitter(false);

  constructor(
    private router: Router,
  ) {}

  editButtonHandler() {
    this.editClick.emit(true);
  }
}
