// Update short url (Short Url, Destination Url)
async function updateShortUrl(shortUrl, newDestinationUrl) {
    try {
      const result = await collection.updateOne({ shortUrl }, { $set: { destinationUrl: newDestinationUrl } });
      return result.modifiedCount > 0;
    } catch (error) {
      console.error('Error while updating short URL:', error);
      throw error;
    }
  }