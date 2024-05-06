import { Component } from '@angular/core';
import { AdminAuthService } from '../../service/admin-auth.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RouterService } from '../../service/router.service';
import { toggleSidebar } from '../../../main';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private routerService: RouterService, private conatctServicec: AdminAuthService, private router: Router) { }

  pagenation = {
    page: 1,
    limit: 20,
  }

  totalOrders = 0;


  contact: any[] = []
  contactViewed: any[] = []

  ngOnInit() {
    this.getN()

    this.routerService.setRoute('contact');
    toggleSidebar();
  }

  getN() {
    this.conatctServicec.conatct().subscribe((contact: any) => {
      this.contact = contact.recentlyAdded;
      this.get()
    });
  }

  get() {
    this.conatctServicec.conatctFilter(this.pagenation).subscribe((contact: any) => {
      console.log('contact', contact)
      this.contactViewed = contact.contact;
      this.totalOrders = contact.totalContact;
    });
  }

  view(id: any) {
    this.router.navigateByUrl(`/admin/contact-view/${id}`);
  }

  deleteProduct(id: any) {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.conatctServicec.delete(id).subscribe((data: any) => {
          console.log(data);


          this.get()
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });


        });
      }
    });
  }

  next() {
    if (this.pagenation.page * this.pagenation.limit < this.totalOrders) {
      ++this.pagenation.page;
      this.get();
    }

  }

  prev() {

    if (this.pagenation.page > 1) {
      --this.pagenation.page
      this.get();
    }

  }


}
