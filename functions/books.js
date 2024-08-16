const mongoose = require('mongoose');
const Book = require('../models/book');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.handler = async (event, context) => {
  if (event.httpMethod === 'GET') {
    // Get all books
    const books = await Book.find();
    return {
      statusCode: 200,
      body: JSON.stringify(books),
    };
  } else if (event.httpMethod === 'POST') {
    // Create a new book
    const data = JSON.parse(event.body);
    const newBook = new Book(data);
    const savedBook = await newBook.save();
    return {
      statusCode: 201,
      body: JSON.stringify(savedBook),
    };
  } else {
    return {
      statusCode: 405,
      headers: { Allow: 'GET, POST' },
      body: `Method ${event.httpMethod} Not Allowed`,
    };
  }
};
