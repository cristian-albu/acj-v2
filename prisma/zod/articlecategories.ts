import * as z from "zod"
import { CompleteArticle, RelatedArticleModel } from "./index"

export const ArticleCategoriesModel = z.object({
  name: z.string(),
})

export interface CompleteArticleCategories extends z.infer<typeof ArticleCategoriesModel> {
  articles: CompleteArticle[]
}

/**
 * RelatedArticleCategoriesModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedArticleCategoriesModel: z.ZodSchema<CompleteArticleCategories> = z.lazy(() => ArticleCategoriesModel.extend({
  articles: RelatedArticleModel.array(),
}))
