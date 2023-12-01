import { errorMessages, successMessages } from "@/data/api/statusMessages";
import { ArticleModel } from "@/prisma/zod";
import buildResponse from "@/shared/lib/buildResponse";
import db from "@/shared/lib/prismaClient";
import validateReqToken from "@/shared/lib/validateReqToken";

export async function POST(request: Request) {
    const { data, authToken } = (await request.json()) as ArticleRequestPayload;

    // Validate the auth token of the sender
    if (!validateReqToken(authToken)) {
        return buildResponse({ message: errorMessages.invalidToken }, 400);
    }

    // Parse the content and validate the payload structure
    if (!ArticleModel.safeParse(data).success) {
        return buildResponse({ message: errorMessages.wrongPayload }, 400);
    }

    try {
        const { id, createdAt, updatedAt, ...articleData } = data;
        await db.article.update({ where: { id: id }, data: articleData });
        return buildResponse({ message: successMessages.updatedSuccessfully }, 200);
    } catch (error) {
        return buildResponse({ message: errorMessages.updateFailed }, 500);
    }
}
