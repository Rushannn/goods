import { GoodsDTO } from "./goods-dto.model"
import { GoodsEntity } from "./goods-entity"

type GoodsDTOAdapter = {
  DTOToEntity(dto: GoodsDTO): GoodsEntity
  entityToDTO(entity: GoodsEntity): GoodsDTO
}

export const goodsDTOAdapter: GoodsDTOAdapter = {
  DTOToEntity(dto) {
    const { created_at, product_id, ...otherFields } = dto;

    return {
      ...otherFields,
      productId: dto.product_id
    };
  },

  entityToDTO(entity) {
    const { productId, ...otherFields } = entity;

    return {
      ...otherFields,
      product_id: entity.productId
    };
  }
};
