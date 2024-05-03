import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-gift-view-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gift-view-table.component.html',
  styleUrl: './gift-view-table.component.css'
})
export class GiftViewTableComponent {

  @Input() gifts: any[] = [];
  @Input() isHome: boolean = false;

  @Output() edit = new EventEmitter();
  @Output() _delete = new EventEmitter();

  ngOnInit() {
    console.log(this.gifts)
  }

}
