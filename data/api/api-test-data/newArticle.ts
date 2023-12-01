const newArticlePayload: ArticleRequestPayload = {
    data: {
        id: "article-1-id",
        title: "Article 1",
        slug: "article-1",
        description: "This is the description",
        image: "image-url",
        active: true,
        body: "body text",
        categoryId: "id of category",
        createdAt: null,
        updatedAt: null,
    },
    authToken: process.env.DEV_AUTH_TOKEN!,
};

export default newArticlePayload;
