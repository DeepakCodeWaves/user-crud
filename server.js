require('dotenv').config(); 
console.log("MongoDB URI:", process.env.MONGODB_URI);

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
    console.error('Error: MONGODB_URI is not defined in the .env file');
    process.exit(1); 
}

mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Could not connect to MongoDB...', err);
        process.exit(1); 
    });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
