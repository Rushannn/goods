import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { GoodsEntity } from "../models/goods-entity";
import { NewProduct } from "../goods-editor-view/goods-editor-view.component";

export const GoodsActions = createActionGroup({
  source: 'Goods',
  events: {
    'Load Goods': emptyProps(),
    'Load Goods Success': props<{ goods: GoodsEntity[] }>(),
    'Load Goods Failure': props<{ error: string }>(),
    'Edit Product': props<{ product: GoodsEntity }>(),
    'Edit Product Success': props<{ product: GoodsEntity }>(),
    'Edit Product Failure': props<{ error: string }>(),
    'Add Product': props<{ newProduct: NewProduct}>(),
    'Add Product Success': props<{ product: GoodsEntity }>(),
    'AddProduct Failure': props<{ error: string }>(),
    'Delete Product': props<{ id: number }>(),
    'Delete Product Success': props<{ id: number }>(),
    'Delete Product Failure': props<{ error: string }>(),
  },
});
