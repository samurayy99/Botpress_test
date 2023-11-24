const i18n = require('i18n');
const { Translate } = require('@google-cloud/translate').v2;

class MultilingualSupport {
  constructor() {
    this.translate = new Translate();
    i18n.configure({
      locales: ['en', 'de', 'tr'],
      directory: __dirname + '/locales',
      defaultLocale: 'en',
    });
  }

  async translateText(text, targetLanguage) {
    try {
      let [translatedText] = await this.translate.translate(text, targetLanguage);
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      // Consider a different fallback strategy or user notification here
      return text;
    }
  }

  setLocale(languageCode) {
    i18n.setLocale(languageCode);
  }

  async detectLanguage(text) {
    try {
      const [detection] = await this.translate.detect(text);
      return detection.language;
    } catch (error) {
      console.error('Language detection error:', error);
      // Consider asking the user for their preferred language
      return 'en';
    }
  }
}

module.exports = MultilingualSupport;
