import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { INTERACTIVE_TOOLS } from '../src/data/interactiveToolsData.js';

const OUT_DIR = path.join(process.cwd(), 'public/images/tools');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

console.log(`Total tools to generate: ${INTERACTIVE_TOOLS.length}`);
