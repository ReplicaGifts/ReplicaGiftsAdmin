import { Component } from '@angular/core';
import { AdminAuthService } from '../../service/admin-auth.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RouterService } from '../../service/router.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private routerService: RouterService, private conatctServicec: AdminAuthService, private router: Router) { }

  statusOptions = ['recent', 'viewed'];

  pagenation = {
    page: 1,
    limit: 20,
    status: this.statusOptions[0]
  }


  totalOrders = 0;


  contact: any[] = []
  contactViewed: any[] = []

  ngOnInit() {
    this.get()

    this.routerService.setRoute('contact');
  }

  get() {
    this.conatctServicec.conatctFilter(this.pagenation).subscribe((contact: any) => {
      console.log('contact', contact)
      this.contactViewed = contact.contact;
      this.totalOrders = contact.count;
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
