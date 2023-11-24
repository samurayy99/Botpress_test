const { Transformers } = require('transformers');

const transformers = new Transformers();

const sentimentAnalysis = async (text) => {
  if (!text || typeof text !== 'string') {
    console.error('Invalid input for sentiment analysis');
    return { error: 'Invalid input' };
  }

  try {
    const sentiment = await transformers.sentimentAnalysis(text);
    const sentimentScores = sentiment?.data?.sentiment;
    if (!sentimentScores) throw new Error('Invalid sentiment response');
    return sentimentScores;
  } catch (error) {
    console.error(`Error analyzing sentiment: ${error.message}`);
    return { error: error.message };
  }
};

const namedEntityRecognition = async (text) => {
  if (!text || typeof text !== 'string') {
    console.error('Invalid input for named entity recognition');
    return { error: 'Invalid input' };
  }

  try {
    const namedEntities = await transformers.namedEntityRecognition(text);
    const entities = namedEntities?.data?.entities;
    if (!entities) throw new Error('Invalid NER response');
    return entities;
  } catch (error) {
    console.error(`Error recognizing named entities: ${error.message}`);
    return { error: error.message };
  }
};

const questionAnswering = async (question, context) => {
  if (!question || typeof question !== 'string' || !context || typeof context !== 'string') {
    console.error('Invalid input for question answering');
    return { error: 'Invalid input' };
  }

  try {
    const answers = await transformers.questionAnswering(question, context);
    const answer = answers?.data?.answers[0]?.text;
    if (!answer) throw new Error('Invalid QA response');
    return answer;
  } catch (error) {
    console.error(`Error answering question: ${error.message}`);
    return { error: error.message };
  }
};

module.exports = {
  sentimentAnalysis,
  namedEntityRecognition,
  questionAnswering
};
