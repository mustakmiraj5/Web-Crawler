const {normalizeURL, getUrlsFromHTMLt, getUrlsFromHTML} = require('./crawl');
const {test, expect} = require("@jest/globals")

test('Normalize URL', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('Normalize URL with trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('Normalize URL with capitals', () => {
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('Normalize URL with strip http', () => {
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('Get URLs from HTML', () => {
    const html = `
        <html>
            <head>
                <title>Test</title>
            </head>
            <body>
                <a href="https://blog.boot.dev/path1">Link 1</a>
                <a href="https://blog.boot.dev/path2">Link 2</a>
                <a href="https://blog.boot.dev/path3/">Link 3</a>
            </body>
        </html>
    `;
    const actual = getUrlsFromHTML(html);
    const expected = [
        'blog.boot.dev/path1',
        'blog.boot.dev/path2',
        'blog.boot.dev/path3'
    ];
    expect(actual).toEqual(expected);
});

test('Get URLs from HTML tutorial', () => {
    const inputHTMLBody = `
    <html>
        <head>
            <title>Test</title>
        </head>
        <body>
            <a href="https://blog.boot.dev/tutorial1">Tutorial 1</a>
        </body>
    </html>
    `
    const inputBaseUrl = 'https://blog.boot.dev';
    const actual = getUrlsFromHTMLt(inputHTMLBody, inputBaseUrl);
    const expected = ['https://blog.boot.dev/tutorial1'];
    expect(actual).toEqual(expected);
});

test('Get URLs from HTML tutorial relative', () => {
    const inputHTMLBody = `
    <html>
        <head>
            <title>Test</title>
        </head>
        <body>
            <a href="/tutorial1">Tutorial 1</a>
        </body>
    </html>
    `
    const inputBaseUrl = 'https://blog.boot.dev';
    const actual = getUrlsFromHTMLt(inputHTMLBody, inputBaseUrl);
    const expected = ['https://blog.boot.dev/tutorial1'];
    expect(actual).toEqual(expected);
});

test('Get URLs from HTML tutorial relative broken', () => {
    const inputHTMLBody = `
    <html>
        <head>
            <title>Test</title>
        </head>
        <body>
            <a href="tutorial1">Tutorial 1</a>
        </body>
    </html>
    `
    const inputBaseUrl = 'https://blog.boot.dev';
    const actual = getUrlsFromHTMLt(inputHTMLBody, inputBaseUrl);
    const expected = [];
    expect(actual).toEqual(expected);
});