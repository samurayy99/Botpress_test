const ai = require('./ai');

/**
 * Predicts the user's emotional state based on the provided text.
 * @param {string} text - User input text.
 * @returns {Promise<Object|null>} Emotional state or null on error.
 */
const predictEmotionalState = async (text) => {
  try {
    if (typeof text !== 'string') throw new Error('Invalid input type');
    const emotionalState = await ai.predictEmotionalState(text);
    return emotionalState;
  } catch (error) {
    console.error(`Error predicting emotional state: ${error.message}`);
    return { error: error.message };
  }
};

/**
 * Adapts the conversation based on the predicted emotional state and interaction history.
 * @param {Object} emotionalState - Predicted emotional state.
 * @param {Array} interactionHistory - User's interaction history.
 * @returns {Promise<string|null>} Adapted conversation or null on error.
 */
const adaptConversation = async (emotionalState, interactionHistory) => {
  try {
    if (typeof emotionalState !== 'object' || !Array.isArray(interactionHistory)) {
      throw new Error('Invalid input type');
    }
    const adaptedConversation = await ai.adaptConversation(emotionalState, interactionHistory);
    return adaptedConversation;
  } catch (error) {
    console.error(`Error adapting conversation: ${error.message}`);
    return { error: error.message };
  }
};

module.exports = {
  predictEmotionalState,
  adaptConversation
};
