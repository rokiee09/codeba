import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// yayında (draft olmayan) en az bir yazı var mı? yoksa boş /yazilar/ sayfası sitemap'e girmesin
const postsDir = new URL('./src/content/yazilar/', import.meta.url);
let hasPosts = false;
try {
  hasPosts = readdirSync(postsDir)
    .filter((f) => f.endsWith('.md'))
    .some((f) => !/^draft:\s*true\s*$/m.test(readFileSync(new URL(f, postsDir), 'utf8')));
} catch {}

export default defineConfig({
  site: 'https://www.codeba.dev',
  integrations: [
    sitemap({
      filter: (page) => hasPosts || !page.includes('/yazilar/'),
    }),
  ],
});
