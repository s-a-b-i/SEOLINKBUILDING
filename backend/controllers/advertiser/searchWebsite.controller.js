import Website from '../../models/website.model.js';
import { checkUserAndBlockStatus } from '../../utils/userCheck.js';
import { createOrUpdateStats } from '../../utils/stats.js';
import { getCurrentDateTime } from '../../utils/getCurrentDateTime.js';

export async function searchWebsites(req, res) {
  try {
    const { 
      userId, 
      searchQuery,
      minPrice,
      maxPrice,
      da,
      ascore,
      mediaType,
      category,
      country,
      gambling,
      cbd,
      adult,
      trading,
      googleNews 
    } = req.body;

    try {
      await checkUserAndBlockStatus(userId);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }

    const filters = { status: 'approved' };

    // Handle search query
    if (searchQuery) {
      const cleanQuery = searchQuery.toLowerCase()
        .replace(/^(https?:\/\/)?(www\.)?/, '')
        .replace(/\/$/, '');

      filters.$or = [
        { webDomain: { $regex: cleanQuery, $options: 'i' } },
        { mediaName: { $regex: cleanQuery, $options: 'i' } }
      ];
    }

    // Add other filters
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }

    if (da) {
      filters.da = { $gte: Number(da[0]), $lte: Number(da[1]) };
    }

    if (ascore) {
      filters.ascore = { $gte: Number(ascore[0]), $lte: Number(ascore[1]) };
    }

    if (mediaType) {
      filters.mediaType = mediaType;
    }

    if (category) {
      filters.category = { $in: Array.isArray(category) ? category : [category] };
    }

    if (country) {
      filters.language = country;
    }

    // Handle sensitive topics
    const sensitiveTopics = [];
    if (gambling) sensitiveTopics.push('Gambling');
    if (cbd) sensitiveTopics.push('CBD');
    if (adult) sensitiveTopics.push('Adult');
    if (trading) sensitiveTopics.push('Trading');

    if (sensitiveTopics.length > 0) {
      filters.sensitiveTopics = { $in: sensitiveTopics };
    }

    if (googleNews !== undefined) {
      filters.googleNews = googleNews === true || googleNews === 'true';
    }

    const websites = await Website.find(filters);

    // Update stats
    const { year, month, day } = getCurrentDateTime();
    for (const website of websites) {
      await createOrUpdateStats({
        userId,
        websiteId: website._id,
        year,
        month,
        day,
        updates: { impressions: 1 }
      });
    }

    res.status(200).json(websites);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error searching websites', 
      error: error.message 
    });
  }
}