import { errorMessages, successMessages } from "@/data/api/statusMessages";
import { ArticleModel, OrderModel, ProductOrderModel } from "@/prisma/zod";
import buildResponse from "@/shared/lib/buildResponse";
import db from "@/shared/lib/prismaClient";
import validateReqToken from "@/shared/lib/validateReqToken";
import { Order, ProductOrder } from "@prisma/client";

export async function POST(request: Request) {
    const { orderData, productsData, authToken } = (await request.json()) as OrderRequestPayload;

    // Validate the auth token of the sender
    if (!validateReqToken(authToken)) {
        return buildResponse({ message: errorMessages.invalidToken }, 400);
    }

    // Parse the content and validate the payload structure
    if (!Array.isArray(productsData) || !OrderModel.safeParse(orderData).success) {
        return buildResponse({ message: errorMessages.wrongPayload }, 400);
    }

    const orderProducts: Omit<ProductOrder, "id">[] = [];
    productsData.forEach((productOrder: ProductOrder) => {
        if (!ProductOrderModel.safeParse(productOrder).success) {
            return buildResponse({ message: errorMessages.wrongPayload }, 400);
        } else {
            const { id, ...productData } = productOrder;
            orderProducts.push(productData);
        }
    });

    try {
        const { email, address, phone, termsAccepted, metaUserId, sessionId } = orderData;

        const newOrder: Omit<Order, "id" | "createdAt" | "updatedAt"> = {
            email,
            address,
            phone,
            termsAccepted,
            metaUserId,
            sessionId,
            amountTotal: 0,
            paymentReceived: false,
            confirmationEmailSent: false,
            orderCanceled: false,
            orderCompleted: false,
            trackingLink: "",
            referenceLink: "",
        };

        const dbRes = await db.order.create({ data: newOrder });

        console.log(dbRes);
        return buildResponse({ message: successMessages.createdSuccessfully }, 200);
    } catch (error) {
        return buildResponse({ message: errorMessages.creationFailed }, 500);
    }
}
