import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginModalComponent} from '../login-modal/login-modal.component';

@Component({
  selector: 'app-login-links',
  templateUrl: './login-links.component.html',
  styleUrls: ['./login-links.component.less']
})
export class LoginLinksComponent implements OnInit {

  constructor(
      private authService: AuthService,
      private modalService: NgbModal,
  ) { }

  ngOnInit() {
  }

  showLoginModal() {
    this.modalService.open(LoginModalComponent);
  }
}
