const { MongoClient } = require('mongodb');
const mongoDbUri = 'mongodb+srv://pranab7015:606146@cluster0.ozgqjeo.mongodb.net/';
const mongoDbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let collection; // MongoDB collection instance

// MongoDB Connection
async function connectToMongoDB() {
  try {
    const client = await MongoClient.connect(mongoDbUri, mongoDbOptions);
    const database = client.db(); 
    collection = database.collection('short_urls'); 
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error while connecting to MongoDB:', error);
    throw error;
  }
}
connectToMongoDB();

//genetrate random  url
function generateShortUrl() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortUrl = 'www.ppa.in/';
    for (let i = 0; i < 24; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      shortUrl += characters.charAt(randomIndex);
    }
    return shortUrl;
  }





  //shorten url
  async function shortenUrl(destinationUrl) {
    try {
      const existingDocument = await collection.findOne({ destinationUrl });
      if (existingDocument) {
        return existingDocument.shortUrl;
      } else {
        let shortUrl;
        do {
          shortUrl = generateShortUrl();
          const existingShortUrl = await collection.findOne({ shortUrl });
        } while (existingShortUrl);
  
        const newDocument = {
          shortUrl,
          destinationUrl,
          createdAt: new Date(),
          expiryDate: createdAt+1
        };
  
        await collection.insertOne(newDocument);
        return shortUrl;
      }
    } catch (error) {
      console.error('Error while shortening URL:', error);
      throw error;
    }
  }





// Method to update short url
async function updateShortUrl(shortUrl, newDestinationUrl) {
    try {
      const result = await collection.updateOne({ shortUrl }, { $set: { destinationUrl: newDestinationUrl } });
      return result.modifiedCount > 0;
    } catch (error) {
      console.error('Error while updating short URL:', error);
      throw error;
    }
  }




  //Get Destination Url (Short Url) → Destination Url
  async function getDestinationUrl(shortUrl) {
    try {
      const document = await collection.findOne({ shortUrl });
      if (document) {
        return document.destinationUrl;
      } else {
        return null; // Short URL not found
      }
    } catch (error) {
      console.error('Error while fetching destination URL:', error);
      throw error;
    }
  }




  //Update Expiry (Short Url, Days to add in expity)
  async function updateExpiry(shortUrl, daysToAdd) {
    try {
      const document = await collection.findOne({ shortUrl });
      if (document) {
        const newExpiryDate = new Date(document.expiryDate);
        newExpiryDate.setDate(newExpiryDate.getDate() + daysToAdd);
        const result = await collection.updateOne({ shortUrl }, { $set: { expiryDate: newExpiryDate } });
        return result.modifiedCount > 0;
      } else {
        return false; // Short URL not found
      }
    } catch (error) {
      console.error('Error while updating expiry date:', error);
      throw error;
    }
  }