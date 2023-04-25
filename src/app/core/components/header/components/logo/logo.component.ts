import { Component } from '@angular/core';
import RoutesPath from '../../../../models/RoutesPath';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export default class LogoComponent {
  public mainPageRouterLink: string = RoutesPath.mainPage;
}
