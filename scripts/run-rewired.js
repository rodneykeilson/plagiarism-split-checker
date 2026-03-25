const { spawnSync } = require('child_process');
const path = require('path');

const command = process.argv[2];
if (!command) {
  console.error('Missing command. Use: start | build | test');
  process.exit(1);
}

const scriptPath = path.resolve(__dirname, '../node_modules/react-app-rewired/scripts', `${command}.js`);
const nodeArgs = [];

if (process.allowedNodeEnvironmentFlags && process.allowedNodeEnvironmentFlags.has('--no-webstorage')) {
  nodeArgs.push('--no-webstorage');
}

nodeArgs.push(scriptPath, ...process.argv.slice(3));

const result = spawnSync(process.execPath, nodeArgs, {
  stdio: 'inherit',
  env: process.env,
});

if (typeof result.status === 'number') {
  process.exit(result.status);
}

process.exit(1);
