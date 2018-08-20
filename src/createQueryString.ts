import * as querystring from 'querystring';

require('dotenv').config();

export const createQueryString = (): string => {
    const queryParams = {
        login: process.env.STV_LOGIN,
        pass: process.env.STV_PASSWORD,
        show: 1,
        xmltv: 0
    };

    return querystring.stringify(queryParams);
};
export const createUrl = (paramsString: string) => {
    return `${process.env.STV_BASEURL}/xchenel.php?${paramsString}`;
};
