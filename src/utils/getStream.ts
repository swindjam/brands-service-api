import {existsSync, createReadStream} from "fs";
import {parser} from 'stream-json';
import {streamObject} from 'stream-json/streamers/StreamObject';
import StreamAccessError from "./StreamAccessError";
import stream from "node:stream";

export default (): stream.Readable => {
    const filepath = `${__dirname}/../data/${process.env['BRANDS_FILENAME']}`;
    const exists = existsSync(filepath);

    if(!exists){
        throw new StreamAccessError("Unable to find the file to stream");
    }

    return createReadStream(filepath, 'utf-8')
        .pipe(parser())
        .pipe(streamObject());
}