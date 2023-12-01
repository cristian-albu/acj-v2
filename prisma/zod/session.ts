import * as z from "zod"
import { CompletePageVisit, RelatedPageVisitModel, CompleteMetaUser, RelatedMetaUserModel, CompleteOrder, RelatedOrderModel } from "./index"

export const SessionModel = z.object({
  id: z.string(),
  createdAt: z.date().nullish(),
  metaUserId: z.string(),
})

export interface CompleteSession extends z.infer<typeof SessionModel> {
  pageVisits: CompletePageVisit[]
  metaUser: CompleteMetaUser
  Order: CompleteOrder[]
}

/**
 * RelatedSessionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSessionModel: z.ZodSchema<CompleteSession> = z.lazy(() => SessionModel.extend({
  pageVisits: RelatedPageVisitModel.array(),
  metaUser: RelatedMetaUserModel,
  Order: RelatedOrderModel.array(),
}))
