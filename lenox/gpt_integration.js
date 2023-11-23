const axios = require('axios');

class GPTIntegration {
  constructor(apiKey, endpoint) {
    this.apiKey = apiKey;
    this.endpoint = endpoint;
  }

  async getGPTResponse(prompt, options = {}) {
    const defaultOptions = {
      max_tokens: 150,
      temperature: 0.7,
      top_p: 1,
      presence_penalty: 0,
      frequency_penalty: 0,
      best_of: 1,
      n: 1,
      stop: null,
    };

    const requestOptions = { ...defaultOptions, ...options };

    try {
      const response = await axios.post(this.endpoint, {
        prompt: prompt,
        ...requestOptions,
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error in GPT integration:', error);
      return 'I'm sorry, I couldn't process that request.';
    }
  }

  // Additional methods for custom functionalities and error handling
}

module.exports = GPTIntegration;
