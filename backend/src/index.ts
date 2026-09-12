import 'reflect-metadata';
import { createApp } from '@shared/interfaces/http/app';
import { appConfig } from '@config/app';
import { logger } from '@shared/logger/Logger';
import { BootstrapService } from '@bootstrap/startup/BootstrapService';

// Zero-dependency ANSI colors for terminal styling
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function printLine(text = ''): void {
  process.stdout.write(`${text}\n`);
}

function printStartupSummary(
  postgres: boolean,
  redis: boolean,
  address: string,
  port: number,
): void {
  const width = 52;
  const border = '─'.repeat(width);

  const displayAddress = address === '::' ? '0.0.0.0 / ::' : address;
  const url = `http://${address === '::' || address === '0.0.0.0' ? 'localhost' : address}:${port}`;

  const pgStatus = postgres
    ? `${c.green}✓ Connected successfully${c.reset}`
    : `${c.red}✗ Connection failed${c.reset}`;

  const redisStatus = redis
    ? `${c.green}✓ Connected successfully${c.reset}`
    : `${c.red}✗ Connection failed${c.reset}`;

  printLine('');
  printLine(`${c.cyan}╭${border}╮${c.reset}`);
  printLine(`${c.cyan}│${' '.repeat(17)}${c.bold}${c.blue}CONNECT AFRICA API${c.reset}${' '.repeat(17)}${c.cyan}│${c.reset}`);
  printLine(`${c.cyan}╰${border}╯${c.reset}`);
  printLine('');

  printLine(`  ${c.bold}Services Status${c.reset}`);
  printLine(`  ${c.dim}${border}${c.reset}`);
  printLine(`  PostgreSQL  ${c.dim}─${c.reset}  ${pgStatus}`);
  printLine(`  Redis       ${c.dim}─${c.reset}  ${redisStatus}`);
  printLine(`  HTTP Server ${c.dim}─${c.reset}  ${c.green}✓ Running${c.reset}`);
  printLine('');

  printLine(`  ${c.bold}Network & Environment${c.reset}`);
  printLine(`  ${c.dim}${border}${c.reset}`);
  printLine(`  ${c.dim}IP${c.reset}          ${displayAddress}`);
  printLine(`  ${c.dim}Port${c.reset}        ${port}`);
  printLine(`  ${c.dim}Local URL${c.reset}   ${c.cyan}${url}${c.reset}`);
  printLine(`  ${c.dim}Environment${c.reset} ${c.yellow}${appConfig.nodeEnv}${c.reset}`);
  printLine(`  ${c.dim}${border}${c.reset}`);
  printLine('');

  printLine(`  ${c.green}${c.bold}🚀 Application ready for incoming requests.${c.reset}`);
  printLine('');
}

async function bootstrap(): Promise<void> {
  try {
    const status = await BootstrapService.run();

    const app = createApp();
    const { port } = appConfig;

    const server = app.listen(port, () => {
      const address = server.address();
      let host = '0.0.0.0';

      if (typeof address === 'object' && address !== null) {
        host = address.address;
      }

      printStartupSummary(
        status.postgres,
        status.redis,
        host,
        port,
      );
    });

    const shutdown = async (signal: string): Promise<void> => {
      printLine('');
      printLine(`${c.yellow}→ Received ${signal}. Shutting down Connect Africa...${c.reset}`);

      server.close(async () => {
        try {
          await BootstrapService.shutdown();
          printLine(`${c.green}✓ Application shutdown complete${c.reset}`);
          process.exit(0);
        } catch (error) {
          logger.error('✗ Error during application shutdown:', error);
          process.exit(1);
        }
      });
    };

    process.on('SIGTERM', () => void shutdown('SIGTERM'));
    process.on('SIGINT', () => void shutdown('SIGINT'));
  } catch (error) {
    logger.error('✗ Critical failure during application startup:', error);
    process.exit(1);
  }
}

process.on('unhandledRejection', (reason) => {
  logger.error('✗ Unhandled Promise Rejection:', reason);
  process.exit(1);
});

void bootstrap();
