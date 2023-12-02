import { errorMessages, successMessages } from "@/data/api/statusMessages";
import { ProductModel } from "@/prisma/zod";
import buildResponse from "@/shared/lib/buildResponse";
import db from "@/shared/lib/prismaClient";
import validateReqToken from "@/shared/lib/validateReqToken";

export async function POST(request: Request) {
    const { data, authToken } = (await request.json()) as ProductRequestPayload;

    const hasToken = await validateReqToken(authToken);

    // Validate the auth token of the sender
    if (!hasToken) {
        return buildResponse({ message: errorMessages.invalidToken }, 400);
    }

    if (!ProductModel.safeParse(data).success) {
        return buildResponse({ message: errorMessages.wrongPayload }, 400);
    }

    try {
        return buildResponse({ message: successMessages.createdSuccessfully }, 200);
    } catch (error) {
        return buildResponse({ message: errorMessages.creationFailed }, 500);
    }
}
