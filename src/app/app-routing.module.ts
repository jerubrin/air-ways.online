import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import RoutesPath from './core/data/enams/RoutesPath';
import { NotFoundPageComponent } from './core/page/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },

  {
    path: RoutesPath.BookingPage,
    loadChildren: () =>
      // eslint-disable-next-line implicit-arrow-linebreak
      import('./booking/booking.module').then((m) => m.BookingModule),
  },
  {
    path: RoutesPath.CartPage,
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
