import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QueryParamsService } from 'src/app/core/services/query-params.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  constructor(private router: Router, private queryParamsService: QueryParamsService) {}

  goToMainPage(): void {
    const queryParams = this.queryParamsService.getQueryParams();
    this.router.navigate([RoutesPath.MainPage], { queryParams });
  }
}
