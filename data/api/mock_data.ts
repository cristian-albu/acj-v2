import { Order, Product, ProductOrder } from "@prisma/client";

export const mock_products: Product[] = [
    {
        id: "product-id-1",
        title: "Product 1",
        slug: "product-1",
        description: "Description for Product 1",
        image: "image-url-1",
        defaultPrice: 29.99,
        metaProduct: false,
        active: true,
        digital: false,
        body: "Body for Product 1",
        stock: 100,
        createdAt: null,
        updatedAt: null,
    },
    {
        id: "product-id-2",
        title: "Product 2",
        slug: "product-2",
        description: "Description for Product 2",
        image: "image-url-2",
        defaultPrice: 19.99,
        metaProduct: true,
        active: true,
        digital: true,
        body: "Body for Product 2",
        stock: 50,
        createdAt: null,
        updatedAt: null,
    },
];

export const mock_productOrder: ProductOrder[] = mock_products.map((product: Product, index: number) => ({
    id: `product-order-id-${index}`,
    quantity: index + 1,
    currentPrice: 15 * (index + 1),
    orderId: "order-id-1",
    productId: product.id,
}));

export const mock_order: Order = {
    id: "order-id-1",
    email: "customer1@example.com",
    address: "123 Main St",
    phone: "555-1234",
    termsAccepted: true,
    paymentReceived: false,
    trackingLink: "tracking-link-1",
    referenceLink: "reference-link-1",
    confirmationEmailSent: false,
    orderCompleted: false,
    orderCanceled: false,
    amountTotal: 49.98,
    createdAt: null,
    updatedAt: null,
    sessionId: "session-id-1",
    metaUserId: "meta-user-id-1",
};
