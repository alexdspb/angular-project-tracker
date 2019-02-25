import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginLinksComponent } from './login-links/login-links.component';

@NgModule({
  declarations: [
      LoginLinksComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoginLinksComponent
  ]
})
export class UserModule { }
