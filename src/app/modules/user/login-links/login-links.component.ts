import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login-links',
  templateUrl: './login-links.component.html',
  styleUrls: ['./login-links.component.less']
})
export class LoginLinksComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
