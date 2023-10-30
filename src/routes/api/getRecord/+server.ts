import { json } from '@sveltejs/kit'

// /api/newsletter GET

export async function GET(event) {
  const options: ResponseInit = {
    status: 418,
    headers: {
      X: 'Gon give it to ya',
    }
  }
  const res = await event.fetch('$lib/data/test.txt');
  const x = (await res.text());
  // x.forEach((line) => {console.log(line)});
  return new Response(x, options);
}