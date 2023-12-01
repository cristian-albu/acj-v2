import * as z from "zod"
import { CompleteNewsletterUser, RelatedNewsletterUserModel } from "./index"

export const NewsletterModel = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
  htmlText: z.string(),
  sent: z.boolean(),
  createdAt: z.date().nullish(),
  sentAt: z.date().nullish(),
})

export interface CompleteNewsletter extends z.infer<typeof NewsletterModel> {
  users: CompleteNewsletterUser[]
}

/**
 * RelatedNewsletterModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedNewsletterModel: z.ZodSchema<CompleteNewsletter> = z.lazy(() => NewsletterModel.extend({
  users: RelatedNewsletterUserModel.array(),
}))
