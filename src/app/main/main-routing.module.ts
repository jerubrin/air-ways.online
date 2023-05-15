import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import RoutesPath from '../shared/data/enams/RoutesPath';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  { path: '', redirectTo: RoutesPath.MainPage, pathMatch: 'prefix' },
  {
    path: RoutesPath.MainPage,
    component: MainPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
