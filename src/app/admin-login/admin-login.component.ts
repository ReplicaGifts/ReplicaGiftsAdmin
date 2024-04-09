import { Component } from '@angular/core';
import { AdminAuthService } from '../service/admin-auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuthService } from '../service/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  show: boolean = false;

  constructor(private auth: AdminAuthService, private router: Router, private formBuilder: FormBuilder) { }


  email = new FormControl("", [Validators.required, Validators.email]);
  password = new FormControl("", Validators.required);
  requiredErr: string[] = [];
  submit() {
    if (this.email.valid && this.password.valid) {
      this.auth.login({ email: this.email.value, password: this.password.value }).subscribe(user => {
        console.log(user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login successed",
          showConfirmButton: false,
          timer: 1500
        });
        sessionStorage.setItem('admin', JSON.stringify(user));
        this.auth.isAuthenticated();

        this.router.navigate(['']);
      }, error => {
        console.log(error);
      });
    }

    else if (!this.email.valid && !this.password.valid) {
      this.requiredErr[0] = 'both';
      this.requiredErr[1] = 'Required fields'
    } else if (!this.email.valid) {
      this.requiredErr[0] = 'email';
      this.requiredErr[1] = 'Enter valid email format';

    } else {
      this.requiredErr[0] = 'password';
      this.requiredErr[1] = 'Enter Your Password, it is required';
    }

  }

  // login() {
  //   if (this.myForm.valid) {
  //     this.auth.login(this.myForm.value).subscribe(user => {
  //       Swal.fire({
  //         position: "top-end",
  //         icon: "success",
  //         title: "Login successed",
  //         showConfirmButton: false,
  //         timer: 1500
  //       });
  //       sessionStorage.setItem('admin', JSON.stringify(user));
  //       this.auth.isAuthenticated();

  //       this.router.navigate(['']);
  //     }, error => {
  //       console.log(error);
  //     });
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Fill required fields",
  //     });
  //   }
  // }



}
