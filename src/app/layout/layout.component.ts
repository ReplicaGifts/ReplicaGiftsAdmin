import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet, NavigationStart } from '@angular/router';
import { filter } from 'rxjs';
import { RouterService } from '../service/router.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {


}
