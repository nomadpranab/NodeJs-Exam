//Get Destination Url (Short Url)
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