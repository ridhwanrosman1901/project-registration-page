# Registration Page

**Registration Page** is a web application designed to provide a user registration form. The application allows users to submit their details including name, email, password, and role. This project involves a simple frontend form for capturing user data and a backend server for handling and storing the submitted data.

## Project Structure

### Backend

- **`models/User.js`**: Defines the Mongoose schema and model for user data.
- **`server.js`**: Main server file that sets up the Express application, connects to MongoDB, and handles routing and middleware.

### Frontend

- **`views/index.html`**: A basic HTML file for user registration form testing, styled with Bootstrap 4.

### Environment Configuration

- **`.env`**: Contains environment variables including MongoDB URI and server port.

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager)
- MongoDB instance (e.g., MongoDB Atlas or local MongoDB server)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ridhwanrosman1901/your-repository.git
   cd your-repository
   ```

2. **Install Dependencies**

   Navigate to the project directory and install the required dependencies:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add the following configuration:

   ```env
   MONGODB_URI=your_mongodb_uri_here
   PORT=5000
   ```

4. **Run the Application**

   Start the server with the following command:

   ```bash
   npm start
   ```

   The server will be available at `http://localhost:5000`.

## File Descriptions

### Backend

- **`models/User.js`**

   Defines a Mongoose schema for user data with fields: `name`, `email`, `password`, and `role`.

   ```javascript
   const mongoose = require('mongoose');

   const userSchema = new mongoose.Schema({
       name: { type: String, required: true },
       email: { type: String, required: true, unique: true },
       password: { type: String, required: true },
       role: { type: String, required: true }
   });

   const User = mongoose.model('User', userSchema);

   module.exports = User;
   ```

- **`server.js`**

   Sets up the Express server, connects to MongoDB, and handles routing and form submission.

   ```javascript
   require('dotenv').config();
   const express = require('express');
   const mongoose = require('mongoose');
   const cors = require('cors');
   const User = require('./models/User');

   const app = express();
   const PORT = process.env.PORT || 5000;

   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
   app.use(cors());
   app.use(express.static('views'));

   mongoose.connect(process.env.MONGODB_URI, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
   })
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.log(err));

   app.get('/', (req, res) => {
       res.sendFile(__dirname + '/views/index.html');
   });

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

   app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
   });
   ```

### Frontend

- **`views/index.html`**

   A simple form for user registration with Bootstrap 4 styling.

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>User Registration</title>
       <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
   </head>
   <body>
       <div class="container">
           <h1 class="mt-5">User Registration</h1>
           <form action="/submit" method="POST" class="mt-4">
               <div class="form-group">
                   <label for="name">Name:</label>
                   <input type="text" id="name" name="name" class="form-control" required>
               </div>
               <div class="form-group">
                   <label for="email">Email:</label>
                   <input type="email" id="email" name="email" class="form-control" required>
               </div>
               <div class="form-group">
                   <label for="password">Password:</label>
                   <input type="password" id="password" name="password" class="form-control" required>
               </div>
               <div class="form-group">
                   <label for="role">Role:</label>
                   <select id="role" name="role" class="form-control" required>
                       <option value="admin">Admin</option>
                       <option value="user">User</option>
                   </select>
               </div>
               <button type="submit" class="btn btn-primary">Submit</button>
           </form>
       </div>
       <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
       <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
       <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
   </body>
   </html>
   ```

## Contributing

Feel free to contribute by submitting issues or pull requests. Please ensure to follow the project's coding standards and guidelines.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.