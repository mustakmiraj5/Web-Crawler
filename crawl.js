const {JSDOM} = require('jsdom');
function normalizeURL(url){
    const urlObj = new URL(url);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if(hostPath.endsWith('/')) {
        return hostPath.slice(0, -1);
    }
    return hostPath;
}

function getUrlsFromHTML(html) {
    const regex = /href="([^"]+)"/g;
    const urls = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
        urls.push(normalizeURL(match[1]));
    }
    return urls;
}

function getUrlsFromHTMLt(inputHTMLBody, inputBaseUrl){
    const urls = [];
    const dom = new JSDOM(inputHTMLBody);
    const anchors = dom.window.document.querySelectorAll('a');
    anchors.forEach(anchor => {
        const href = anchor.href;
        if (href.startsWith(inputBaseUrl)) {
            urls.push(href);
        }
        if( href.startsWith('/')) {
            const fullUrl = new URL(href, inputBaseUrl);
            urls.push(fullUrl.href);
        }
    });
    return urls;
}
module.exports = {
    normalizeURL,
    getUrlsFromHTML,
    getUrlsFromHTMLt
}