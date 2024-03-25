import { Component } from '@angular/core';
import { AdminAuthService } from '../../service/admin-auth.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private conatctServicec: AdminAuthService) { }

  contact: any[] = []

  ngOnInit() {
    this.conatctServicec.conatct().subscribe((contact: any) => this.contact = contact)
  }


}
