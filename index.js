const wordsRepo = require('./wordsRepo.js');
const haikuRepo = require('./haikuRepo.js');
const cors = require("cors");
const express = require("express");

const app = express();

app.use(cors());
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

app.post('/haikus', (req, res) => {
  haikuRepo.post(req.body);
  res.status(200).json({
    "status": 201,
    "statusText": "Post created",
    "message": "Haiku added to database",
  });
})

app.listen(80, console.log(`Server listening on port 80`));
