import { Component } from '@angular/core';
import { UserAuthService } from '../../service/user-auth.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../service/category.service';
import { CommonModule } from '@angular/common';
import { WishService } from '../../service/wish.service'
import { CartService } from '../../service/cart.service'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private user: UserAuthService, private router: Router, private categories: CategoryService, private wish: WishService, private cart: CartService) { }

  isAuth: boolean = false;
  category: any[] = [];
  noOfWish: number = 0;
  noOfCart: number = 0;

  ngOnInit() {
    this.user.isAuthenticated();

    this.user.isAuthenticatedValue.subscribe(value => {
      this.isAuth = value;

      this.categories.getCategory().subscribe((category: any) => { this.category = category });
    });

    this.cart.getCart().subscribe((cart: any) => {
      if (cart) {
        this.noOfCart = cart.length;
      }
    }, err => {
      this.noOfCart = 0;
    });

    this.wish.getWishList().subscribe((wish: any) => {
      if (wish) {
        this.noOfWish = wish.length;
      }
    }, err => {
      this.noOfWish = 0;
    });

  }

  navToCate(id: any) {
    this.router.navigateByUrl(`/shop?category=${id}`)
  }

  navToLogin() {
    this.router.navigate(['/login']);
  }

  navToProfile() {
    this.router.navigate(['/profile']);

  }

  navCart() {
    this.router.navigate(['/cart']);
  }

  navWish() {
    this.router.navigate(['/wish']);
  }

  nav() {
    this.router.navigate([''])
  }


  navShop() {
    this.router.navigate(['/shop']);
  }

}
