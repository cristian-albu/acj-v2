import { errorMessages, successMessages } from "@/data/api/statusMessages";
import { ArticleModel, OrderModel, ProductOrderModel } from "@/prisma/zod";
import buildResponse from "@/shared/lib/buildResponse";
import db from "@/shared/lib/prismaClient";
import validateReqToken from "@/shared/lib/validateReqToken";
import { ProductOrder } from "@prisma/client";

export async function POST(request: Request) {
    const { orderData, productsData, authToken } = (await request.json()) as OrderRequestPayload;

    // Validate the auth token of the sender
    if (!validateReqToken(authToken)) {
        return buildResponse({ message: errorMessages.invalidToken }, 400);
    }

    // Parse the content and validate the payload structure
    if (!OrderModel.safeParse(orderData).success) {
        return buildResponse({ message: errorMessages.wrongPayload }, 400);
    }

    if (!Array.isArray(productsData)) {
        return buildResponse({ message: errorMessages.wrongPayload }, 400);
    }

    productsData.forEach((productOrder: ProductOrder) => {
        if (!ProductOrderModel.safeParse(productOrder).success) {
            return buildResponse({ message: errorMessages.wrongPayload }, 400);
        }
    });

    try {
        return buildResponse({ message: successMessages.createdSuccessfully }, 200);
    } catch (error) {
        return buildResponse({ message: errorMessages.creationFailed }, 500);
    }
}
