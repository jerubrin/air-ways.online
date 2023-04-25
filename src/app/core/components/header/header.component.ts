import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import RoutesPath from '../../models/RoutesPath';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent implements OnInit, OnDestroy {
  isShowStepper = false;

  isShowBookFlights = true;

  headerClass = '';

  private subscriptions: Subscription[] = [];

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const currentUrl = event.url;
          if (currentUrl.includes(RoutesPath.mainPage)) {
            this.isShowStepper = false;
            this.isShowBookFlights = true;
            this.headerClass = RoutesPath.mainPage;
          } else if (currentUrl.includes(RoutesPath.bookingPage)) {
            this.isShowStepper = true;
            this.isShowBookFlights = false;
            this.headerClass = RoutesPath.bookingPage;
          } else if (currentUrl.includes(RoutesPath.shoppingCartPage)) {
            this.isShowStepper = false;
            this.isShowBookFlights = false;
            this.headerClass = RoutesPath.shoppingCartPage;
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
