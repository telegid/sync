// Utility function to parse datetime strings like 22.08.2018 23:51:58 into JS Date

export const getDatetimeFromStvDateTime = (datetime: string): number => {
    const match = datetime.match(/(\d\d)\.(\d\d)\.(\d\d\d\d) (\d+):(\d\d):(\d\d)/);

    if (match) {
        const jsDateTime = new Date(Number(match[3]), Number(match[2]), Number(match[1]), Number(match[4]), Number(match[5]), Number(match[6]));
        return jsDateTime.getTime();
    }

    console.log(`Error parsing datetime: ${datetime}`);

    return 0;
};
