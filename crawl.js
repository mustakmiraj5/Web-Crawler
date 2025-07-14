const {JSDOM} = require('jsdom');

async function crawlPage(url) {
    // Simulate crawling the page
    console.log(`Crawling ${url}...`);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        const html = await response.text();
        const urls = getUrlsFromHTML(html, url);
        console.log(`Found URLs: ${urls.join(', ')}`);
        return urls;
    } catch (error) {
        console.error(`Error crawling ${url}: ${error.message}`);
        return [];
    }
}

function normalizeURL(url){
    const urlObj = new URL(url);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if(hostPath.endsWith('/')) {
        return hostPath.slice(0, -1);
    }
    return hostPath;
}

function getUrlsFromHTML(html, baseURL = null) {
    const urls = [];
    const dom = new JSDOM(html);
    const anchors = dom.window.document.querySelectorAll('a');
    
    anchors.forEach(anchor => {
        const href = anchor.getAttribute('href');
        if (!href) return;
        
        try {
            let fullUrl;
            if (href.startsWith('http://') || href.startsWith('https://')) {
                // Absolute URL
                fullUrl = href;
            } else if (href.startsWith('/') && baseURL) {
                // Relative URL starting with /
                fullUrl = new URL(href, baseURL).href;
            } else if (baseURL && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                // Relative URL
                fullUrl = new URL(href, baseURL).href;
            } else if (!baseURL && (href.startsWith('http://') || href.startsWith('https://'))) {
                // If no baseURL provided but we have absolute URLs
                fullUrl = href;
            } else {
                // Skip relative URLs when no baseURL is provided
                return;
            }
            
            const normalizedUrl = normalizeURL(fullUrl);
            urls.push(normalizedUrl);
        } catch (error) {
            // Skip invalid URLs
            console.warn(`Skipping invalid URL: ${href}`);
        }
    });
    
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
    getUrlsFromHTMLt,
    crawlPage
}