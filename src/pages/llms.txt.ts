import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const episodes = (await getCollection('episodes'))
    .filter((ep) => ep.data.rights_status !== 'local_only')
    .sort((a, b) => b.data.published_at.getTime() - a.data.published_at.getTime());

  const lines: string[] = [
    '# 听阅 CastNote',
    '',
    '> 用中文读英文播客 — 翻译整理英文播客为中文长文，涵盖科技、商业、经济、心理等领域。',
    '',
    '## 站点说明',
    '',
    '- 网站: https://castnote.github.io',
    '- RSS: https://castnote.github.io/rss.xml',
    '- 电子书: https://castnote.github.io/ebooks/ai-podcast-chinese-anthology.epub',
    '- 每篇文章可通过在 URL 末尾加 `.md` 获取 Markdown 格式',
    '- 全站 Markdown 合集: https://castnote.github.io/llms-full.txt',
    '',
    '## 文章列表',
    '',
  ];

  for (const ep of episodes) {
    const url = `/episodes/${ep.data.podcast_slug}/${ep.data.episode_slug}/`;
    const mdUrl = `/episodes/${ep.data.podcast_slug}/${ep.data.episode_slug}.md`;
    const date = ep.data.published_at.toISOString().slice(0, 10);
    lines.push(`- [${ep.data.title}](${url}): ${ep.data.podcast} · ${date} ([Markdown](${mdUrl}))`);
  }

  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
