require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

const mongoUri = "mongodb+srv://apiuser:bhdgarfara12gse@techstack.reyftoo.mongodb.net/?retryWrites=true&w=majority&appName=TechStack";

const client = new MongoClient(mongoUri);
let db;
let enquiriesCollection;

async function connectDB() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await client.connect();
    console.log('✓ Connected to MongoDB Atlas successfully!');
    
    db = client.db('techstack_db');
    enquiriesCollection = db.collection('enquiries');
    
    await enquiriesCollection.createIndex({ created_at: -1 });
    console.log('✓ Database and collection initialized');
  } catch (error) {
    console.error('✗ MongoDB connection error:', error.message);
    process.exit(1);
  }
}

connectDB();

app.use(cors());
app.use(express.json());

app.post('/api/enquiries', async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;

    if (!name || !email || !mobile || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const enquiry = {
      name,
      email,
      mobile,
      message,
      created_at: new Date()
    };

    const result = await enquiriesCollection.insertOne(enquiry);
    const insertedEnquiry = await enquiriesCollection.findOne({ _id: result.insertedId });

    res.status(201).json({
      message: 'Enquiry submitted successfully',
      data: insertedEnquiry
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/enquiries', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1;
    const skip = (page - 1) * limit;

    const total = await enquiriesCollection.countDocuments();
    const data = await enquiriesCollection
      .find({})
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    res.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    database: db ? 'Connected' : 'Not connected' 
  });
});

process.on('SIGINT', async () => {
  await client.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`\n✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Health check: http://localhost:${PORT}/api/health\n`);
});