export type GoodsDTO = {
  id: number
  created_at?: Date
  product_id: number
  name: string
  price: string
  quantity: number
  image: {
    url?: string,
    base64?: string
  }
}
