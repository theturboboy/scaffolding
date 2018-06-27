import path from 'path';
import fs from 'fs';
import URL from 'url-parse';

let mocks = {};

fs.readdirSync(path.dirname(__filename)).forEach(function(file) {
    if (/.*\.mock\.js/.test(file)) {
        let module = require(`./${file}`);
        module = module.default || module;

        let { method = 'GET', url, handler } = module;
        let { pathname: routePath } = new URL(url);

        mocks[method] = mocks[method] || {};
        mocks[method][routePath] = { url, handler };
    }
});

export default mocks;