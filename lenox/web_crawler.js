const axios = require('axios');
const cheerio = require('cheerio');

class WebCrawler {
  constructor() {
    this.cache = {};
  }

  async fetchPage(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching the page: ${url}`, error.message);
      return null;
    }
  }

  parseHtml(html, selector) {
    const $ = cheerio.load(html);
    const selectedElements = $(selector).map((i, el) => $(el).text()).get();
    return selectedElements;
  }

  async fetchPageWithCache(url) {
    if (this.cache[url]) {
      console.log('Returning cached content for:', url);
      return this.cache[url];
    }

    const pageContent = await this.fetchPage(url);
    if (pageContent) {
      this.cache[url] = pageContent;
    }
    return pageContent;
  }
}

module.exports = WebCrawler;
