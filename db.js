const { MongoClient, ServerApiVersion } = require('mongodb');

let client = null;

async function connect() {
  if (client) {
    return client;
  }

  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ MongoDB connected successfully");
    
    return client;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

function getClient() {
  if (!client) {
    throw new Error('MongoDB client not initialized');
  }
  return client;
}

async function close() {
  if (client) {
    await client.close();
    client = null;
  }
}

module.exports = {
  connect,
  getClient,
  close
}; 