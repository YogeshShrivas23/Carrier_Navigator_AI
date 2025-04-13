require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('✅ Successfully connected to MongoDB!');

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Pinged your deployment. You successfully connected to MongoDB!");

    // Test creating a document
    const db = client.db("career_navigator");
    const collection = db.collection("test");
    const result = await collection.insertOne({ test: "connection" });
    console.log("✅ Successfully inserted document:", result.insertedId);

    // Test reading the document
    const findResult = await collection.findOne({ _id: result.insertedId });
    console.log("✅ Successfully found document:", findResult);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    // Close the connection
    await client.close();
    console.log('✅ MongoDB connection closed');
  }
}

run().catch(console.dir); 