import {createReadStream} from "fs";
const {parser} = require('stream-json');
const {streamObject} = require('stream-json/streamers/StreamObject');

export default () => {
    return createReadStream(__dirname + '/../data/brands.json', 'utf-8')
        .pipe(parser())
        .pipe(streamObject());
}