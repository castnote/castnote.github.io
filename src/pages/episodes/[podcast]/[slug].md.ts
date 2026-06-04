import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'node:fs';

export const getStaticPaths: GetStaticPaths = async () => {
  const episodes = (await getCollection('episodes')).filter(
    (ep) => ep.data.rights_status !== 'local_only'
  );

  return episodes.map((episode) => ({
    params: {
      podcast: episode.data.podcast_slug,
      slug: episode.data.episode_slug,
    },
    props: { episode },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const episode = props.episode;

  // Read the raw markdown file (frontmatter + body)
  const filePath = episode.filePath;
  if (!filePath) {
    return new Response('Not found', { status: 404 });
  }

  const raw = fs.readFileSync(filePath, 'utf-8');

  return new Response(raw, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
