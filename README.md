# Podread

Podread is a static Chinese podcast reading site published at `https://podread.github.io`.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Publishing

The source lives on `main`. The published static files live on `gh-pages`.
Keep existing `_astro` assets when publishing, because browsers or CDN caches can keep older HTML that references older hashed CSS files.

```bash
npm run build
rm -rf /tmp/podread-gh-pages
git clone --branch gh-pages --single-branch git@github.com:podread/podread.github.io.git /tmp/podread-gh-pages
find /tmp/podread-gh-pages -mindepth 1 \
  ! -path '/tmp/podread-gh-pages/.git*' \
  ! -path '/tmp/podread-gh-pages/_astro*' \
  -exec rm -rf {} +
cp -R dist/. /tmp/podread-gh-pages/
git -C /tmp/podread-gh-pages add .
git -C /tmp/podread-gh-pages commit -m "deploy: publish static site"
git -C /tmp/podread-gh-pages push origin gh-pages
```

This repository should only contain public-safe article Markdown. Full transcripts or full translations require explicit public publishing authorization before export.

## Episode Markdown

Each public episode is a Markdown file in `src/content/episodes/`. The article body is standard Markdown and is rendered by Astro.

Use a Beijing-time timestamp in the file name to avoid collisions:

```text
src/content/episodes/YYYY-MM-DD-HHMM-<podcast_slug>-<episode_slug>.md
```

Example:

```text
src/content/episodes/2026-06-02-1000-dwarkesh-chip-design-from-the-bottom-up-reiner-pope.md
```

The public URL is controlled by `podcast_slug` and `episode_slug`, not by the file name.

```md
---
title: "从底层理解芯片设计 - Reiner Pope"
podcast: "Dwarkesh Podcast"
podcast_slug: "dwarkesh"
episode_slug: "chip-design-from-the-bottom-up-reiner-pope"
episode_url: "https://example.com"
summary: "首页和文章页顶部显示的一段简介。"
hosts:
  - name: "Dwarkesh Patel"
    role: "主持人"
    description: "Dwarkesh Podcast 主持人。"
guests:
  - name: "Reiner Pope"
    role: "Maddock CEO"
    description: "AI 芯片公司创始人，本期嘉宾。"
mentioned_people:
  - name: "Ada Lovelace"
    description: "可选的人物介绍。"
content_type: "full_translation"
rights_status: "public_full_authorized"
published_at: "2026-06-02T00:00:00+08:00"
tags: ["AI", "芯片"]
---

## 正文小标题

这里开始写长正文。
```
