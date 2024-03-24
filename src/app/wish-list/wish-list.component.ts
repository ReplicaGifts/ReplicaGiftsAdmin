import { Component } from '@angular/core';
import { WishService } from '../service/wish.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {

  constructor(public wish: WishService, private router: Router) { }

  wishList: any[] = [];

  ngOnInit() {
    this.get()
  }

  get() {
    this.wish.getWishList().subscribe((wishList: any) => {
      console.log(wishList);
      this.wishList = wishList;
    });
  }
  removeWish(id: any) {
    this.wish.removeWish(id).subscribe((wish: any) => { console.log(wish); this.get() });
  }


  navToProduct(id: any) {
    this.router.navigateByUrl(`/product?id=${id}`)
  }

  home() {
    this.router.navigate(['/'])
  }

}
