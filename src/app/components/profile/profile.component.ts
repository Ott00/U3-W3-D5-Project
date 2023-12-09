import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userInfo!: User;
  constructor() {}

  ngOnInit(): void {
    this.getUserInfo();
    console.log(this.userInfo);
  }

  getUserInfo() {
    const userString: any = localStorage.getItem('user');
    const user = JSON.parse(userString).user;
    this.userInfo = user;
  }
}
