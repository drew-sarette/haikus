const wordsRepo = require('./wordsRepo.js');
const haikuRepo = require('./haikuRepo.js');
const cors = require("cors");
const express = require("express");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/words/:word', async (req, res) => {
  console.log("Checking in Replit DB");
  const matchInDB = await wordsRepo.checkDB(req.params.word);
  if (matchInDB) {
    res.status(200).json({
      "status": 200,
      "statusText": "OK",
      "message": "Found match in DB",
      "data": matchInDB,
    });
  }
  else {
    res.status(200).json({
      "status": 200,
      "statusText": "OK",
      "message": "New word",
      "data": await wordsRepo.checkWordsAPI(req.params.word),
    });
  }
});

app.post('/entries', async (req, res) => {
  console.log(req.body);
  try {
    const entry = req.body;
    await haikuRepo.post(entry);
    res.status(201).json({ message: 'Entry created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/entries', async (req, res) => {
  console.log("entries");
  try {
    const allEntries = await haikuRepo.getAll();
    res.status(200).json({
      "status": 200,
      "statusText": "OK",
      "message": "All haikus",
      "data": allEntries,
    });
  } catch (err) {
    res.status(500).json({
      "status": 500,
      "statusText": "Server error",
      "message": err.message,
    });
  }
});

app.delete('/entries/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await haikuRepo.delete(id);
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(80, console.log(`Server listening on port 80`));
