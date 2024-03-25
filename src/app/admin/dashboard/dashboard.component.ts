import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


  constructor(private order: CartService, private router: Router) { }

  orders: any[] = [];
  reorders: any[] = [];

  ngOnInit() {
    this.order.getAllFrames().subscribe(frames => { this.reorders = frames.recentlyAdded; this.order = frames.remainingOrders });
  }

  nav(id: any) {
    this.router.navigateByUrl(`/admin/order-view/${id}`);
  }

}
