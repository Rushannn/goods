import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { GoodsEntity } from "../models/goods-entity";
import { GoodsDTO } from "../models/goods-dto.model";

export const GoodsActions = createActionGroup({
  source: 'Goods',
  events: {
    'Load Goods': emptyProps(),
    'Load Goods Success': props<{ goods: GoodsEntity[] }>(),
    'Load Goods Failure': props<{ error: string }>(),
    'Edit Product': props<{ product: any }>(),
    'Edit Product Success': props<{ product: GoodsEntity }>(),
    'Edit Product Failure': props<{ error: string }>(),
  },
});
