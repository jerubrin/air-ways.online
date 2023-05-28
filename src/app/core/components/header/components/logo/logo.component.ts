import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainStoreService } from 'src/app/core/services/main-store.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  constructor(private router: Router, private store: MainStoreService) {}

  goToMainPage(): void {
    this.store.clearDataInSessionStorage();
    sessionStorage.clear();
    this.router.navigate([RoutesPath.MainPage]);
  }
}
