"use server";
export default async function validateReqToken(authToken: any) {
    if (authToken != process.env.DEV_AUTH_TOKEN) {
        return true;
    } else {
        return false;
    }
}
