const Database = require("@replit/database");
const db = new Database();
const axios = require('axios');

const wordsRepo = {
  checkDB: async function(word) {
    console.log(`Checking DB for ${word}`);
    const keys = await db.list();
    // uncomment to empty database
    for (let key of keys) {
      db.delete(key).then(() => { });
    }
    let entry = null;
    for (let key of keys) {
      console.log(key);
      if (key === word) {
        entry = await db.get(key);
      }
    }
    return entry;
  },

  checkWordsAPI: async function getWordData(word) {
    try {
      console.log(`Checking WordsAPI for ${word}`);

      const options = {
        method: 'GET',
        url: `https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`,
        headers: {
          'X-RapidAPI-Key': process.env.WORDSAPI_KEY,
          'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
      };
      const synonymRes = await axios.request(options);

      options.url = `https://wordsapiv1.p.rapidapi.com/words/${word}/syllables`;
      const syllableRes = await axios.request(options);

      if (synonymRes.status !== 200 || syllableRes.status !== 200) {
        throw new Error(`Failed to get ${word} data from WordsAPI.`);
      }

      const listOfSynonyms = [];
      synonymRes.data.synonyms.filter(w => !(w.includes(" "))).forEach(w => listOfSynonyms.push(w));
      const numSyllables = syllableRes.data.syllables.count;
      const newEntry = {
        "word": word,
        "syllables": numSyllables,
        "synonyms": listOfSynonyms,
      };
      return newEntry;
    }
    catch (error) {
      console.error("Error occurred while getting word data: ", error.message);
      return;
    }
  },

  addToDB: async function(entry) {
    console.log(`Adding ${entry} to DB`)
    await db.set(entry.word.toString(), entry);
  }
}

module.exports = wordsRepo;
