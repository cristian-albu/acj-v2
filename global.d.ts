import {
    Admin,
    Article,
    ArticleCategories,
    Chapter,
    CheckoutProduct,
    Course,
    Event,
    Lesson,
    MetaUser,
    Newsletter,
    NewsletterUser,
    Order,
    PageVisit,
    Product,
    ProductOrder,
    Project,
    ProjectType,
    Session,
} from "@prisma/client";

export {};

declare global {
    export type ResponseMessage = {
        message: string;
        error?: any;
    };

    export type RequestPayload = {
        authToken: string;
    };

    export type AdminRequestPayload = {
        data: Admin;
    } & RequestPayload;

    export type ArticleRequestPayload = {
        data: Article;
    } & RequestPayload;

    export type ArticleCategoriesRequestPayload = {
        data: ArticleCategories;
    } & RequestPayload;

    export type ProjectRequestPayload = {
        data: Project;
    } & RequestPayload;

    export type ProjectTypeRequestPayload = {
        data: ProjectType;
    } & RequestPayload;

    export type SessionRequestPayload = {
        data: Session;
    } & RequestPayload;

    export type MetaUserRequestPayload = {
        data: MetaUser;
    } & RequestPayload;

    export type PageVisitRequestPayload = {
        data: PageVisit;
    } & RequestPayload;

    export type EventRequestPayload = {
        data: Event;
    } & RequestPayload;

    export type NewsletterRequestPayload = {
        data: Newsletter;
    } & RequestPayload;

    export type NewsletterUserRequestPayload = {
        data: NewsletterUser;
    } & RequestPayload;

    export type CourseRequestPayload = {
        data: Course;
    } & RequestPayload;

    export type ChapterRequestPayload = {
        data: Chapter;
    } & RequestPayload;

    export type LessonRequestPayload = {
        data: Lesson;
    } & RequestPayload;

    export type ProductRequestPayload = {
        data: Product;
    } & RequestPayload;

    export type CheckoutProductRequestPayload = {
        data: CheckoutProduct;
    } & RequestPayload;

    export type OrderRequestPayload = {
        orderData: Order;
        productsData: ProductOrder[];
    } & RequestPayload;

    export type DeleteRequestPayload = {
        data: { id: string };
    } & RequestPayload;
}
