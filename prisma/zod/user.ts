import * as z from "zod"
import { CompleteCourse, RelatedCourseModel, CompleteChapter, RelatedChapterModel, CompleteLesson, RelatedLessonModel, CompleteMetaUser, RelatedMetaUserModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  githubId: z.string(),
  githubAccessToken: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  metaUserId: z.string(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  courses: CompleteCourse[]
  chapters: CompleteChapter[]
  lessons: CompleteLesson[]
  metaUser: CompleteMetaUser
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  courses: RelatedCourseModel.array(),
  chapters: RelatedChapterModel.array(),
  lessons: RelatedLessonModel.array(),
  metaUser: RelatedMetaUserModel,
}))
