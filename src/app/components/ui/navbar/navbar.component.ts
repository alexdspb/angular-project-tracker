import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {LoginLinksComponent} from '../../../modules/user/login-links/login-links.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})

export class NavbarComponent implements OnInit {
  public url: string

  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
  }

}
