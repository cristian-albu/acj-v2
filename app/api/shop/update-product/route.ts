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
        const { id, createdAt, updatedAt, ...product } = data;
        await db.product.update({ where: { id: id }, data: product });

        return buildResponse({ message: successMessages.updatedSuccessfully }, 200);
    } catch (error) {
        return buildResponse({ message: errorMessages.updateFailed }, 500);
    }
}
