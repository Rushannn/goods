import { DeepReadonly } from "src/app/core/utils/deep-readonly";
import { GoodsEntity } from "../models/goods-entity";
import { LoadingStatus } from "../store/goods.reducer";

export type GoodsListVM = DeepReadonly<{
  goods:GoodsEntity[],
  status: LoadingStatus
}>
