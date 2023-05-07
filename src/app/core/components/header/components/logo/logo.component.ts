import { Component } from '@angular/core';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  public pageRouterLink = RoutesPath;
}
