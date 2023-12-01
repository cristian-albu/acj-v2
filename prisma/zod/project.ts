import * as z from "zod"
import { CompleteProjectType, RelatedProjectTypeModel } from "./index"

export const ProjectModel = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  image: z.string(),
  active: z.boolean(),
  scope: z.string(),
  strategy: z.string(),
  execution: z.string(),
  results: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  projectId: z.string(),
})

export interface CompleteProject extends z.infer<typeof ProjectModel> {
  project: CompleteProjectType
}

/**
 * RelatedProjectModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProjectModel: z.ZodSchema<CompleteProject> = z.lazy(() => ProjectModel.extend({
  project: RelatedProjectTypeModel,
}))
