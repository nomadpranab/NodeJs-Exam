// Update Expiry (Short Url, Days to add in expity)
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