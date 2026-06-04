import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'node:fs';

export const GET: APIRoute = async () => {
  const episodes = (await getCollection('episodes'))
    .filter((ep) => ep.data.rights_status !== 'local_only')
    .sort((a, b) => b.data.published_at.getTime() - a.data.published_at.getTime());

  const parts: string[] = [
    '# 听阅 CastNote - 完整文章合集',
    '',
    `共 ${episodes.length} 篇文章。`,
    '',
  ];

  for (const ep of episodes) {
    const date = ep.data.published_at.toISOString().slice(0, 10);

    // Read raw file and strip frontmatter
    let body = '';
    if (ep.filePath) {
      const raw = fs.readFileSync(ep.filePath, 'utf-8');
      const fmEnd = raw.indexOf('---', raw.indexOf('---') + 3);
      body = fmEnd !== -1 ? raw.slice(fmEnd + 3).trim() : raw;
    }

    parts.push('---', '');
    parts.push(`## ${ep.data.title}`);
    parts.push(`${ep.data.podcast} · ${date}`);
    if (ep.data.summary) {
      parts.push('', `> ${ep.data.summary}`);
    }
    parts.push('', body, '');
  }

  return new Response(parts.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
