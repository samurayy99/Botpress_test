require('dotenv').config({ path: '../.env' });
const { Bot } = require('@botpress/sdk');

const WebCrawler = require('./web_crawler');
const MultilingualSupport = require('./multilingual');
const GPTIntegration = require('./gpt_integration');
const MemoryManager = require('./memory_manager');

// Checking for required environment variables
if (!process.env.OPENAI_API_KEY) {
  throw new Error('The OPENAI_API_KEY environment variable is not set.');
}

// Initialize components
const webCrawler = new WebCrawler();
const multilingualSupport = new MultilingualSupport();
const gptIntegration = new GPTIntegration(process.env.OPENAI_API_KEY, 'https://api.openai.com/v1/chat/completions');
const memoryManager = new MemoryManager('path/to/memory.json');

// Botpress SDK setup
const bp = new Bot();

bp.message("", async ({ message, client, ctx }) => {
  try {
    const userMessage = sanitizeInput(message.text);
    const userId = client.id;

    const finalResponse = await handleMessage(userMessage, userId);
    await bp.reply(client, finalResponse);
  } catch (error) {
    console.error('Error in message processing:', error);
    await bp.reply(client, 'I encountered an error, please try again.');
  }
});


async function handleMessage(userMessage, userId) {
  try {
    const userMemory = await memoryManager.getMemoryItem(userId) || {};
    const detectedLanguage = await multilingualSupport.detectLanguage(userMessage) || 'en';
    multilingualSupport.setLocale(detectedLanguage);

    const translatedMessage = await multilingualSupport.translateText(userMessage, 'en');

    // Web Crawling for real-time information
    const webData = await webCrawler.crawl('your_target_url');

    // Contextual and web data integration for GPT response
    const context = userMemory.lastInteraction ? userMemory.lastInteraction.response : '';
    const gptResponse = await gptIntegration.generateResponse(context + translatedMessage + webData, 'gpt-3');

    const finalResponse = await multilingualSupport.translateText(gptResponse, detectedLanguage);
    userMemory.lastInteraction = { message: userMessage, response: finalResponse };
    await memoryManager.updateMemoryItem(userId, userMemory);

    return finalResponse;
  } catch (error) {
    console.error('Error in handleMessage:', error);
    return 'I am having trouble understanding, could you rephrase?';
  }
}

function sanitizeInput(input) {
  // Advanced sanitization logic
  const sanitizedInput = input
    .replace(/[<>]/g, '')  // Basic HTML tag stripping
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')  // Stripping control characters
    .trim();  // Removing leading/trailing whitespace
  return sanitizedInput;
}

module.exports = { bp, handleMessage };
