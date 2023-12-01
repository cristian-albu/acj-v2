import * as z from "zod"
import { CompleteNewsletter, RelatedNewsletterModel, CompleteMetaUser, RelatedMetaUserModel } from "./index"

export const NewsletterUserModel = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  metaUserId: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteNewsletterUser extends z.infer<typeof NewsletterUserModel> {
  users: CompleteNewsletter[]
  metaUser: CompleteMetaUser
}

/**
 * RelatedNewsletterUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedNewsletterUserModel: z.ZodSchema<CompleteNewsletterUser> = z.lazy(() => NewsletterUserModel.extend({
  users: RelatedNewsletterModel.array(),
  metaUser: RelatedMetaUserModel,
}))
