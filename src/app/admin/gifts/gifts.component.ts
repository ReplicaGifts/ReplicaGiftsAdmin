import { Component } from '@angular/core';
import { GiftsService } from '../../service/gifts.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gifts',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './gifts.component.html',
  styleUrl: './gifts.component.css'
})
export class GiftsComponent {

  constructor(private giftsService: GiftsService) { }

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

        console.log(data)
        this.close()
        this.get()

      }
    });
  }

  delete(id: any) {
    this.giftsService.delete(id).subscribe((data: any) => {
      this.get()
      console.log(data)

      this.close()

    });
  }


  submit() {
    this.giftsService.adaGift(this.data).subscribe((data: any) => {
      this.get()

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
  }

}
