const Database = require("@replit/database");
const db = new Database();
const axios = require('axios');

const wordsRepo = {
  checkDB: async function(word) {
    console.log(`Checking DB for ${word}`);
    // db.list().then(keys => {
    //   for (let i = 0; i < keys.length; i++) {
    //     db.delete(keys[i]).then(() => { });
    //   }
    // });
    const keys = await db.list();
    let entry = null;
    for (let key of keys) {
      console.log(key);
      if (key === word) {
        entry = await db.get(key);
      }
    }
    return entry;
  },

  checkWordsAPI: async function(word) {
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
    options.url = `https://wordsapiv1.p.rapidapi.com/words/${word}/syllables`
    const syllableRes = await axios.request(options);
    try {
      const listOfSynonyms = [];
      synonymRes.data.synonyms.filter(w => !(w.includes(" "))).forEach(w => listOfSynonyms.push(w));
      const numSyllables = syllableRes.data.syllables.count;
      const newEntry = {
        "word": word,
        "syllables": numSyllables,
        "synonyms": listOfSynonyms
      }
      return newEntry;
    }
    catch {
      console.log("Lookup failed");
      return null;
    }
  },

  addToDB: async function(entry) {
    console.log(`Adding ${entry} to DB`)
    await db.set(entry.word.toString(), entry);
  }
}

module.exports = wordsRepo;
