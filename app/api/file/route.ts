export async function POST(request: Request) {
    console.log("success");
    return new Response(
        JSON.stringify(
            "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ),
        {
            status: 200,
        }
    );
}
