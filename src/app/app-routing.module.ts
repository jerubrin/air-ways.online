import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './core/guards/auth.guard';
import RoutesPath from './shared/data/enams/RoutesPath';
import { NotFoundPageComponent } from './core/page/not-found-page/not-found-page.component';
// import { FlightsSearchFormGuard } from './core/guards/flights-search-form.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule)
  },
  {
    path: RoutesPath.BookingPage,
    loadChildren: () => import('./booking/booking.module').then((m) => m.BookingModule),
    // canActivate: [FlightsSearchFormGuard]
  },
  {
    path: RoutesPath.CartPage,
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
    // canActivate: [AuthGuard]
  },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
