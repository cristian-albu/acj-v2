import { Article } from "@prisma/client";

export {};

declare global {
    export type ResponseMessage = {
        message: string;
        error?: any;
    };

    export type RequestPayload = {
        authToken: string;
    };

    export type ArticleRequestPayload = {
        data: Article;
    } & RequestPayload;

    export type ArticleDeleteRequestPayload = {
        data: { id: string };
    } & RequestPayload;
}
