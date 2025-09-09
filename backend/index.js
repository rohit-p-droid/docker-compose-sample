const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 30000;

// CORS middleware
app.use((req, res, next) => {
  // Get single CORS origin from environment variable
  const allowedOrigin = process.env.CORS_ORIGINS || 'http://localhost:30001';
  
  console.log('Allowed CORS Origin:', allowedOrigin);
  
  const origin = req.headers.origin;
  console.log('Request Origin:', origin);
  
  if (origin === allowedOrigin) {
    res.header('Access-Control-Allow-Origin', origin);
    console.log('CORS allowed for origin:', origin);
  } else {
    console.log('CORS blocked for origin:', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware to parse JSON
app.use(express.json());

// Sample data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 }
];

const products = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
  { id: 2, name: 'Coffee Mug', price: 12.99, category: 'Home' },
  { id: 3, name: 'Book', price: 19.99, category: 'Education' }
];

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Welcome to the Simple API!',
    endpoints: {
      users: '/api/users',
      products: '/api/products',
      health: '/api/health'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Get all users
app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    data: users,
    count: users.length
  });
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  res.json({
    success: true,
    data: user
  });
});

// Get all products
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    data: products,
    count: products.length
  });
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  
  res.json({
    success: true,
    data: product
  });
});

// Create a new user
app.post('/api/users', (req, res) => {
  const { name, email, age } = req.body;
  
  if (!name || !email || !age) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and age are required'
    });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email,
    age
  };
  
  users.push(newUser);
  
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newUser
  });
});

// Create a new product
app.post('/api/products', (req, res) => {
  const { name, price, category } = req.body;
  
  if (!name || !price || !category) {
    return res.status(400).json({
      success: false,
      message: 'Name, price, and category are required'
    });
  }
  
  const newProduct = {
    id: products.length + 1,
    name,
    price: parseFloat(price),
    category
  };
  
  products.push(newProduct);
  
  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: newProduct
  });
});



app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 API Documentation:`);
  console.log(`   GET  / - API overview`);
  console.log(`   GET  /api/health - Health check`);
  console.log(`   GET  /api/users - Get all users`);
  console.log(`   GET  /api/users/:id - Get user by ID`);
  console.log(`   POST /api/users - Create new user`);
  console.log(`   GET  /api/products - Get all products`);
  console.log(`   GET  /api/products/:id - Get product by ID`);
  console.log(`   POST /api/products - Create new product`);
});
