import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteLesson, RelatedLessonModel, CompleteCourse, RelatedCourseModel } from "./index"

export const ChapterModel = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  thumbnail: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  courseId: z.string(),
})

export interface CompleteChapter extends z.infer<typeof ChapterModel> {
  users: CompleteUser[]
  lessons: CompleteLesson[]
  course: CompleteCourse
}

/**
 * RelatedChapterModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedChapterModel: z.ZodSchema<CompleteChapter> = z.lazy(() => ChapterModel.extend({
  users: RelatedUserModel.array(),
  lessons: RelatedLessonModel.array(),
  course: RelatedCourseModel,
}))
