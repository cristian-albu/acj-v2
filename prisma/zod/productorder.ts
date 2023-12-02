import * as z from "zod"
import { CompleteOrder, RelatedOrderModel, CompleteProduct, RelatedProductModel } from "./index"

export const ProductOrderModel = z.object({
  id: z.string(),
  quantity: z.number().int(),
  currentPrice: z.number(),
  orderId: z.string(),
  productId: z.string(),
})

export interface CompleteProductOrder extends z.infer<typeof ProductOrderModel> {
  order: CompleteOrder
  product: CompleteProduct
}

/**
 * RelatedProductOrderModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductOrderModel: z.ZodSchema<CompleteProductOrder> = z.lazy(() => ProductOrderModel.extend({
  order: RelatedOrderModel,
  product: RelatedProductModel,
}))
