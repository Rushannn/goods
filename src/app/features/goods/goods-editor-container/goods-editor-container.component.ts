import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsEditorViewComponent, NewProduct } from '../goods-editor-view/goods-editor-view.component';
import { Store } from '@ngrx/store';
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
export class GoodsEditorContainerComponent implements OnInit {

  @Input() productIdOnEdit!: number | null
  @Output() editProduct = new EventEmitter;
  @Output() addProduct = new EventEmitter;
  @Output() closeEditorForm = new EventEmitter;

  private readonly store = inject(Store);
  public productForChange$!: Observable<GoodsEntity | undefined>

  ngOnInit(): void {
    this.setEditedProduct()
  }

  setEditedProduct() {
    if (this.productIdOnEdit) {
      this.productForChange$ = this.store.select(selectGoodById(this.productIdOnEdit))
    }
  }

  onEditProduct(event: Event) {
    this.editProduct.emit(event)
  }

  onAddProduct(newProduct: NewProduct) {
    this.addProduct.emit(newProduct)
  }

  onCloseEditorForm() {
    this.closeEditorForm.emit();
  }
}
