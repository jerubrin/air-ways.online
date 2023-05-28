import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import RoutesPath from './shared/data/enams/RoutesPath';
import { NotFoundPageComponent } from './core/page/not-found-page/not-found-page.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule)
  },
  {
    path: RoutesPath.BookingPage,
    loadChildren: () => import('./booking/booking.module').then((m) => m.BookingModule)
  },
  {
    path: RoutesPath.CartPage,
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
    canActivate: [AuthGuard]
  },
  {
    path: RoutesPath.UserAccountPage,
    loadChildren: () => import('./user-account/user-account.module').then((m) => m.UserAccountModule),
    canActivate: [AuthGuard]
  },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
