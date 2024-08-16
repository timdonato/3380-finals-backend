const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Book = require('./models/book');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://donatot:donatot@cluster0.fiboxnx.mongodb.net/BookDB?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch(err => {
    console.error('Could not connect to MongoDB Atlas', err);
});

// GET route to fetch all books
app.get('/api/v1/book', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST route to add a new book
app.post('/api/v1/book', async (req, res) => {
    const book = new Book({
        bookTitle: req.body.bookTitle,
        bookAuthor: req.body.bookAuthor,
        description: req.body.description
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE route to remove a book
app.delete('/api/v1/book/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Cannot find book' });
        }

        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Start the server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
