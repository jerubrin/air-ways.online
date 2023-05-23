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

  @Input() forwardDate?: Date | null;

  @Input() backDate?: Date | null;

  @Input() persons?: number;

  @Input() isShowingEditButton?: boolean;

  @Output() editClick = new EventEmitter(false);

  constructor(private router: Router) {}

  editButtonHandler() {
    this.editClick.emit(true);
  }
}
