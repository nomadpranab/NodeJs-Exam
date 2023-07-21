//code for method-1
//Shorten Url


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

