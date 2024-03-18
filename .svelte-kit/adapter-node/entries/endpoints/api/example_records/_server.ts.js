import { promises } from "fs";
async function GET({ url }) {
  const fileName = url.searchParams.get("name");
  if (fileName == null) {
    return new Response(JSON.stringify({ error: "Missing name parameter" }), { status: 400 });
  }
  try {
    const filePath = "src/lib/data/example_records/" + fileName;
    const fileContent = await promises.readFile(filePath, "utf8");
    return new Response(fileContent, { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: `Error reading file: ${err}` }), { status: 500 });
  }
}
export {
  GET
};
