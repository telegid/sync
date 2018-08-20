import {Client} from 'pg';
import {fetchChannels} from './fetchChannels';

export const runSync = async (client: Client) => {
    await fetchChannels(client);
    await client.end();
    process.exit();
};
