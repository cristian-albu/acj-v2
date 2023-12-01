import * as z from "zod"
import { CompleteCheckoutProduct, RelatedCheckoutProductModel, CompleteSession, RelatedSessionModel, CompleteMetaUser, RelatedMetaUserModel } from "./index"

export const OrderModel = z.object({
  id: z.string(),
  email: z.string(),
  address: z.string(),
  phone: z.string(),
  termsAccepted: z.boolean(),
  paymentReceived: z.boolean(),
  trackingLink: z.string(),
  referenceLink: z.string(),
  confirmationEmailSent: z.boolean(),
  orderCompleted: z.boolean(),
  orderCanceled: z.boolean(),
  amountTotal: z.number().int(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  sessionId: z.string(),
  metaUserId: z.string(),
})

export interface CompleteOrder extends z.infer<typeof OrderModel> {
  products: CompleteCheckoutProduct[]
  session: CompleteSession
  metaUser: CompleteMetaUser
}

/**
 * RelatedOrderModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderModel: z.ZodSchema<CompleteOrder> = z.lazy(() => OrderModel.extend({
  products: RelatedCheckoutProductModel.array(),
  session: RelatedSessionModel,
  metaUser: RelatedMetaUserModel,
}))
