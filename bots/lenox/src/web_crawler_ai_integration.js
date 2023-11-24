const webCrawler = require('./web_crawler');
const ai = require('./ai');

const prioritizeInformation = async (data) => {
  try {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data format for prioritization');
    }
    const prioritizedData = await ai.prioritizeInformation(data);
    return prioritizedData;
  } catch (error) {
    console.error(`Error prioritizing web data: ${error.message}`);
    // Consider a fallback strategy or returning an error object
    return null;
  }
};

const webCrawlerData = async () => {
  try {
    const crawledData = await webCrawler.crawl();
    if (!crawledData) throw new Error('Failed to crawl data');
    return crawledData;
  } catch (error) {
    console.error(`Error crawling web: ${error.message}`);
    return null;
  }
};

const getPrioritizedWebData = async () => {
  const crawledData = await webCrawlerData();
  return crawledData ? await prioritizeInformation(crawledData) : null;
};

module.exports = {
  getPrioritizedWebData
};
