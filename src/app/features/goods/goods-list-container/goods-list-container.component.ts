import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { GoodsActions } from '../store/goods.actions';
import { GoodsEntity } from '../models/goods-entity';
import { Observable } from 'rxjs';
import { LoadingStatus, selectAllGoods, selectGoodsStatus } from '../store/goods.reducer';
import { GoodsListViewComponent } from '../goods-list-view/goods-list-view.component';
import { LetDirective } from '@ngrx/component';
import { GoodsEditorContainerComponent } from '../goods-editor-container/goods-editor-container.component';

@Component({
  selector: 'app-goods-list-container',
  standalone: true,
  imports: [
    CommonModule,
    GoodsListViewComponent,
    GoodsEditorContainerComponent,
    LetDirective
  ],
  templateUrl: './goods-list-container.component.html',
  styleUrls: ['./goods-list-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoodsListContainerComponent {

  private readonly store = inject(Store);
  public readonly goods$: Observable<GoodsEntity[]> = this.store.select(selectAllGoods);
  public readonly status$: Observable<LoadingStatus> = this.store.select(selectGoodsStatus);
  public modalOpened = false;
  public productIdOnEdit: number | null = null;

  constructor() {
    this.init()
  }


  private init() {
    this.store.dispatch(GoodsActions.loadGoods())
  }

  openEditorModal() {
    this.modalOpened = true;
  }

  closeEditorModal() {
    this.modalOpened = false;
  }

  onsaveEditorForm(event: Event) {
    this.closeEditorModal();
    this.productIdOnEdit = null;
    this.store.dispatch(GoodsActions.editProduct({ product: event }))
  }

  onEdit(id: number) {
    this.productIdOnEdit = id;
    this.openEditorModal()
  }

  onDelete(id: number) {
    console.log('this product must be delete', id)
  }

  onCloseEditorForm() {
    this.closeEditorModal()
    this.productIdOnEdit = null;
  }

  onAddProduct() {
    this.openEditorModal()
  }
}
