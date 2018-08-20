import {Client} from 'pg';

export const getDb = (): Client => {
    console.log('Initializing db connection...');
    return new Client(getConnectionConfig());
};

const getConnectionConfig = () => {
    const env = process.env;

    return {
        host: env.TG_DB_HOST,
        user: env.TG_DB_USER,
        password: env.TG_DB_PASSWORD,
        database: env.TG_DB_DATABASE,
        port: Number(env.TG_DB_PORT)
    };
};
