const openai = require('openai');
const MemoryManager = require('./memory_manager');

class GPTIntegration {
  constructor(apiKey, memoryManager) {
    this.openaiClient = new openai.OpenAI(apiKey);
    this.memoryManager = memoryManager;
  }

  async generateResponse(userInput, engine = 'gpt-3') {
    try {
      const sanitizedInput = this.sanitizeInput(userInput);
      const context = await this.memoryManager.getMemoryItem('context');

      const response = await this.openaiClient.chat.completions.create({
        model: engine,
        messages: [{
          role: 'system',
          content: context
        }, {
          role: 'user',
          content: sanitizedInput
        }]
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
    const text = response.choices[0].message.content.trim();
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
