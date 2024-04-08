import { Component } from '@angular/core';
import { GiftsService } from '../../service/gifts.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterService } from '../../service/router.service';
@Component({
  selector: 'app-gifts',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './gifts.component.html',
  styleUrl: './gifts.component.css'
})
export class GiftsComponent {

  constructor(private giftsService: GiftsService, private routerService: RouterService) { }

  data = {
    name: '',
    quantity: 1,
    thumbnail: '',

    price: 1
  }

  gifts: any[] = [];

  showUpdate: boolean = false;

  idToUpdate: any;

  ngOnInit() {
    this.get()
    this.routerService.setRoute('gift');


  }

  get() {
    this.giftsService.getGifts().subscribe((gifts: any) => {
      this.gifts = gifts;
    });
  }

  addThub(e: any) {
    this.data.thumbnail = e.target.files[0];
  }

  edit(data: any) {
    this.showUpdate = true;
    this.data = data
    this.idToUpdate = data._id
  }

  update() {
    this.giftsService.updateGift(this.data, this.idToUpdate).subscribe((data: any) => {
      if (data.success) {

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Gift has been updated",
          showConfirmButton: false,
          timer: 1500
        });
        console.log(data)
        this.close()
        this.get()

      }
    });
  }

  delete(id: any) {
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
        this.giftsService.delete(id).subscribe((data: any) => {
          this.get()
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });

          this.close()

        });
      }
    });
  }


  submit() {
    this.giftsService.adaGift(this.data).subscribe((data: any) => {
      this.get()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Gift has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      this.close()
    });
  }

  close() {
    this.data = {
      name: '',
      quantity: 1,
      thumbnail: '',

      price: 1
    }

    this.showUpdate = false;
  }

}
