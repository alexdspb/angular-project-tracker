import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {LoginLinksComponent} from './login-links/login-links.component';
import {LoginPageComponent} from './login-page/login-page.component';
import { LoginModalComponent } from './login-modal/login-modal.component';

@NgModule({
    declarations: [
        LoginLinksComponent,
        LoginPageComponent,
        LoginModalComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    exports: [
        LoginLinksComponent,
        LoginPageComponent,
    ],
    entryComponents: [
        LoginModalComponent
    ],
})
export class UserModule {
}
