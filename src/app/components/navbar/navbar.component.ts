import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/models/auth-data';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userLogged!: AuthData | null;

  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
    this.authSrv.restore();
    this.authSrv.user$.subscribe((_user) => {
      this.userLogged = _user;
    });
  }

  logout() {
    this.authSrv.logout();
  }
}
