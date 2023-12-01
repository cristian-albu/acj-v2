import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const UserLoginLogModel = z.object({
  id: z.string(),
  loginAt: z.date(),
  userId: z.string(),
})

export interface CompleteUserLoginLog extends z.infer<typeof UserLoginLogModel> {
  user: CompleteUser
}

/**
 * RelatedUserLoginLogModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserLoginLogModel: z.ZodSchema<CompleteUserLoginLog> = z.lazy(() => UserLoginLogModel.extend({
  user: RelatedUserModel,
}))
