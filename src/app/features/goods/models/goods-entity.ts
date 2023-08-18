import { GoodsDTO } from "./goods-dto.model";

export type GoodsEntity = Omit<GoodsDTO, 'created_at' | 'product_id'> & {
  productId: number  // Добавляем новое свойство productId
}
