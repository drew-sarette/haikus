const { MongoClient, ObjectId } = require('mongodb');
const mongoClient = new MongoClient(`mongodb+srv://haikuDBuser:${process.env.DB_PASSWORD}@haiku.g51ll7c.mongodb.net/?retryWrites=true&w=majority`);
const db = mongoClient.db('haikus');
const collection = db.collection('entries');

const haikuRepo = {
  getAll: async function () {
    const allEntries = await collection.find();
    return allEntries;
  },

  post: async function (entry) {
   await collection.insertOne(entry);
  } 
}