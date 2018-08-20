export interface IFetchResult {
    fileName: string;
    content: Promise<Buffer>;
}
