import * as z from "zod"
import { CompleteCheckoutProduct, RelatedCheckoutProductModel } from "./index"

export const ProductModel = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  image: z.string(),
  defaultPrice: z.number().int(),
  metaProduct: z.boolean(),
  active: z.boolean(),
  digital: z.boolean(),
  body: z.string(),
  stock: z.number().int(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteProduct extends z.infer<typeof ProductModel> {
  checkoutProduct: CompleteCheckoutProduct[]
}

/**
 * RelatedProductModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductModel: z.ZodSchema<CompleteProduct> = z.lazy(() => ProductModel.extend({
  checkoutProduct: RelatedCheckoutProductModel.array(),
}))
