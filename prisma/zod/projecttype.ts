import * as z from "zod"
import { CompleteProject, RelatedProjectModel } from "./index"

export const ProjectTypeModel = z.object({
  name: z.string(),
})

export interface CompleteProjectType extends z.infer<typeof ProjectTypeModel> {
  projects: CompleteProject[]
}

/**
 * RelatedProjectTypeModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProjectTypeModel: z.ZodSchema<CompleteProjectType> = z.lazy(() => ProjectTypeModel.extend({
  projects: RelatedProjectModel.array(),
}))
