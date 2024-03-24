import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  constructor(private order: CartService, private router: Router) { }

  orders: any[] = [];

  ngOnInit() {
    this.order.getAllFrames().subscribe(frames => { this.orders = frames });
  }

  nav(id: any) {
    this.router.navigateByUrl(`/admin/order-view/${id}`);
  }

}
