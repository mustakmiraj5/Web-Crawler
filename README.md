# Web Crawler

A simple but robust web crawler built with Node.js that can fetch and extract URLs from web pages. This project demonstrates web scraping capabilities using modern JavaScript with proper HTML parsing and URL normalization.

## Features

- **Web Page Crawling**: Fetches HTML content from any valid URL
- **URL Extraction**: Extracts all links from HTML pages using DOM parsing
- **URL Normalization**: Standardizes URLs by removing protocols, trailing slashes, and converting to lowercase
- **Relative URL Support**: Properly resolves relative URLs to absolute URLs using base URL
- **Error Handling**: Gracefully handles invalid URLs and network errors
- **Comprehensive Testing**: Full test suite with Jest covering all functionality

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd web-crawler
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Command Line Interface

Run the crawler with a target URL:

```bash
npm start <URL>
```

**Example:**
```bash
npm start https://wagslane.dev
```

This will:
1. Fetch the HTML content from the specified URL
2. Extract all links found on the page
3. Display the normalized URLs in the console

### Sample Output
```
Starting to crawl https://wagslane.dev...
Crawling https://wagslane.dev...
Found URLs: wagslane.dev, wagslane.dev/tags, wagslane.dev/about, wagslane.dev/posts/zen-of-proverbs, ...
Crawling completed.
```

## API Reference

### Functions

#### `crawlPage(url)`
Asynchronously crawls a web page and extracts all URLs.

**Parameters:**
- `url` (string): The URL to crawl

**Returns:**
- `Promise<string[]>`: Array of normalized URLs found on the page

**Example:**
```javascript
const { crawlPage } = require('./crawl');

crawlPage('https://example.com')
    .then(urls => console.log('Found URLs:', urls))
    .catch(err => console.error('Error:', err));
```

#### `normalizeURL(url)`
Normalizes a URL by removing protocol, converting to lowercase, and removing trailing slashes.

**Parameters:**
- `url` (string): The URL to normalize

**Returns:**
- `string`: Normalized URL in format `hostname/path`

**Example:**
```javascript
normalizeURL('https://EXAMPLE.com/path/') // Returns: 'example.com/path'
```

#### `getUrlsFromHTML(html, baseURL)`
Extracts and normalizes all URLs from HTML content using DOM parsing.

**Parameters:**
- `html` (string): HTML content to parse
- `baseURL` (string, optional): Base URL for resolving relative links

**Returns:**
- `string[]`: Array of normalized URLs

**Features:**
- Handles both absolute and relative URLs
- Skips invalid URLs (mailto:, tel:, fragments)
- Proper error handling for malformed URLs

#### `getUrlsFromHTMLt(inputHTMLBody, inputBaseUrl)`
Alternative URL extraction function (legacy version for tutorial compatibility).

**Parameters:**
- `inputHTMLBody` (string): HTML content to parse
- `inputBaseUrl` (string): Base URL for resolving relative links

**Returns:**
- `string[]`: Array of full URLs (not normalized)

## Project Structure

```
web-crawler/
├── crawl.js          # Main crawling logic and URL processing
├── main.js           # CLI entry point
├── crawl.test.js     # Comprehensive test suite
├── package.json      # Project configuration and dependencies
└── README.md         # This documentation
```

## Dependencies

### Production Dependencies
- **jsdom** (^26.1.0): DOM parsing for HTML content

### Development Dependencies
- **jest** (^30.0.4): Testing framework

## Testing

Run the complete test suite:

```bash
npm test
```

### Test Coverage

The project includes comprehensive tests for:

- ✅ URL normalization with various formats
- ✅ URL extraction from HTML content
- ✅ Relative URL resolution
- ✅ Edge case handling (trailing slashes, capitals, protocols)
- ✅ Error handling for invalid URLs

**Test Results:**
```
Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
```

## Technical Details

### URL Normalization
The crawler normalizes URLs by:
1. Parsing the URL using the built-in `URL` constructor
2. Extracting hostname and pathname
3. Converting to lowercase
4. Removing trailing slashes
5. Removing protocol prefixes

### HTML Parsing
Uses JSDOM for robust HTML parsing instead of regex:
- Properly handles malformed HTML
- Extracts `href` attributes from `<a>` tags
- Supports both absolute and relative URL resolution

### Error Handling
- Network errors are caught and logged
- Invalid URLs are skipped with warnings
- Graceful degradation for parsing errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass: `npm test`
5. Submit a pull request

## License

ISC License

## Future Enhancements

Potential improvements for future versions:
- Support for crawling multiple pages recursively
- Respect robots.txt files
- Rate limiting and politeness delays
- Support for different content types
- Database storage for crawled URLs
- Duplicate URL detection and filtering