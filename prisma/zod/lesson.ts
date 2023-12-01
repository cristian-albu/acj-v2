import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteChapter, RelatedChapterModel, CompleteCourse, RelatedCourseModel } from "./index"

export const LessonModel = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  thumbnail: z.string(),
  lessonBody: z.string(),
  lessonExercises: z.string(),
  lessonSolutions: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  chapterId: z.string(),
  courseId: z.string(),
})

export interface CompleteLesson extends z.infer<typeof LessonModel> {
  users: CompleteUser[]
  chapter: CompleteChapter
  course: CompleteCourse
}

/**
 * RelatedLessonModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLessonModel: z.ZodSchema<CompleteLesson> = z.lazy(() => LessonModel.extend({
  users: RelatedUserModel.array(),
  chapter: RelatedChapterModel,
  course: RelatedCourseModel,
}))
