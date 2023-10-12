const express = require('express');
const app = express();
const port = process.env.PORT || 1500;
const mongoose = require('mongoose');
const cors = require('cors');


app.use(cors());
const dbUrl = 'mongodb+srv://channarasad97:channarasad97@cluster0.1yye5pf.mongodb.net';
const dbName = 'mern-project';

mongoose.connect(`${dbUrl}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Connected to MongoDB: ${dbUrl}/${dbName}`);
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });



const adminRoutes = require('./routes/adminApi');
app.use('/api/admin', adminRoutes);
const productsRoutes = require('./routes/productApi');
app.use('/api/product', productsRoutes)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
