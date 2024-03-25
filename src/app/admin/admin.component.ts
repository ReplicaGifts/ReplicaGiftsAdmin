import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationExtras, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private router: Router) { }

  navPrintType() {
    this.router.navigateByUrl('/admin/category?printType=true')
  }

  display = "home"

  setDisabledState(name: string) {
    this.display = name;
  }

}
