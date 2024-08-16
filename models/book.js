const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookTitle: { type: String, required: true },
    bookAuthor: { type: String, required: true },
    description: { type: String, required: true }
}, {
    collection: '300392122-timothy' 
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
