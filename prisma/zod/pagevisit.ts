import * as z from "zod"
import { CompleteEvent, RelatedEventModel, CompleteSession, RelatedSessionModel } from "./index"

export const PageVisitModel = z.object({
  id: z.string(),
  enteredAt: z.date().nullish(),
  enterTarget: z.string(),
  leftAt: z.date(),
  leftTarget: z.string(),
  sessionId: z.string(),
})

export interface CompletePageVisit extends z.infer<typeof PageVisitModel> {
  events: CompleteEvent[]
  session: CompleteSession
}

/**
 * RelatedPageVisitModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPageVisitModel: z.ZodSchema<CompletePageVisit> = z.lazy(() => PageVisitModel.extend({
  events: RelatedEventModel.array(),
  session: RelatedSessionModel,
}))
