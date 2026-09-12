import { glob } from 'glob';
import { Container } from 'inversify';

export async function autoDiscoverBindings(container: Container, pattern: string): Promise<void> {
    const files = await glob(pattern, {
        ignore: ['**/node_modules/**', '**/*.test.js', '**/*.spec.js', '**/*.test.ts', '**/*.spec.ts'],
        absolute: true,
    });

    for (const file of files) {
        try {
            await import(file);
        } catch (error) {
            console.error(`Failed to auto-discover bindings in ${file}:`, error);
        }
    }
}
