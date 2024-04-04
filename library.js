// Your code goes here
const { MongoClient, ObjectId } = require("mongodb");

class Library {
  constructor(dbUrl, dbName, collName) {
    this.dbUrl = dbUrl;
    this.dbName = dbName;
    this.collName = collName;
    this.dbClient;
  }

  async client() {
    console.log(`Connecting to ${this.dbUrl}...`);
    this.dbClient = MongoClient.connect(this.dbUrl);
    console.log("Connected to Database!");
    return this.dbClient;
  }

  async test() {
    const client = await this.client();
    client.close();
  }

  async collection() {
    const client = await this.client();
    const db = client.db(this.dbName);
    const collection = db.collection(this.collName);
    return collection;
  }

  async allBooks() {
    const collection = await this.collection();
    return collection.find({}).toArray();
  }

  async findOneBook(id) {
    const docId = new ObjectId(id);
    const collection = await this.collection();
    return collection.findOne(docId);
  }

  async findBooks(query) {
    const collection = await this.collection();
    return collection.find(query);
  }

  async addBook(info) {
    const collection = await this.collection();
    await collection.insertOne(info);
    console.log("Added book!");
  }

  async changeBook(id, newInfo) {
    const mongoId = new ObjectId(id);
    const infoObj = { $set: newInfo };
    const collection = await this.collection();
    await collection.updateOne({ _id: mongoId }, infoObj);
    console.log(`Book ${id} was updated!`);
  }

  async removeBook(id) {
    const mongoId = new ObjectId(id);
    const collection = await this.collection();
    await collection.deleteOne({ _id: mongoId });
    console.log(`Boook ${id} was deleted.`);
  }
}

module.exports = { Library };
