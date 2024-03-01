

// Takes a POST request with a JSON body containing the text to be annotated. This is sent to host.docker.internal:5000/annotate.
export async function POST(event) {
    const request = event.request;
    // console.log(JSON.stringify({"text": await request.json()}));
    const response = await fetch("http://host.docker.internal:5000/annotate", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(await request.json()),
    });

    return response;
}