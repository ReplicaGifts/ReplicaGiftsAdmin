import { Component } from '@angular/core';
import { AdminAuthService } from '../service/admin-auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  show: boolean = false;

  constructor(private auth: AdminAuthService, private router: Router) { }

  log = {
    username: '',
    password: '',
    email: ''
  }

  register() {
    if (this.log.username.length > 0 && this.log.password.length > 0 && this.log.email.length > 0) {
      this.auth.reg(this.log).subscribe(data => {
        console.log(data);
        sessionStorage.setItem('admin', JSON.stringify(data));
        this.router.navigate(['admin']);
      }, error => {
        console.log(error);
      })
    }
  }

  login() {
    if (this.log.password.length > 0 && this.log.email.length > 0) {
      this.auth.login(this.log).subscribe(user => {
        console.log(user);
        sessionStorage.setItem('admin', JSON.stringify(user));
        this.router.navigate(['admin']);
      }, error => {
        console.log(error);
      });
    }
  }


}
