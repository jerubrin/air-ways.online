import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalStorageKeys } from '../../data/enams/local-storage.enum';

@Component({
  selector: 'app-second-menu',
  templateUrl: './second-menu.component.html',
  styleUrls: ['./second-menu.component.scss']
})
export class SecondMenuComponent implements OnInit {
  @Input() fromCityName?: string;

  @Input() toCityName?: string;

  @Input() forwardDate?: Date | null;

  @Input() backDate?: Date | null;

  @Input() persons?: number;

  @Input() isShowingEditButton?: boolean;

  @Output() editClick = new EventEmitter(false);

  isBooked = false;

  ngOnInit(): void {
    const data = sessionStorage.getItem(LocalStorageKeys.Booked);
    this.isBooked = !!data;

    if (data === 'true') {
      sessionStorage.setItem(LocalStorageKeys.Booked, 'false');
    } else {
      sessionStorage.removeItem(LocalStorageKeys.Booked);
    }
  }

  editButtonHandler() {
    this.editClick.emit(true);
  }
}
