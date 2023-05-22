import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

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

  editShow?: boolean;

  constructor(private router: Router) {}

  editButtonHandler() {
    this.editClick.emit(true);
  }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.editShow = val.url.substring(0, 16) === '/booking/flights';
      }
    });
  }
}
