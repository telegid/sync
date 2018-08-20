import {config as loadConfig} from 'dotenv';
import {getDb} from './db/getDb';
import {runSync} from './runSync';

loadConfig(); // Load ENV variables from the file

const client = getDb();

client.connect()
    .then(() => {
        console.log('Connected');
        runSync(client);
    });
