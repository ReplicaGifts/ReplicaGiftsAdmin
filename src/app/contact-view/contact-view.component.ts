import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminAuthService } from '../service/admin-auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact-view',
  standalone: true,
  imports: [],
  templateUrl: './contact-view.component.html',
  styleUrl: './contact-view.component.css'
})
export class ContactViewComponent {


  constructor(private route: ActivatedRoute, private contact: AdminAuthService, private location: Location) { }

  data: any;

  ngOnInit(): void {

    this.contact.checkNoOf()

    this.route.params.subscribe(params => {
      let id = params['id'];

      this.contact.viewedConatct(id).subscribe((contact: any) => this.data = contact.contact);
    });
  }

  goBack() {
    this.location.back();
  }

}
