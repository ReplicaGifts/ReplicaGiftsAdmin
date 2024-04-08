import { Component } from '@angular/core';
import { RouterService } from '../../service/router.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  constructor(private routerService: RouterService) {
    this.routerService.setRoute('home');
  }


}
