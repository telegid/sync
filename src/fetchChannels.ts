import {createQueryString, createUrl} from './createQueryString';
import fetch from 'node-fetch';
import * as iconv from 'iconv-lite';
import * as cheerio from 'cheerio';
import {downloadToDb} from './downloadToDb';
import {Client} from 'pg';

import {config as loadConfig} from 'dotenv';

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


    const promises: Array<Promise<any>> = rowsArray.map((row) => {

        const releaseDate = $(row).find('td').eq(3).text();
        const href = $(row).find('a').attr('href');

        return downloadToDb(client, `${process.env.STV_BASEURL}${href}`, releaseDate);

    });

    await Promise.all(promises);
};
