import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { CartService } from '../service/cart.service';
import { AdminAuthService } from '../service/admin-auth.service';
import { NgIf } from '@angular/common';
import { RouterService } from '../service/router.service';
import { Color } from '@kurkle/color';

import { AdminLoginComponent } from '../admin-login/admin-login.component';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, AdminLoginComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {


  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.getScreenSize();
  }

  private getScreenSize() {
    // Check if the screen is mobile (adjust threshold as needed)
    this.isMobile = window.innerWidth <= 768;
    console.log(`Is mobile screen? ${this.isMobile}`);
  }

  isMobile = false;

  constructor(private router: Router, private cart: CartService, private admin: AdminAuthService, private routerService: RouterService) { }

  noOfOrder = 0;
  noOfConatct = 0;
  user: any;
  display = '';


  ngOnInit() {
    this.admin.checkNoOf();
    this.cart.checkNoOf();
    this.cart.noOfOrder.subscribe(result => this.noOfOrder = result);

    this.admin.getUser().subscribe(user => {
      this.user = user

    })
    this.admin.noOfCantact.subscribe(result => { console.log(result); this.noOfConatct = result });

    this.routerService.route.subscribe(route => { this.display = route })


  }
  navPrintType() {
    this.router.navigateByUrl('/admin/category?printType=true')
  }

  navCon() {
    this.display = "contact"
    this.router.navigate(['/admin', 'contact'])
  }


  setDisabledState(name: string) {
    // if (name.includes('order') || name === 'home') {

    //   this.cart.checkNoOf();
    // }

    // sessionStorage.setItem('display', name);
    // this.display = name;
    if (this.isMobile)
      this.toggle()
  }

  nav() {
    this.setDisabledState('status');
    this.router.navigate(['/admin', 'orders-status'])
  }

  logout() {
    // Clear session storage
    sessionStorage.removeItem('admin');
    // Add any other cleanup code here if needed
    // Redirect to login page or any other appropriate page
    this.router.navigate(['/login']); // Assuming your login page route is '/login'
  }


  toggle() {

    const select = (el: string, all = false): Element[] => {
      el = el.trim();
      if (all) {
        return Array.from(document.querySelectorAll(el));
      } else {
        const element = document.querySelector(el);
        return element ? [element] : [];
      }
    };


    const body = select('body')[0] as HTMLElement;
    body.classList.toggle('toggle-sidebar');
  }

}
