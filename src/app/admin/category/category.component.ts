import { Component } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  constructor(private category: CategoryService, private route: ActivatedRoute) { }

  categories: any[] = [];
  flag: boolean = false;

  idtoUPdate: any;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.flag = params['printType'];
      this.get();
    }
    )


  }

  get() {


    if (this.flag) {
      this.category.getprintType().subscribe((category: any) => { this.categories = category })

    } else {

      this.category.getCategoryOnly().subscribe((category: any) => { this.categories = category })
    }

  }


  showUpdate: boolean = false;


  data = {
    categoryName: '',
    thumbnail: ''
  }

  addThub(e: any) {
    this.data.thumbnail = e.target.files[0];
  }

  submit() {
    console.log(this.data)

    if (this.flag) {

      this.category.addPrintType(this.data).subscribe(data => {
        console.log(data);


        this.get();
      })
    } else {

      this.category.addProduct(this.data).subscribe(data => {
        console.log(data);

        this.get();
      })
    }
    this.close()
  }




  update() {

    this.category.update(this.data, this.idtoUPdate).subscribe(data => {
      console.log(data);
      this.get();
      this.close()
    });
  }


  edit(data: any) {

    this.idtoUPdate = data._id;
    this.showUpdate = true;
    this.data = data;

  }


  delete(id: any) {

    this.category.delete(id).subscribe(data => {
      this.get()
    });



  }


  close() {
    this.showUpdate = false
    this.data = {
      categoryName: '',
      thumbnail: ''
    }
  }

}
