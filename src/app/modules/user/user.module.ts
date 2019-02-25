import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {LoginLinksComponent} from './login-links/login-links.component';
import {LoginPageComponent} from './login-page/login-page.component';

@NgModule({
    declarations: [
        LoginLinksComponent,
        LoginPageComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    exports: [
        LoginLinksComponent,
        LoginPageComponent,
    ]
})
export class UserModule {
}
