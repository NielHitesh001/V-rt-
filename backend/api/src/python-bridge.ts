import { spawn } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function callPythonM0toM9(eventId: string, articles: any[]): Promise<any> {
  return new Promise((resolvePromise, rejectPromise) => {
    // Resolve location of Python bridge script
    const candidatePaths = [
      process.env.PYTHON_HOME ? resolve(process.env.PYTHON_HOME, 'src/newsx/api_bridge.py') : '',
      resolve(__dirname, '../../python/src/newsx/api_bridge.py'),
      resolve(__dirname, '../python/src/newsx/api_bridge.py'),
      resolve(process.cwd(), 'backend/python/src/newsx/api_bridge.py'),
      resolve(process.cwd(), 'python/src/newsx/api_bridge.py')
    ].filter(Boolean);

    const scriptPath = candidatePaths.find((p) => fs.existsSync(p));
    if (!scriptPath) {
      return rejectPromise(
        new Error(`Python bridge script not found in candidate paths: ${candidatePaths.join(', ')}`)
      );
    }

    // Try python3, then fallback to python
    const pythonExecutable = process.env.PYTHON_BIN || (process.platform === 'win32' ? 'python' : 'python3');

    const pythonProcess = spawn(pythonExecutable, [scriptPath], {
      env: {
        ...process.env,
        PYTHONUNBUFFERED: '1',
        PYTHONPATH: resolve(scriptPath, '../../..')
      }
    });

    let output = '';
    let errorOutput = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on('error', (err) => {
      rejectPromise(new Error(`Failed to spawn Python process (${pythonExecutable}): ${err.message}`));
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        rejectPromise(new Error(`Python process exited with code ${code}: ${errorOutput || output}`));
      } else {
        try {
          const parsed = JSON.parse(output.trim());
          resolvePromise(parsed);
        } catch (e: any) {
          rejectPromise(new Error(`Failed to parse Python JSON output: ${e.message}. Raw output: "${output}"`));
        }
      }
    });

    // Send input data via stdin
    const payload = JSON.stringify({
      event_id: eventId,
      articles: articles
    });

    pythonProcess.stdin.write(payload);
    pythonProcess.stdin.end();
  });
}
