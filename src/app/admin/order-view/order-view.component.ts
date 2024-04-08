import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-view',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.css'
})
export class OrderViewComponent {

  constructor(private route: ActivatedRoute, private frames: CartService, private http: HttpClient, private location: Location) { }
  private unsubscribe$: Subject<void> = new Subject<void>();

  frameId: any;

  data: any = {};

  selection: any

  tracking_id: any = "";

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(params => {
      this.frameId = params['id'];
      console.log(this.frameId);
      if (this.frameId) {
        this.frames.frameData(this.frameId).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe((res: any) => {
          this.data = res;
          this.selection = res.deliveryStatus;
          this.tracking_id = res.tracking_id
          console.log(this.data);
        });
      }
    });
  }


  downloadImage(imageUrl: string, filename: string): void {
    // Fetch image data using HttpClient
    this.http.get(imageUrl, { responseType: 'blob' }).subscribe((blob: Blob) => {
      // Create URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create anchor element dynamically
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;

      // Programmatically click the anchor element to trigger download
      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  update(id: any, selection: any) {
    this.frames.updateStauts(id, selection).subscribe(data => console.log(data));
  }

  updateTrackId(id: any, tracking: any) {
    // this.frames.updatetrackingId(id, tracking).subscribe(data => console.log(data));


    Swal.fire({
      title: 'Update Tracking ID',
      text: 'Are you sure you want to update the tracking ID?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
       
        this.frames.updatetrackingId(id, tracking).subscribe(data => {
          console.log(data);
          Swal.fire('Success', 'Tracking ID updated successfully', 'success');
        }, error => {
          console.error(error);
          Swal.fire('Error', 'Failed to update tracking ID', 'error');
        });
      }
    });
  }

  goBack() {
    this.location.back();
  }

}
