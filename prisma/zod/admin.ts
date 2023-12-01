import * as z from "zod"

export const AdminModel = z.object({
  id: z.string(),
  email: z.string(),
  hash: z.string(),
  sessionId: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})
