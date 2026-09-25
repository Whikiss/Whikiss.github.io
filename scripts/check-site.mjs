import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import assert from 'node:assert/strict';
const root = resolve(process.argv[2] || 'public');
const read = path => readFileSync(join(root, path), 'utf8');
for (const page of ['index.html','404.html','about/index.html','archives/index.html','links/index.html','search/index.html','categories/index.html','tags/index.html','index.xml','sitemap.xml']) {
  assert.ok(existsSync(join(root,page)), `Missing ${page}`);
  assert.ok(read(page).trim().length > 0, `Empty ${page}`);
}
assert.equal(read('CNAME').trim(), 'blog.whikiss.cn');
const search = JSON.parse(read('search/index.json'));
assert.ok(Array.isArray(search) && search.length >= 5, 'Search index is incomplete');
for (const file of readdirSync('content/post').filter(x => x.endsWith('.md'))) {
  const source = readFileSync(join('content/post',file), 'utf8');
  const slug = source.match(/^slug: (.+)$/m)[1].trim();
  const alias = source.match(/^aliases:\r?\n  - (.+)$/m)[1].trim();
  assert.ok(read(`posts/${slug}/index.html`).includes(`https://blog.whikiss.cn/posts/${slug}/`), `Missing canonical: ${slug}`);
  assert.ok(read(`${alias.slice(1)}index.html`).includes(`https://blog.whikiss.cn/posts/${slug}/`), `Broken redirect: ${alias}`);
  assert.ok(search.some(item => JSON.stringify(item).includes(`/posts/${slug}/`)), `Missing from search: ${slug}`);
}
let checked = 0;
function walk(dir) {
  for (const entry of readdirSync(dir,{withFileTypes:true})) {
    const path = join(dir,entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.name.endsWith('.html')) {
      const html = readFileSync(path,'utf8');
      for (const match of html.matchAll(/(?:href|src)=(?:["']([^"']+)["']|([^\s>]+))/g)) {
        let value = match[1] || match[2];
        if (value.startsWith("https://blog.whikiss.cn/")) value = value.slice("https://blog.whikiss.cn".length);
        if (!value.startsWith('/') || value.startsWith('//')) continue;
        const pathname = decodeURIComponent(value.split(/[?#]/)[0]);
        if (!pathname) continue;
        const target = join(root,pathname);
        assert.ok(existsSync(target) || existsSync(join(target,'index.html')), `Broken local link ${value} in ${path}`);
        checked++;
      }
    }
  }
}
walk(root);
console.log(`PASS: pages, 5 article redirects, search index, CNAME and ${checked} local links.`);
