import {createQueryString, createUrl} from './createQueryString';
import fetch from 'node-fetch';
import * as iconv from 'iconv-lite';
import * as cheerio from 'cheerio';
import {downloadToDb} from './downloadToDb';
import {Client} from 'pg';

require('dotenv').config();

let headers: any;

export const fetchChannels = async (client: Client) => {
    const params = createQueryString();
    const url = createUrl(params);

    console.log(`Will fetch channels from ${url}`);

    const respBuff = await fetch(url)
        .then((resp) => {
            headers = resp.headers;
            return resp.buffer();
        });

    const str = iconv.decode(respBuff, 'win1251');

    const $ = cheerio.load(str);

    const rows = $('table tbody tr');

    const rowsArray = rows.toArray();


    for (const row of rowsArray) {

        const releaseDate = $(row).find('td').eq(3).text();
        const href = $(row).find('a').attr('href');

        await downloadToDb(client, `${process.env.STV_BASEURL}${href}`, headers, releaseDate);

    }
};
