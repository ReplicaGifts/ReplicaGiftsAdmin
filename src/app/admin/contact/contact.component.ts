import { Component } from '@angular/core';
import { AdminAuthService } from '../../service/admin-auth.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private conatctServicec: AdminAuthService, private router: Router) { }

  contact: any[] = []
  contactViewed: any[] = []

  ngOnInit() {
    this.conatctServicec.conatct().subscribe((contact: any) => {
      this.contact = contact.recentlyAdded;
      this.contactViewed = contact.viewed
    })
  }

  view(id: any) {
    this.router.navigateByUrl(`/admin/contact-view/${id}`);
  }

}
