const gpt3 = require('gpt-3-api');
const gpt4 = require('gpt-4-api');
const MemoryManager = require('./memory_manager');

class GPTIntegration {
  constructor(apiKey, memoryManager) {
    this.gpt3Client = new gpt3.Client({ apiKey });
    this.gpt4Client = new gpt4.Client({ apiKey });
    this.memoryManager = memoryManager;
  }

  async generateResponse(userInput, engine = 'gpt-3') {
    try {
      const sanitizedInput = this.sanitizeInput(userInput);
      const context = await this.memoryManager.getMemoryItem('context');
      const client = engine === 'gpt-3' ? this.gpt3Client : this.gpt4Client;

      const response = await client.request({
        action: 'text-davinci',
        prompt: `${context} ${sanitizedInput}`,
        maxTokens: 1024
      });

      const processedResponse = this.processGPTResponse(response);
      await this.memoryManager.updateMemoryItem('context', processedResponse.newContext);

      return processedResponse.text;
    } catch (error) {
      console.error(`GPT Integration error: ${error.message}`);
      return this.handleError(error);
    }
  }

  sanitizeInput(input) {
    return input.replace(/[<>]/g, '');
  }

  processGPTResponse(response) {
    const text = response.choices[0].text.trim();
    return {
      text: text,
      newContext: text
    };
  }

  handleError(error) {
    return error.code === 'APIError' ? 'Sorry, I encountered a problem.' : 'I am having trouble understanding.';
  }
}

module.exports = GPTIntegration;
