// Brings in the necessary modules and libraries.
require('dotenv').config(); // This package is required at the top.

// Debugging: Check if environemnt varialbes are loaded correctly.
console.log('MongoDB URI:', process.env.MONGODB_URI);
console.log('Server Port', process.env.PORT);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User'); // Import the user model

// Creates an instance of the Express application and sets up the server port.
const app = express();
const PORT = process.env.PORT || 5000;

// Configures middleware for parsing JSON and handling CORS.
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form data
app.use(cors());
app.use(express.static('views')) // Serve static files from views directory.

// Connects to MongoDB and handles connection success or failure.
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Sets up a basic route to respond to requests to the root URL.
app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/views/index.html'); // Serve the HTML file.
});

// Handle form submission
app.post('/submit', async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const user = new User({ name, email, password, role });
      await user.save();
      res.send('Form submitted and data saved successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
  });

// Starts the Express server and listens for incoming connections.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

