import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
  constructor(public cart: CartService, private router: Router) { }

  cartList: any[] = [];

  total: any = 0;



  ngOnInit() {
    this.total = 0;
    this.get();


  }

  get(isDelet: boolean = false) {
    this.cart.getCart().subscribe((cart: any) => {
      console.log(cart);
      this.cartList = cart;
      if (isDelet) {
        this.total = 0
      }
      this.cartList.map((cart) => {
        this.total = this.total + cart.userWant.totalAmount;
      })
    });
  }
  remove(id: any) {
    this.cart.remove(id).subscribe((wish: any) => { console.log(wish); this.get(true) });
  }


  navToProduct(id: any) {
    this.router.navigateByUrl(`/product?id=${id}`)

  }

  checkout() {
    this.router.navigate(['/check-out'])
  }

  updateQt(id: any, q: any) {
    this.cart.editQuantity(id, q).subscribe((wish: any) => { console.log(wish); this.get(true) });
  }

}
