import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsEditorViewComponent } from '../goods-editor-view/goods-editor-view.component';
import { Store, select } from '@ngrx/store';
import { selectGoodById } from '../store/goods.reducer';
import { Observable } from 'rxjs';
import { GoodsEntity } from '../models/goods-entity';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'app-goods-editor-container',
  standalone: true,
  imports: [
    CommonModule,
    GoodsEditorViewComponent,
    LetDirective
  ],
  templateUrl: './goods-editor-container.component.html',
  styleUrls: ['./goods-editor-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoodsEditorContainerComponent implements OnInit{

  @Input() productIdOnEdit!: number | null
  @Output() saveEditorForm = new EventEmitter;
  @Output() closeEditorForm = new EventEmitter;

  private readonly store = inject(Store);
  public editedProduct$!: Observable<GoodsEntity | undefined>

  ngOnInit(): void {
    this.setEditedProduct()
  }


  setEditedProduct() {
    if (this.productIdOnEdit) {
      this.editedProduct$ = this.store.select(selectGoodById(this.productIdOnEdit))
    }
  }

  onSaveEditorForm(event: Event) {
    this.saveEditorForm.emit(event);
  }

  onCloseEditorForm() {
    this.closeEditorForm.emit();
  }
}
