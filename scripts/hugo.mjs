import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const local = fileURLToPath(new URL('../.tools/hugo-bin/hugo.exe', import.meta.url));
const executable = process.env.HUGO_BINARY || (process.platform === 'win32' && existsSync(local) ? local : 'hugo');
const result = spawnSync(executable, process.argv.slice(2), { stdio: 'inherit' });
if (result.error) console.error('请安装 Hugo Extended 0.157.0，或设置 HUGO_BINARY。', result.error.message);
process.exit(result.status ?? 1);
