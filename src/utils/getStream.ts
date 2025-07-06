import {createReadStream} from "fs";
const {parser} = require('stream-json');
const {streamObject} = require('stream-json/streamers/StreamObject');

export default () => {

    return createReadStream(`${__dirname}/../data/${process.env['BRANDS_FILENAME']}`, 'utf-8')
        .pipe(parser())
        .pipe(streamObject());
}