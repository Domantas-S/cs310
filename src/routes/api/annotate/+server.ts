import { ModelType } from '$lib/datatypes.js';


// Takes a POST request with a JSON body containing the text to be annotated. This is sent to host.docker.internal:5000/annotate.
export async function POST(event) {
    const request = await event.request.json();
    let response;
    
    switch (parseInt(request.model)) {
        case ModelType.MISTRAL7B:
            response = await fetch("http://host.docker.internal:5000/mistral7b", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            });

            return response;
        
        case ModelType.FLANT5:
            response = await fetch("http://host.docker.internal:5000/flant5", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            });

            return response;
        
        case ModelType.UIE:
            response = await fetch("http://host.docker.internal:5000/uie", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            });

            return response;
        
        default:
            return new Response(JSON.stringify({ error: "Invalid model parameter" }), { status: 400 });
    }
}
