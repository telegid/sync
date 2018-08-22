import {IFetchResult} from './interfaces/IFetchResult';
import fetch from 'node-fetch';

export const fetchFile = async (url: string): Promise<IFetchResult> => {
    return fetch(url)
        .then((resp) => {
            const contentDispositionString = resp.headers.get('content-disposition');

            if (contentDispositionString && contentDispositionString.includes('.txt') && contentDispositionString.includes('(R)')) {
                const fileName = contentDispositionString.replace(/attachment; filename="\(R\)(.+)\.txt"/, '$1');

                return {
                    fileName,
                    content: resp.buffer()
                };

            } else {
                return {
                    fileName: '',
                    content: Promise.resolve(new Buffer(0))
                };
            }

        });
};
