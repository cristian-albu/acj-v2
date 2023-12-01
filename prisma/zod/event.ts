import * as z from "zod"
import { CompletePageVisit, RelatedPageVisitModel, CompleteMetaUser, RelatedMetaUserModel } from "./index"

export const EventModel = z.object({
  id: z.string(),
  name: z.string(),
  pageVisitId: z.string(),
  metaUserId: z.string(),
})

export interface CompleteEvent extends z.infer<typeof EventModel> {
  pageVisit: CompletePageVisit
  metaUser: CompleteMetaUser
}

/**
 * RelatedEventModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedEventModel: z.ZodSchema<CompleteEvent> = z.lazy(() => EventModel.extend({
  pageVisit: RelatedPageVisitModel,
  metaUser: RelatedMetaUserModel,
}))
