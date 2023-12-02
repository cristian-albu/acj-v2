import { errorMessages, successMessages } from "@/data/api/statusMessages";
import buildResponse from "@/shared/lib/buildResponse";
import db from "@/shared/lib/prismaClient";
import validateReqToken from "@/shared/lib/validateReqToken";

export async function POST(request: Request) {
    const { data, authToken } = (await request.json()) as DeleteRequestPayload;

    // Validate the auth token of the sender
    if (!validateReqToken(authToken)) {
        return buildResponse({ message: errorMessages.invalidToken }, 400);
    }

    try {
        const { id } = data;
        await db.article.delete({ where: { id: id } });
        return buildResponse({ message: successMessages.deletedSuccessfully }, 200);
    } catch (error) {
        return buildResponse({ message: errorMessages.deletionFailed }, 500);
    }
}
