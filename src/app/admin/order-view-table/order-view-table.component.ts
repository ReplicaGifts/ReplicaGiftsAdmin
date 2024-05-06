import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-view-table',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './order-view-table.component.html',
  styleUrl: './order-view-table.component.css'
})
export class OrderViewTableComponent {

  @Input() orders: any[] = [];

  @Input() action: boolean = false;

  @Input() title: string | boolean = 'Recent Order'

  @Input() isHome: boolean = false;

  constructor(private order: CartService, private router: Router) { }

  nav(id: any) {
    this.order.setFrameViewed(id).subscribe(frames => {
      this.order.checkNoOf();
    });
    this.router.navigateByUrl(`/admin/order-view/${id}`);
  }

}
