import _ from 'lodash';
import qs from 'qs';
import URL from 'url-parse';
import sendData from 'send-data';

const tokenRegExpStr = '([^\/&\?]+)';
const tokenRegExp = new RegExp(`{{${tokenRegExpStr}}}`, 'gi');

const getHandlerObject = (handlers, method, urlPath) => {
    return _.find(handlers[method], (hObj, hPath) => {
        // matching the length of resulting arrays, after splitting the paths by `/`,
        // it's needed to avoid matching urls like /.../transfers and /.../transfers/<some_value>
        const isPathPathsCountEquals = hPath.split('/').length === urlPath.split('/').length;
        const hPathRegStr = hPath.replace(tokenRegExp, tokenRegExpStr);
        const hPathRegExp = new RegExp(hPathRegStr, 'i');

        return (hPathRegExp).test(urlPath) && isPathPathsCountEquals;
    });
};

const extractTokens = (str = '', reg = tokenRegExp) => {
    return (str.match(reg) || []).map((token) => token.replace(/{{|}}/gi, ''));
};

export default (options = {}) => {
    const { handlers } = options;

    return (req, res, next) => {
        const reqUrlRaw = req.url;
        const reqMethod = req.method;
        const { pathname: reqUrlPath, query: reqUrlQuery } = new URL(reqUrlRaw);

        // find the handler object if exists
        let handlerObj = getHandlerObject(handlers, reqMethod, reqUrlPath);

        if (handlerObj) {
            const { url: handlerUrl, handler: handlerFn } = handlerObj;
            const { pathname: matchUrlPath } = new URL(handlerUrl);

            // generate the query params object and push it into request object
            req.queryParams = qs.parse(reqUrlQuery);

            // extract the path params tokens names
            const matchPathTokens = extractTokens(matchUrlPath);

            // extract the path params tokens values
            const matchPathValues = _.drop(reqUrlPath.match(matchUrlPath.replace(tokenRegExp, '([^/]+)')));

            // generate the path params object and push it into request object
            req.pathParams = _.zipObject(matchPathTokens, matchPathValues);

            // exec the registered handler and send response
            sendData(req, res, handlerFn(req, res));
        } else {
            next();
        }
    };
};