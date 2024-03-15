import { promises as fs } from 'fs';

export async function GET({ url }) {

    // const currentWorkingDirectory = process.cwd();
    // console.log('Current working directory:', currentWorkingDirectory);
    const fileName = url.searchParams.get('name');

    if (fileName == null) {
        return new Response(JSON.stringify({ error: "Missing name parameter" }), { status: 400 });
    }

    try {
        const filePath = "src/lib/data/example_records/" + fileName;
        const fileContent = await fs.readFile(filePath, 'utf8');
        return new Response(fileContent, { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: `Error reading file: ${err}` }), { status: 500 });
    }
}