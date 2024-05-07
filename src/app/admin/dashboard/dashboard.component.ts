import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Router } from '@angular/router';
import { RouterService } from '../../service/router.service';
import { OrderViewTableComponent } from '../order-view-table/order-view-table.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DatePipe, OrderViewTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


  constructor(private order: CartService, private router: Router, private routerService: RouterService) { }

  orders: any[] = [];
  reorders: any[] = [];
  delivered: any[] = [];

  ngOnInit() {
    this.order.getAllFrames().subscribe(frames => { this.orders = frames.recentlyAdded; this.reorders = frames.remainingOrders; console.log(frames); this.delivered = frames.delivered });
    this.routerService.setRoute('status');
  }

  nav(id: any) {
    this.order.setFrameViewed(id).subscribe(frames => {
      this.order.checkNoOf();
    });
    this.router.navigateByUrl(`/admin/order-view/${id}`);
  }




}
