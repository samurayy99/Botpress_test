const transformers = require('./transformers');

/**
 * Performs advanced sentiment analysis on the provided text.
 * @param {string} text - The text to analyze.
 * @returns {Promise<Object|null>} - The sentiment details or null on error.
 */
const advancedSentimentAnalysis = async (text) => {
  if (!text || typeof text !== 'string') {
    console.error('Invalid input for sentiment analysis');
    return { error: 'Invalid input' };
  }

  try {
    const advancedSentiment = await transformers.advancedSentimentAnalysis(text);

    if (!advancedSentiment || !advancedSentiment.data || !advancedSentiment.data.sentimentDetails) {
      throw new Error('Invalid sentiment response structure');
    }

    return advancedSentiment.data.sentimentDetails;
  } catch (error) {
    console.error(`Error performing advanced sentiment analysis: ${error.message}`);
    return { error: error.message };
  }
};

module.exports = { advancedSentimentAnalysis };
