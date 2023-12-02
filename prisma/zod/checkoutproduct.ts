import * as z from "zod"
import { CompleteOrder, RelatedOrderModel, CompleteProduct, RelatedProductModel } from "./index"

export const CheckoutProductModel = z.object({
  id: z.string(),
  currentPrice: z.number().int(),
  quantity: z.number().int(),
  productId: z.string(),
})

export interface CompleteCheckoutProduct extends z.infer<typeof CheckoutProductModel> {
  orders: CompleteOrder[]
  product: CompleteProduct
}

/**
 * RelatedCheckoutProductModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCheckoutProductModel: z.ZodSchema<CompleteCheckoutProduct> = z.lazy(() => CheckoutProductModel.extend({
  orders: RelatedOrderModel.array(),
  product: RelatedProductModel,
}))
