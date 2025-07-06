import {createReadStream} from "fs";
import {parser} from 'stream-json';
import {streamObject} from 'stream-json/streamers/StreamObject';

export default () => {
    return createReadStream(`${__dirname}/../data/${process.env['BRANDS_FILENAME']}`, 'utf-8')
        .pipe(parser())
        .pipe(streamObject());
}