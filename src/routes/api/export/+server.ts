import { Readable } from 'stream';
import type { record } from '$lib/interfaces.js';

export async function POST(event) {
    const request = event.request;
    const dataString = await request.text();
    const data = JSON.parse(dataString);

    const ndjson = data.map((record: record) => JSON.stringify(record)).join('\n');

    const stream = new ReadableStream({
        start(controller) {
            controller.enqueue(ndjson);
            controller.close();
        }
    });

    const headers = {
        'Content-Type': 'application/x-ndjson',
        'Content-Disposition': 'attachment; filename="data.ndjson"'
    };

    return new Response(stream, { headers });
}