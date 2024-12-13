//drizzle.config.ts
import type { Config } from 'drizzle-kit';
import fs from "fs";
import path from "path";

const getLocalD1 = () => {
    try {
        const basePath = path.resolve('.wrangler');
        const dbFile = fs
            .readdirSync(basePath, { encoding: 'utf-8', recursive: true })
            .find((f) => f.endsWith('.sqlite'));

        if (!dbFile) {
            throw new Error(`.sqlite file not found in ${basePath}`);
        }

        const url = path.resolve(basePath, dbFile);
        return url;
    } catch (err) {
        console.log(`Error  ${err}`);
    }
}
const isProd = () => process.env.NODE_ENV === 'prod'
const getCredentials = () => {
    //如果你需要用UI操作线上数据，就需要获取CLOUDFLARE_ACCOUNT_ID,CLOUDFLARE_D1_TOKEN
    //如何获取参考：https://orm.drizzle.team/docs/guides/d1-http-with-drizzle-kit
    const prod = {
        driver: 'd1-http',
        dbCredentials: {
            accountId: process.env.CLOUDFLARE_ACCOUNT_ID || '',
            databaseId: process.env.CLOUDFLARE_DATABASE_ID || '',
            token: process.env.CLOUDFLARE_D1_TOKEN || ''
        }

    }

    const dev = {
        dbCredentials: {
            url: getLocalD1()
        }
    }
    return isProd() ? prod : dev
}

export default {
    schema: './src/db/schemas/*.ts',
    out: './drizzle',
    dialect: "sqlite",
    ...getCredentials()
} satisfies Config;