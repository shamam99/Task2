require('dotenv').config();
const express = require('express');
//const connectDB = require("./config/dbConnections");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const errorHandler = require('./middlware/errorHandler'); 
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require("./routes/adminRoutes");
const cors = require('cors')


const app = express();
//connectDB();
mongoose.connect(process.env.MONGODB_URI) 
    .then(() => {
        app.listen(process.env.PORT || 3000, () => console.log(`Listening on port ${process.env.PORT || 3000}`)); 
    })
    .catch(err => console.log(err));
    

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use(errorHandler);

