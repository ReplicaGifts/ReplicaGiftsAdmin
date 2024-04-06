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
  noOfConatct = 0;
  user: any;

  ngOnInit() {
    this.admin.checkNoOf();
    this.cart.checkNoOf();
    this.cart.noOfOrder.subscribe(result => this.noOfOrder = result);

    this.admin.getUser().subscribe(user => {
      this.user = user

    })
    this.admin.noOfCantact.subscribe(result => { console.log(result); this.noOfConatct = result });

  }
  navPrintType() {
    this.router.navigateByUrl('/admin/category?printType=true')
  }

  navCon() {
    this.display = "contact"
    this.router.navigate(['/admin', 'contact'])
  }

  display = sessionStorage.getItem('display') ?? 'home'

  setDisabledState(name: string) {
    if (name.includes('order') || name === 'home') {

      this.cart.checkNoOf();
    }

    sessionStorage.setItem('display', name);
    this.display = name;
  }

  nav() {
    this.setDisabledState('status');
    this.router.navigate(['/admin', 'orders-status'])
  }


}
