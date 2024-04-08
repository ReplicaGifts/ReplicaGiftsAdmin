import { Component } from '@angular/core';
import { AdminAuthService } from '../../service/admin-auth.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RouterService } from '../../service/router.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private routerService: RouterService, private conatctServicec: AdminAuthService, private router: Router) { }

  contact: any[] = []
  contactViewed: any[] = []

  ngOnInit() {
    this.get()

    this.routerService.setRoute('contact');
  }

  get() {
    this.conatctServicec.conatct().subscribe((contact: any) => {
      this.contact = contact.recentlyAdded;
      this.contactViewed = contact.viewed
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

}
