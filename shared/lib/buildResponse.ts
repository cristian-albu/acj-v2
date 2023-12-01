export default function buildResponse(message: ResponseMessage, status: number) {
    return new Response(JSON.stringify(message), {
        status: status,
    });
}
