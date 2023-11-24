const axios = require('axios');
const cheerio = require('cheerio');
const NodeCache = require('node-cache'); // Using node-cache for sophisticated caching
const { URL } = require('url'); // URL parsing and validation

class WebCrawler {
  constructor() {
    this.cache = new NodeCache({ stdTTL: 3600, checkperiod: 1800 }); // Cache with a standard TTL of 1 hour
  }

  async crawl(url) {
    // Validate the URL before proceeding
    if (!isValidURL(url)) {
      console.error('Invalid URL:', url);
      return null;
    }

    try {
      // Fetch and parse the page content
      const html = await this.fetchPage(url);
      return html ? await this.parseHtml(html) : null;
    } catch (error) {
      console.error(`Error crawling URL: ${url}`, error);
      return null;
    }
  }

  async fetchPage(url) {
    if (this.cache.has(url)) {
      return this.cache.get(url); // Return cached content if available
    }

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        const parsedData = await this.parseHtml(response.data);
        this.cache.set(url, parsedData); // Cache the parsed data
        return parsedData;
      } else {
        console.error(`Non-200 status code: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching the page: ${url}`, error.message);
      return null;
    }
  }

  async parseHtml(html) {
    if (!html) {
      console.error('Invalid HTML content.');
      return [];
    }

    try {
      const $ = cheerio.load(html);

      // Extract relevant content from the web page
      const parsedData = {
        title: $('title').text(),
        content: $('article').text(),
        images: $('img').map((i, el) => $(el).attr('src')).get(),
        links: $('a').map((i, el) => $(el).attr('href')).get(),
      };

      // Filter and validate links to ensure they are valid URLs
      parsedData.links = parsedData.links.filter(link => isValidURL(link));

      return parsedData;
    } catch (error) {
      console.error('Error parsing HTML:', error.message);
      return [];
    }
  }

  // Additional method for unit testing
  clearCache() {
    this.cache.flushAll();
  }
}

module.exports = WebCrawler;

// Note: Remember to add NodeCache to your package.json dependencies

function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
