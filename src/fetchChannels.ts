import {createQueryString, createUrl} from './createQueryString';
import fetch from 'node-fetch';
import * as iconv from 'iconv-lite';
import * as cheerio from 'cheerio';
import {Client} from 'pg';

import {config as loadConfig} from 'dotenv';
import {getDatetimeFromStvDateTime} from './utils/getDatetimeFromStvDateTime';
import {downloadToDb} from './downloadToDb';

loadConfig();

export const fetchChannels = async (client: Client) => {
    const params = createQueryString();
    const url = createUrl(params);

    console.log(`Will fetch channels from ${url}`);

    const respBuff = await fetch(url)
        .then((resp) => resp.buffer());

    const programmeContentString = iconv.decode(respBuff, 'win1251');

    const $ = cheerio.load(programmeContentString);

    const rows = $('table tbody tr');

    const rowsArray = rows.toArray();

    const promises: Array<Promise<any>> = [];

    for (const row of rowsArray) {
        const releaseDate = $(row).find('td').eq(3).text();
        const createdDateTime = getDatetimeFromStvDateTime($(row).find('td').eq(4).text());
        const href = $(row).find('a').attr('href');

        const existingRow = await client.query(
            'SELECT channel_id FROM channel_raw_content WHERE release_date=$1 AND created_date_time=$2 ORDER BY channel_id',
            [releaseDate, createdDateTime]);

        if (existingRow.rowCount === 0) {
            promises.push(downloadToDb(client, `${process.env.STV_BASEURL}${href}`, releaseDate, createdDateTime));
        }

    }

    await Promise.all(promises);
};
