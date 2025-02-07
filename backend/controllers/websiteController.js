import Website  from '../models/website.model.js';
import { createOrUpdateStats } from '../utils/stats.js';
import { checkUserAndBlockStatus } from '../utils/userCheck.js';
import { getCurrentDateTime } from '../utils/getCurrentDateTime.js';

// Get all websites
export async function getWebsites(req, res) {
  try {
    const userId = req.body.userId;

    try {
      await checkUserAndBlockStatus(userId);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }

    const websites = await Website.find({ status: 'approved' });

    // Update stats for each website found
    const { year, month, day } = getCurrentDateTime();

    for (const website of websites) {
      await createOrUpdateStats({
        userId,
        websiteId: website._id,
        year,
        month,
        day,
        updates: {
          impressions: 1
        }
      });
    }
    
    res.status(200).json(websites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching websites', error: error.message });
  }
}

// view a single website
export async function viewWebsite(req, res) {
  try {

    const userId = req.body.userId;

    try {
      await checkUserAndBlockStatus(userId);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }

    const website = await Website.findById(req.params.id);
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }


    // update stats
    const { year, month, day } = getCurrentDateTime();

    await createOrUpdateStats({
      userId,
      websiteId: req.params.id,
      year,
      month,
      day,
      updates: {
        clicks: 1,
        impressions: 1
      }
    });

    res.status(200).json(website);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching website', error: error.message });
  }
}


// Get recently created 5 websites
export async function getRecentlyCreatedWebsites(req, res) {
  try {
    const userId = req.body.userId;

    try {
      await checkUserAndBlockStatus(userId);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }

    const websites = await Website.find({ status: 'approved' }).sort({ createdAt: -1 }).limit(req.params.limit || 5);

    // Update stats for each website found
    const { year, month, day } = getCurrentDateTime();

    for (const website of websites) {
      await createOrUpdateStats({
        userId,
        websiteId: website._id,
        year,
        month,
        day,
        updates: {
          impressions: 1
        }
      });
    }

    res.status(200).json(websites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching websites', error: error.message });
  }
}

// Get single website
export async function getWebsite(req, res) {
  try {
    const userId = req.body.userId;

    try {
      await checkUserAndBlockStatus(userId);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }

    const foundwebsite = await Website.findById(req.params.id);
    if (!foundwebsite) {
      return res.status(404).json({ message: 'Website not found' });
    }
    res.status(200).json(foundwebsite);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching website', error: error.message });
  }
}

// Create website
export async function createWebsite(req, res) {
  try {
    const userId = req.body.userId;

    try {
      await checkUserAndBlockStatus(userId);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }

    const website = new Website(req.body);
    const savedWebsite = await website.save();
    res.status(201).json(savedWebsite);
  } catch (error) {
    res.status(400).json({ message: 'Error creating website', error: error.message });
  }
}

// Update website
export async function updateWebsite(req, res) {
  try {
    const { userId, ...updateData } = req.body;

    try {
      await checkUserAndBlockStatus(userId);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }

    const website = await Website.findByIdAndUpdate(
      req.params.id,
      { ...updateData, status: 'pending' },
      { new: true, runValidators: true }
    );

    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }

    res.status(200).json(website);
  } catch (error) {
    res.status(400).json({ message: 'Error updating website', error: error.message });
  }
}

// Delete website
export async function deleteWebsite(req, res) {
  try {
    const { userId } = req.body;

    try {
      await checkUserAndBlockStatus(userId);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }

    const website = await Website.findByIdAndDelete(req.params.id);
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }

    res.status(200).json({ message: 'Website deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting website', error: error.message });
  }
}

// Apply discount to website
export async function discount(req, res) {
  try {
    const { userId, ...updateData } = req.body;

    try {
      await checkUserAndBlockStatus(userId);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }

    const website = await Website.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }

    res.status(200).json(website);
  } catch (error) {
    res.status(400).json({ message: 'Error applying discount to website', error: error.message });
  }
}

// Highlight media
export async function highlightMedia(req, res) {
  try {
    const { userId, months } = req.body;

    try {
      await checkUserAndBlockStatus(userId);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }

    // Calculate the end date based on current date plus the provided months
    const currentDate = new Date();
    const endDate = new Date(currentDate);
    endDate.setMonth(endDate.getMonth() + Number(months));

    const website = await Website.findByIdAndUpdate(
      req.params.id,
      { 
        highlightMonths: months,
        highlightMonthsEndDate: endDate
      },
      { new: true, runValidators: true }
    );

    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }

    res.status(200).json(website);
  } catch (error) {
    res.status(400).json({ message: 'Error highlighting media', error: error.message });
  }
}

// Get websites for a user where status is not approved
export async function getWebsitesForUserNotApproved(req, res) {
  try {
    const { userId } = req.body;

    try {
      await checkUserAndBlockStatus(userId);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }

    const websites = await Website.find({
      userId,
      status: { $in: ['pending', 'rejected', 'flagged'] }
    });

    res.status(200).json(websites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching websites', error: error.message });
  }
}

// Get websites for a user where status is approved
export async function getWebsitesForUserApproved(req, res) {
  try {
    const { userId } = req.body;

    try {
      await checkUserAndBlockStatus(userId);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }

    const websites = await Website.find({
      userId,
      status: 'approved'
    });

    res.status(200).json(websites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching websites', error: error.message });
  }
}