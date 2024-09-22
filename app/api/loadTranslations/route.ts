import fs from 'fs';
import path from 'path';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get('lang');
  const ns = searchParams.get('ns');

  if (!lang || !ns) {
    console.error('Language or namespace not provided');
    return new Response(JSON.stringify({ error: 'Language or namespace missing' }), { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'locales', lang, `${ns}.json`);
  console.log(`Loading translations from ${filePath}`);

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return new Response(data, { status: 200 });
  } catch (err) {
    console.error(`Error loading translations from ${filePath}:`, err);
    return new Response(JSON.stringify({ error: 'Failed to load translations' }), { status: 500 });
  }
}
