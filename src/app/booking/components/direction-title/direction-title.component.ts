import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-direction-title',
  templateUrl: './direction-title.component.html',
  styleUrls: ['./direction-title.component.scss']
})
export class DirectionTitleComponent {
  @Input() fromCityName?: string;

  @Input() toCityName?: string;

  @Input() isForward?: boolean;
}
