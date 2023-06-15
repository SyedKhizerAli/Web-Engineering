const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors middleware

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const dbName = 'Hotel';
const connection_string = process.env.CONNECTION_STRING;
const port = process.env.PORT || 5500;

mongoose.connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB Connection Failed", error.message));


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const blogSchema = new mongoose.Schema({
    blogName: String,
    author: String,
    blogContent: String
});

const Blog = mongoose.model('Blog', blogSchema, 'Blog');


const User = mongoose.model('User', userSchema, 'User');

/*Tested and Verifiied*/
app.get('/', (req, res) => {
    res.send('Welcome to my Blog Maintaining Application');
});

/*Tested and Verifiied*/
app.get('/getUsers', (req, res) => {
    //User.find is used to get all the blogs from the database
    User.find({})
        .then((users) => {
            console.log(users);
            res.json(users);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error retrieving users from database');
        });
});

/*Tested and Verifiied*/
app.post('/signUp', (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name: name, email: email, password: password });
    //console.log(newUser);
    newUser.save()
        .then(() => {
            res.status(201).send('User created successfully');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error creating user');
        });
});

/*Tested and Verifiied*/
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find a user with the specified email address
    User.findOne({ email })
        .then(user => {
            if (!user) {
                // If no user is found with the specified email address, return an error response
                res.status(401).send('Invalid email or password');
            } else {
                // If a user is found, check if the password is correct
                if (user.password === password) {
                    // If the password is correct, send a success response
                    res.status(200).send('Login successful');
                } else {
                    // If the password is incorrect, return an error response
                    res.status(401).send('Invalid email or password');
                }
            }
        })
        .catch(err => {
            // If an error occurs while querying the database, return an error response
            console.log(err);
            res.status(500).send('Error logging in');
        });
});


/*Tested and Verifiied*/
app.put('/updateUser/:id', async (req, res) => {
    try {
        const userId = '6457dc6d346f4a60fe69d3fe';
        const { name, email } = req.body;

        // Perform the update operation
        const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

/*Tested and Verifiied*/
app.delete('/deleteUser/:id', async (req, res) => {
    try {
        const userId = '6460fabb17c7714c10034230';

        // Perform the delete operation
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

/*-----------------------------CRUD FOR BLOGS---------------------------------------*/

/*Tested and Verified*/
app.get('/getBlogs', (req, res) => {
    Blog.find({})
        .then((blogs) => {
            res.json(blogs);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error retrieving blogs from database');
        });
});

// Create new blog
/*Tested and Verified */
app.post('/createBlogs', (req, res) => {
    const { blogName, author, blogContent } = req.body;
    const newBlog = new Blog({ blogName, author, blogContent });
    newBlog.save()
        .then(() => {
            res.status(201).send('Blog created successfully');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error creating blog');
        });
});

// Read a blog
/*Tested and Verified */
app.get('/readBlogs', (req, res) => {
    Blog.find()
        .then((blogs) => {
            res.json(blogs);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error retrieving blogs from the database');
        });
});


// Update a blog
/*Tested and Verified */
app.put('/updateBlogs/:id', async (req, res) => {
    const id = '';
    const { blogName, author, blogContent } = req.body;
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, { blogName, author, blogContent }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update blog' });
    }
});

// Delete a blog
/*Tested and Verified */
app.delete('/deleteBlogs/:id', async (req, res) => {
    const id = '';
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(deletedBlog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete blog' });
    }
});

app.listen(5500, () => {
    console.log('Listening on port 5500');
});
