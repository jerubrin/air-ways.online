import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import RoutesPath from '../../../shared/data/enams/RoutesPath';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
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
          switch (currentUrl.split('/')[1]) {
            case RoutesPath.MainPage:
              this.isShowStepper = false;
              this.isShowBookFlights = true;
              this.headerClass = RoutesPath.MainPage;
              break;
            case RoutesPath.BookingPage:
              this.isShowStepper = true;
              this.isShowBookFlights = false;
              this.headerClass = RoutesPath.BookingPage;
              break;
            case RoutesPath.CartPage:
              this.isShowStepper = false;
              this.isShowBookFlights = false;
              this.headerClass = RoutesPath.CartPage;
              break;
            default:
              this.isShowStepper = false;
              this.isShowBookFlights = true;
              this.headerClass = RoutesPath.MainPage;
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const element = document.querySelector('.header') as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  }
}
