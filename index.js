import * as path from "node:path";
import * as fs from "node:fs";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const moduleJsonPath = path.join(__dirname, 'extensions.json');
const moduleJson = JSON.parse(fs.readFileSync(moduleJsonPath, 'utf8'));

async function fetchJson(url) {
    const response = await fetch(url);
    return await response.json();
}

const containers = [];

for (const moduleUrl of moduleJson) {
    try {
        const container = await fetchJson(moduleUrl);
        containers.push(container);
    } catch (error) {
        console.error(`Error fetching ${moduleUrl}: ${error.message}`);
    }
}

const compiledPath = path.join(__dirname, '..', 'compiled', 'container.json');
fs.writeFileSync(compiledPath, JSON.stringify(containers, null, 2));