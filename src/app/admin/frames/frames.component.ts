import { Component, ElementRef, ViewChild } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-frames',
  standalone: true,
  imports: [],
  templateUrl: './frames.component.html',
  styleUrl: './frames.component.css'
})
export class FramesComponent {
  @ViewChild('canvas1') canvas1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas2') canvas2!: ElementRef<HTMLCanvasElement>;

  canvas1Context!: CanvasRenderingContext2D;
  canvas2Context!: CanvasRenderingContext2D;

  zIndexCanvas1: number = 1;
  zIndexCanvas2: number = 0;

  frameSrc: string = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6eed28d6-e8da-4210-84ca-6971c6c8f053/da51a2p-6d2ba5ab-4882-4d4d-9a51-5ea937225d04.png/v1/fill/w_998,h_801,strp/pink_blue_frame_shape_by_lashonda1980_da51a2p-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODIyIiwicGF0aCI6IlwvZlwvNmVlZDI4ZDYtZThkYS00MjEwLTg0Y2EtNjk3MWM2YzhmMDUzXC9kYTUxYTJwLTZkMmJhNWFiLTQ4ODItNGQ0ZC05YTUxLTVlYTkzNzIyNWQwNC5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.0bBhA7jnjISRoyVSWQq-576HxRYmwRBLIcoGW-m5530'; // Replace with the path to your frame image
  imageSrc: string | ArrayBuffer | null = null;

  imageX: number = 0;
  imageY: number = 0;
  isDragging: boolean = false;

  constructor() { }

  ngOnInit() {
    this.canvas1Context = this.canvas1.nativeElement.getContext('2d')!;
    this.canvas2Context = this.canvas2.nativeElement.getContext('2d')!;

    this.loadFrame();
  }

  loadFrame() {
    const frameImg = new Image();
    frameImg.onload = () => {
      this.canvas1Context.clearRect(0, 0, this.canvas1.nativeElement.width, this.canvas1.nativeElement.height);
      this.canvas1Context.drawImage(frameImg, 0, 0, this.canvas1.nativeElement.width, this.canvas1.nativeElement.height);
    };
    frameImg.src = this.frameSrc;
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
        this.redrawCanvas2();
      };
      reader.readAsDataURL(file);
    }
  }

  hoverHandler(isHovering: boolean) {
    if (isHovering) {
      this.zIndexCanvas2 = 5;
    } else {
      this.zIndexCanvas2 = 0;
    }
  }

  redrawCanvas2() {
    if (!this.imageSrc) return;

    const img = new Image();
    img.onload = () => {
      this.canvas2Context.clearRect(0, 0, this.canvas2.nativeElement.width, this.canvas2.nativeElement.height);
      this.canvas2Context.drawImage(img, this.imageX, this.imageY);
    };
    img.src = this.imageSrc.toString();
  }

  mouseDownHandler(event: MouseEvent) {
    const rect = this.canvas2.nativeElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (mouseX >= this.imageX && mouseX <= (this.imageX + this.canvas2.nativeElement.width) &&
      mouseY >= this.imageY && mouseY <= (this.imageY + this.canvas2.nativeElement.height)) {
      this.isDragging = true;
    }
  }

  mouseMoveHandler(event: MouseEvent) {
    if (this.isDragging) {
      const rect = this.canvas2.nativeElement.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      this.imageX = mouseX;
      this.imageY = mouseY;

      this.redrawCanvas2();
    }
  }

  mouseUpHandler(event: MouseEvent) {
    this.isDragging = false;
  }
}