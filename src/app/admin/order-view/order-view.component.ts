import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-order-view',
  standalone: true,
  imports: [NgFor],
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.css'
})
export class OrderViewComponent {

  constructor(private route: ActivatedRoute, private frames: CartService, private http: HttpClient) { }
  private unsubscribe$: Subject<void> = new Subject<void>();

  frameId: any;

  data: any = {};

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

}
