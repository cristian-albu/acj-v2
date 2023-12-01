import * as z from "zod"
import { CompleteArticleCategories, RelatedArticleCategoriesModel } from "./index"

export const ArticleModel = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  image: z.string(),
  active: z.boolean(),
  body: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  categoryId: z.string(),
})

export interface CompleteArticle extends z.infer<typeof ArticleModel> {
  category: CompleteArticleCategories
}

/**
 * RelatedArticleModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedArticleModel: z.ZodSchema<CompleteArticle> = z.lazy(() => ArticleModel.extend({
  category: RelatedArticleCategoriesModel,
}))
