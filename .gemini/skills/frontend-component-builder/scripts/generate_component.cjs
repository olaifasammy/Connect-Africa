const componentName = process.argv[2];
const contextName = process.argv[3];

if (!componentName || !contextName) {
  console.error('Usage: node generate_component.cjs <component-name> <context-name>');
  process.exit(1);
}

console.log(`Generating component: ${componentName} in context: ${contextName}...`);
// Scaffolding logic would go here, ensuring placement in frontend/src/${contextName}/components
console.log(`Please ensure to follow frontend/docs/FrontendArchitecture.md and FrontendDefinitionOfDone.md.`);