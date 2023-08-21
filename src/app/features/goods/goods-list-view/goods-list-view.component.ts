import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsListVM } from './goods-list-view-model';

@Component({
  selector: 'app-goods-list-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './goods-list-view.component.html',
  styleUrls: ['./goods-list-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoodsListViewComponent {
  @Output() edit: EventEmitter<number> = new EventEmitter<number>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  @Input({ required: true }) vm!: GoodsListVM;

  onEdit(id: number, event:Event) {
    event.preventDefault();
    this.edit.emit(id)
  }

  onDelete(id: number, event:Event) {
    event.preventDefault();
    this.delete.emit(id)
  }
}
