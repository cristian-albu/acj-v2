import * as z from "zod"
import { CompleteNewsletterUser, RelatedNewsletterUserModel, CompleteUser, RelatedUserModel, CompleteEvent, RelatedEventModel, CompleteOrder, RelatedOrderModel, CompleteSession, RelatedSessionModel } from "./index"

export const MetaUserModel = z.object({
  id: z.string(),
  ip: z.string(),
  yesToAnalytics: z.boolean(),
  yesToPrivateData: z.boolean(),
  yesToAds: z.boolean(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteMetaUser extends z.infer<typeof MetaUserModel> {
  newsletterUser: CompleteNewsletterUser[]
  user: CompleteUser[]
  events: CompleteEvent[]
  orders: CompleteOrder[]
  sessions: CompleteSession[]
}

/**
 * RelatedMetaUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMetaUserModel: z.ZodSchema<CompleteMetaUser> = z.lazy(() => MetaUserModel.extend({
  newsletterUser: RelatedNewsletterUserModel.array(),
  user: RelatedUserModel.array(),
  events: RelatedEventModel.array(),
  orders: RelatedOrderModel.array(),
  sessions: RelatedSessionModel.array(),
}))
