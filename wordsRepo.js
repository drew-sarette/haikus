const Database = require("@replit/database");
const db = new Database();
const axios = require('axios');

const wordsRepo = {
  checkDB: async function(word) {
    console.log(`Checking DB for ${word}`);
    const keys = await db.list();
    // uncomment to empty database
    // for (let key of keys) {
    //   db.delete(key).then(() => { });
    // }
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
    console.log(`Checking WordsAPI for ${word}`);
  
    const options = {
      method: 'GET',
      url: `https://wordsapiv1.p.rapidapi.com/words/${word}/syllables`,
      headers: {
        'X-RapidAPI-Key': process.env.WORDSAPI_KEY,
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
      }
    };
  
    let numSyllables = null;
    let listOfSynonyms = [];
  
    try {
      const syllableRes = await axios.request(options);
      numSyllables = syllableRes.data.syllables.count;
    } catch (err) {
      console.log("Failed to get syllables from WordsAPI", err.msg);
      numSyllables = 1;
    }
  
    options.url = `https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`;
  
    try {
      const synonymRes = await axios.request(options);
      listOfSynonyms = synonymRes.data.synonyms.filter(w => !(w.includes(" ")));
    } catch (err) {
      console.log("Failed to get synonyms from WordsAPI", err.msg);
    }
    return {
      "word": word,
      "syllables": numSyllables,
      "synonyms": listOfSynonyms,
    };
  },

  addToDB: async function(entry) {
    console.log(`Adding ${entry} to DB`)
    await db.set(entry.word.toString(), entry);
  }
}

module.exports = wordsRepo;
