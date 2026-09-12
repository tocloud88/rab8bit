import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const blogsFilePath = path.join(ROOT_DIR, 'src/data/blogsData.ts');
let blogsContent = fs.readFileSync(blogsFilePath, 'utf-8');

// Parse BLOGS_DATA
const startPos = blogsContent.indexOf('export const BLOGS_DATA');
const equalPos = blogsContent.indexOf('=', startPos);
const arrayStart = blogsContent.indexOf('[', equalPos);
const arrayEnd = blogsContent.lastIndexOf(']');
const rawArray = blogsContent.substring(arrayStart, arrayEnd + 1);
const blogsData = eval('(' + rawArray + ')');

let changed = 0;
for (const post of blogsData) {
  const targetThumb = `/images/blogs/${post.id}.jpg`;
  if (post.thumbnail !== targetThumb) {
    post.thumbnail = targetThumb;
    changed++;
  }
}

console.log(`Updated ${changed} blog posts with 1:1 dedicated thumbnail paths.`);

const updatedArrayStr = JSON.stringify(blogsData, null, 2);
const newContent = blogsContent.slice(0, arrayStart) + updatedArrayStr + blogsContent.slice(arrayEnd + 1);

fs.writeFileSync(blogsFilePath, newContent, 'utf-8');
console.log('✅ Successfully wrote updated src/data/blogsData.ts');
