import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpService } from "src/app/core/services/http.service";
import { GoodsActions } from "./goods.actions";
import { catchError, exhaustMap, map, switchMap } from "rxjs/operators";
import { GoodsDTO } from "../models/goods-dto.model";
import { goodsDTOAdapter } from "../models/goods-dto.adapter";
import { of } from "rxjs";

export const loadGoods$ = createEffect(
  (actions$ = inject(Actions), httpService = inject(HttpService)) => {
    return actions$.pipe(
      ofType(GoodsActions.loadGoods),
      switchMap(() => {
        return httpService.get<GoodsDTO[]>('goods')
          .pipe(
            map(
              goodsDto => GoodsActions.loadGoodsSuccess({
                goods: goodsDto.map(good => goodsDTOAdapter.DTOToEntity(good))
              })
            ),
            catchError(error =>
              of(GoodsActions.loadGoodsFailure({ error }))
            )
          )
      })
    )
  },
  { functional: true }
)

export const editProduct$ = createEffect(
  (actions$ = inject(Actions), httpService = inject(HttpService)) => {
    return actions$.pipe(
      ofType(GoodsActions.editProduct),
      switchMap(
        ({ product }) => {
          return httpService.post<GoodsDTO, any>(`goods/${product.id}`, goodsDTOAdapter.entityToDTO(product))
            .pipe(
              map(
                goodsDto => GoodsActions.editProductSuccess({
                  product: goodsDTOAdapter.DTOToEntity(goodsDto)
                })
              ),
              catchError(error =>
                of(GoodsActions.loadGoodsFailure({ error }))
              )
            )
        })
    )
  },
  { functional: true }
)