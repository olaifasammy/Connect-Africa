const fs = require('fs');
const path = require('path');

const contextName = process.argv[2];
if (!contextName) {
  console.error('Usage: node generate_context.cjs <context-name>');
  process.exit(1);
}

const baseDir = path.join(process.cwd(), 'backend', 'src', 'modules', contextName);

const structure = [
  'application',
  'domain',
  'infrastructure',
  'infrastructure/persistence',
  'infrastructure/services',
  'interfaces',
  'interfaces/http',
  'tests',
  'tests/unit',
  'tests/integration'
];

structure.forEach(dir => {
  const dirPath = path.join(baseDir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created: ${dirPath}`);
  }
});

console.log(`
Successfully scaffolded Bounded Context: ${contextName}`);
console.log(`Please follow 04-FolderArchitecture.md to complete implementation.`);