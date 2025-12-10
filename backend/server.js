const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const fs = require('fs');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')))

// MongoDB Connection
// Use environment variable or local fallback
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/realtrust';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Schemas & Models
const ContactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  city: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', ContactSchema);

const SubscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now }
});
const Subscriber = mongoose.model('Subscriber', SubscriberSchema);

// In-memory data storage
let projects = [
  {
    id: 1,
    name: "Consultation",
    description: "Project Name, Location",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    name: "Design",
    description: "Project Name, Location",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    name: "Marketing & Design",
    description: "Project Name, Location",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    name: "Consultation & Marketing",
    description: "Project Name, Location",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    name: "Consultation",
    description: "Project Name, Location",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=500&q=80"
  }
];

let clients = [
  {
    id: 1,
    name: "Rowhan Smith",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    designation: "CEO, Foreclosure",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Shipra Kayak",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    designation: "Brand Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "John Lepore",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    designation: "CEO, Foreclosure",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 4,
    name: "Marry Freeman",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    designation: "Marketing Manager at Mixit",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 5,
    name: "Lucy",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    designation: "Sales Rep at Alibaba",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
  }
];

// MongoDB models used instead of in-memory arrays for contacts and subscribers
// let contacts = [];
// let subscribers = [];

// Helper function to generate IDs
let nextId = 6;
const generateId = () => nextId++;

// Routes

// Projects routes
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.post('/api/projects', async (req, res) => {
  try {
    const { name, description, image } = req.body;
    
    const project = {
      id: generateId(),
      name,
      description,
      image: image || 'https://via.placeholder.com/450x350?text=Project' // Default placeholder
    };
    
    projects.push(project);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error processing project' });
  }
});

app.delete('/api/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  projects = projects.filter(project => project.id !== id);
  res.status(204).send();
});

// Clients routes
app.get('/api/clients', (req, res) => {
  res.json(clients);
});

app.post('/api/clients', async (req, res) => {
  try {
    const { name, description, designation, image } = req.body;
    
    const client = {
      id: generateId(),
      name,
      description,
      designation,
      image: image || 'https://via.placeholder.com/150?text=Client' // Default placeholder
    };
    
    clients.push(client);
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: 'Error processing client' });
  }
});

app.delete('/api/clients/:id', (req, res) => {
  const id = parseInt(req.params.id);
  clients = clients.filter(client => client.id !== id);
  res.status(204).send();
});

// Contact form routes
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching contacts' });
  }
});

app.post('/api/contacts', async (req, res) => {
  try {
    const { fullName, email, mobile, city } = req.body;
    
    // Create new contact
    const contact = new Contact({
      fullName,
      email,
      mobile,
      city
    });
    
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Error submitting contact form' });
  }
});

// Newsletter subscription routes
app.get('/api/subscribers', async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching subscribers' });
  }
});

app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if email already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }
    
    const subscriber = new Subscriber({ email });
    await subscriber.save();
    
    res.status(201).json(subscriber);
  } catch (error) {
    console.error('Error subscribing:', error);
    res.status(500).json({ error: 'Error processing subscription' });
  }
});

// Serve frontend static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;