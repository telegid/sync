import {Headers} from 'node-fetch';
import * as iconv from 'iconv-lite';
import {Client} from 'pg';
import {channelsNames} from './channelsNames';
import {fetchFile} from './fetchFile';

export const downloadToDb = async (client: Client, url: string, releaseDate: string) => {

    const {fileName, content} = await fetchFile(url);

    const buff = await content;

    if (fileName) {
        const str = iconv.decode(buff, 'win1251');
        const res = await client.query(
            `INSERT INTO channel_raw_content(release_date, channel_id, content) VALUES($1, $2, $3)
                 ON CONFLICT (release_date, channel_id) DO UPDATE SET content = $3;`, [releaseDate, channelsNames[fileName], str]);

        console.log(`Saved to DB: ${channelsNames[fileName]}`);
    }

};
