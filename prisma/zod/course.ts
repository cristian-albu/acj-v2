import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteChapter, RelatedChapterModel, CompleteLesson, RelatedLessonModel } from "./index"

export const CourseModel = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  thumbnail: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteCourse extends z.infer<typeof CourseModel> {
  users: CompleteUser[]
  chapters: CompleteChapter[]
  lessons: CompleteLesson[]
}

/**
 * RelatedCourseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCourseModel: z.ZodSchema<CompleteCourse> = z.lazy(() => CourseModel.extend({
  users: RelatedUserModel.array(),
  chapters: RelatedChapterModel.array(),
  lessons: RelatedLessonModel.array(),
}))
