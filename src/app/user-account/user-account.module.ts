import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { UserAccountPageComponent } from './pages/user-account-page/user-account-page.component';
import { UserAccountRoutingModule } from './user-account-routing.module';
import { UserInfoComponent } from './components/user-info/user-info.component';

@NgModule({
  declarations: [UserAccountPageComponent, UserInfoComponent],
  imports: [CommonModule, CoreModule, SharedModule, UserAccountRoutingModule]
})
export class UserAccountModule {}
