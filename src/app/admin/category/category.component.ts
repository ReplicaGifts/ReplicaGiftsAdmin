import { Component } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterService } from '../../service/router.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  constructor(private category: CategoryService, private route: ActivatedRoute, private routerService: RouterService) { }

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
      this.category.getprintType().subscribe((category: any) => { this.categories = category });
      this.routerService.setRoute('print')


    } else {

      this.category.getCategoryOnly().subscribe((category: any) => { this.categories = category });
      this.routerService.setRoute('cate')

    }

  }


  showUpdate: boolean = false;


  data = {
    categoryName: '',
    thumbnail: '',
    frame: false,
  }

  addThub(e: any) {
    this.data.thumbnail = e.target.files[0];
  }

  submit() {
    console.log(this.data)

    if (this.flag) {

      this.category.addPrintType(this.data).subscribe(data => {
        console.log(data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Prit Type has been saved",
          showConfirmButton: false,
          timer: 1500
        });

        this.get();
      })
    } else {

      this.category.addProduct(this.data).subscribe(data => {
        console.log(data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Category has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        this.get();
      })
    }
    this.close()
  }




  update() {

    this.category.update(this.data, this.idtoUPdate).subscribe(data => {
      console.log(data);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Update data has been saved",
        showConfirmButton: false,
        timer: 1500
      });

      this.get();
      this.close();
    });
  }


  edit(data: any) {
    console.log(data);
    this.idtoUPdate = data._id;
    this.showUpdate = true;
    this.data = data;

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
        this.category.delete(id).subscribe(data => {
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


  close() {

    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      // Reset the file input
      fileInput.value = '';
    }
    this.showUpdate = false
    this.data = {
      categoryName: '',
      thumbnail: '',
      frame: false,

    }
  }

}
