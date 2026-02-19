import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

/**
 * Database connection parts
 */
interface DbConnectionParts {
    host: string;
    port: string;
    user: string;
    password: string;
    database: string;
}

// Load environment variables from .env file
// Try to find .env in workspace root
const findEnvFile = (dir: string): string | null => {
    const envPath = path.join(dir, '.env');
    if (fs.existsSync(envPath)) {
        return envPath;
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
        return null;
    }
    return findEnvFile(parent);
};

const envFile = findEnvFile(process.cwd());
if (envFile) {
    dotenv.config({ path: envFile });
}

/**
 * ANSI Escape Codes for coloring output
 */
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    bold: '\x1b[1m',
};

const validateEnv = (): { localDbUrl: string; prodDbUrl: string } => {
    const localDbUrl = process.env.NEXT_DIRECT_URL;
    const prodDbUrl = process.env.PROD_DATABASE_URL;

    if (!localDbUrl) {
        console.error(
            `${colors.red}${colors.bold}Error: NEXT_DIRECT_URL is not defined in your environment.${colors.reset}`
        );
        process.exit(1);
    }

    if (!prodDbUrl) {
        console.error(
            `${colors.red}${colors.bold}Error: PROD_DATABASE_URL is not defined in your environment.${colors.reset}`
        );
        console.warn(
            `${colors.yellow}Please add PROD_DATABASE_URL to your .env file.${colors.reset}`
        );
        process.exit(1);
    }

    // Hard stop: destination must never be a cloud/remote database
    const isRemoteDb = (url: string) =>
        url.includes('neon.tech') ||
        url.includes('.aws.') ||
        url.includes('supabase') ||
        url.includes('railway.app') ||
        url.includes('planetscale') ||
        url.includes('render.com');

    if (isRemoteDb(localDbUrl)) {
        console.error(`${colors.red}${colors.bold}ABORTED: NEXT_DIRECT_URL points to a remote database.${colors.reset}`);
        console.error(`${colors.red}db-sync will DROP the destination schema. Refusing to run against a cloud DB.${colors.reset}`);
        console.error(`${colors.yellow}NEXT_DIRECT_URL = ${localDbUrl}${colors.reset}`);
        process.exit(1);
    }

    // Hard stop: destination must not be the same host as production
    try {
        const localHost = new URL(localDbUrl).hostname;
        const prodHost = new URL(prodDbUrl).hostname;
        if (localHost === prodHost) {
            console.error(`${colors.red}${colors.bold}ABORTED: NEXT_DIRECT_URL and PROD_DATABASE_URL point to the same host.${colors.reset}`);
            console.error(`${colors.red}You are about to overwrite your production database. Refusing to run.${colors.reset}`);
            process.exit(1);
        }
    } catch {
        // URL parse failed — already caught earlier, safe to ignore here
    }

    return { localDbUrl, prodDbUrl };
};

const getUrlParts = (url: string): DbConnectionParts => {
    try {
        const parsed = new URL(url);
        return {
            host: parsed.hostname,
            port: parsed.port || '5432',
            user: parsed.username,
            password: decodeURIComponent(parsed.password),
            database: parsed.pathname.substring(1),
        };
    } catch {
        const protocolEnd = url.indexOf('://') + 3;
        const firstColon = url.indexOf(':', protocolEnd);
        const lastAt = url.lastIndexOf('@');
        const firstSlash = url.indexOf('/', lastAt);

        if (firstColon !== -1 && lastAt !== -1) {
            const user = url.substring(protocolEnd, firstColon);
            const password = url.substring(firstColon + 1, lastAt);
            const hostPort = url.substring(lastAt + 1, firstSlash !== -1 ? firstSlash : undefined);
            const database = firstSlash !== -1 ? url.substring(firstSlash + 1) : '';

            const [host, port] = hostPort.split(':');

            return {
                user,
                password,
                host,
                port: port || '5432',
                database: database.split('?')[0],
            };
        }
        throw new Error(`Could not parse database URL: ${url}`);
    }
};

const syncDatabase = (): void => {
    console.warn(`${colors.blue}${colors.bold}Starting Database Sync...${colors.reset}\n`);

    const { localDbUrl, prodDbUrl } = validateEnv();

    const local = getUrlParts(localDbUrl);
    const prod = getUrlParts(prodDbUrl);

    console.warn(`${colors.cyan}Source:      ${colors.bold}${prod.host} / ${prod.database}${colors.reset}`);
    console.warn(`${colors.cyan}Destination: ${colors.bold}${local.host} / ${local.database}${colors.reset}\n`);

    try {
        // 1. Check tools
        try {
            execSync('which pg_dump');
            execSync('which psql');
        } catch {
            console.error(`${colors.red}Error: pg_dump or psql is not installed or not in PATH.${colors.reset}`);
            process.exit(1);
        }

        // 2. Clear Local Database (Fresh Start)
        console.warn(`${colors.yellow}Cleaning local database (dropping public schema)...${colors.reset}`);
        const clearCommand = `psql -h ${local.host} -p ${local.port} -U ${local.user} -d ${local.database} -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"`;
        try {
            execSync(clearCommand, {
                stdio: 'inherit',
                env: { ...process.env, PGPASSWORD: local.password }
            });
        } catch {
            console.warn(`${colors.yellow}Warning: Could not clear database. This might be fine if the database is already empty.${colors.reset}`);
        }

        // 3. Dump and Restore
        console.warn(`${colors.yellow}Copying data... This might take a while depending on DB size.${colors.reset}`);

        const dumpCmd = `PGPASSWORD='${prod.password.replace(/'/g, "'\\''")}' pg_dump -h ${prod.host} -p ${prod.port} -U ${prod.user} -d ${prod.database} --no-owner --no-acl`;
        const restoreCmd = `PGPASSWORD='${local.password.replace(/'/g, "'\\''")}' psql -h ${local.host} -p ${local.port} -U ${local.user} -d ${local.database}`;

        const fullCommand = `${dumpCmd} | ${restoreCmd}`;

        execSync(fullCommand, {
            stdio: 'inherit',
            shell: '/bin/bash'
        });

        console.warn(`\n${colors.green}${colors.bold}✔ Database sync completed successfully!${colors.reset}`);
    } catch {
        console.error(`\n${colors.red}${colors.bold}✖ Database sync failed.${colors.reset}`);
        process.exit(1);
    }
};

syncDatabase();
