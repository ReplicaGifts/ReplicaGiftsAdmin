import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { CartService } from '../service/cart.service';
import { AdminAuthService } from '../service/admin-auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private router: Router, private cart: CartService, private admin: AdminAuthService) { }

  noOfOrder = 0;
  user: any;

  ngOnInit() {
    this.cart.checkNoOfOrder();
    this.cart.noOfOrder.subscribe(result => this.noOfOrder = result);

    this.admin.getUser().subscribe(user => { this.user = user })

  }
  navPrintType() {
    this.router.navigateByUrl('/admin/category?printType=true')
  }

  display = "home"

  setDisabledState(name: string) {
    if (name.includes('order')) {

      this.cart.checkNoOfOrder();
    }
    this.display = name;
  }

  nav() {
    this.display = "home"
    this.router.navigate(['/admin'])
  }


}
