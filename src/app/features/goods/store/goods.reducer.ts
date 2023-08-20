import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { GoodsEntity } from "../models/goods-entity";
import { createFeature, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { GoodsActions } from "./goods.actions";

export const GOODS_FEATURE_KEY = 'goods';

export type LoadingStatus = "init" | "loading" | "loaded" | "error";

export interface GoodsState extends EntityState<GoodsEntity> {
  status: LoadingStatus
};

export const goodsAdapter: EntityAdapter<GoodsEntity> =
  createEntityAdapter<GoodsEntity>();

export const initialGoodsState: GoodsState = goodsAdapter.getInitialState({
  status: 'init'
})

export const goodsFeature = createFeature({
  name: GOODS_FEATURE_KEY,
  reducer: createReducer(
    initialGoodsState,

    on(GoodsActions.loadGoods, (state) => ({
      ...state,
      status: 'loading' as const
    })),

    on(GoodsActions.loadGoodsSuccess, (state, { goods }) =>
      goodsAdapter.setAll(goods, {
        ...state,
        status: 'loaded' as const
      })),

    on(GoodsActions.loadGoodsFailure, (state) => ({
      ...state,
      status: 'error' as const
    })),

    on(GoodsActions.editProduct, (state) => ({
      ...state,
      status: 'loading' as const
    })),

    on(GoodsActions.editProductSuccess, (state, { product }) =>
      goodsAdapter.updateOne({
        id: product.id,
        changes: product
      }, {
        ...state,
        status: 'loaded' as const
      })
    ),

    on(GoodsActions.editProductFailure, (state) => ({
      ...state,
      status: 'error' as const
    })),

    on(GoodsActions.addProductSuccess, (state, { product }) =>
      goodsAdapter.addOne(product, {
        ...state
      })
    ),

    on(GoodsActions.deleteProductSuccess, (state, { id }) =>
      goodsAdapter.removeOne(id, { ...state })
    )

  )
});

export const selectGoodsState =
  createFeatureSelector<GoodsState>(GOODS_FEATURE_KEY);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = goodsAdapter.getSelectors();

export const selectAllGoods = createSelector(
  selectGoodsState,
  (state: GoodsState) => selectAll(state)
);

export const selectGoodsStatus = createSelector(
  selectGoodsState,
  (state: GoodsState) => state.status
);

export const selectGoodById = (id: number) => createSelector(
  selectGoodsState,
  (state: GoodsState) => state.entities[id]
);


