const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const http = require('http'); // Import http module
const socketManager = require('./socketManager'); // Import the socket manager

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO using our manager
socketManager.init(server);

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Body parser middleware
app.use(express.json());

// Define API routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));


app.get('/', (req, res) => {
  res.send('CampusLend API is running...');
});

const PORT = process.env.PORT || 5001;

// Use the new 'server' to listen, not 'app'
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
