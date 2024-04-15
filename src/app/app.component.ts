import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationStart, NavigationEnd } from '@angular/router';
import { AdminAuthService } from './service/admin-auth.service';
import { CartService } from './service/cart.service';
import { filter } from 'rxjs';
import { Color } from '@kurkle/color';
import { toggleSidebar } from '../main';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'ReplicaGifts';
  constructor(private router: Router, private apiService: AdminAuthService, private frame: CartService) { }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.apiService.checkNoOf()
        this.frame.checkNoOf()
        toggleSidebar();
      });
  }
}
