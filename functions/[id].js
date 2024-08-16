const mongoose = require('mongoose');
const Book = require('../models/book');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.handler = async (event, context) => {
  const { id } = event.queryStringParameters;

  if (event.httpMethod === 'DELETE') {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Book not found' }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Book deleted' }),
    };
  } else {
    return {
      statusCode: 405,
      headers: { Allow: 'DELETE' },
      body: `Method ${event.httpMethod} Not Allowed`,
    };
  }
};
