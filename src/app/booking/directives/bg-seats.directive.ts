import { Directive, ElementRef, HostBinding, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { Seats } from '../models/seats.model';

@Directive({
  selector: '[appBgSeats]'
})
export class BgSeatsDirective implements OnChanges {
  @Input() appBgSeats?: Seats;

  @Input() isHighlight?: boolean;

  @HostBinding('style.color') elColor: string | null = null;

  constructor(
    private element: ElementRef,
    private render: Renderer2,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['appBgSeats']) return;

    let color = '#828282';

    if (this.appBgSeats?.avaible && this.appBgSeats?.total) {
      color = '#F1C933';
      if ((this.appBgSeats.avaible / this.appBgSeats.total) > 0.5) {
        color = '#7F8906';
      }
      if (this.appBgSeats.avaible <= 10) {
        color = '#B3261E';
      }
    }

    if (!this.isHighlight) {
      color += '4d';
    }

    this.render.setStyle(this.element.nativeElement, 'background', color);
  }
}
