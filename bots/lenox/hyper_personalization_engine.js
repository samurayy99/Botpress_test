const ai = require('./ai');

const tailorConversations = async (userPreferences, conversationalStyle, interactionHistory) => {
  try {
    // Add validation for inputs here
    // Example: if (!userPreferences || !conversationalStyle || !interactionHistory) throw new Error('Invalid input');

    const tailoredConversations = await ai.tailorConversations(userPreferences, conversationalStyle, interactionHistory);
    return tailoredConversations;
  } catch (error) {
    console.error(`Error tailoring conversations: ${error.message}`);
    return 'Unable to tailor conversation at this time.';
  }
};

const evolveBotPersonality = async (userFeedback, interactionPatterns) => {
  try {
    // Add validation for inputs here
    // Example: if (!userFeedback || !interactionPatterns) throw new Error('Invalid input');

    const evolvedPersonality = await ai.evolveBotPersonality(userFeedback, interactionPatterns);
    return evolvedPersonality;
  } catch (error) {
    console.error(`Error evolving bot personality: ${error.message}`);
    return 'Unable to evolve personality at this time.';
  }
};

module.exports = {
  tailorConversations,
  evolveBotPersonality
};
