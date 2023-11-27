const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mern-auth-user-01:mern-auth-user-01@cluster4.9pwai5y.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));