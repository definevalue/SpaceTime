const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const mongoose = require('mongoose');
require('dotenv').config();

//import routes
const userRoutes = require('./routes/userRoute');
const authRoutes = require('./routes/authRoute');

const app = express();

//use middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.static('public'))

//connect to database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true } );

mongoose.connection.on('error', () => {
    console.log("Cannot connect to database");
});

//use routes
app.use('/', userRoutes);
app.use('/', authRoutes);

//catch authentication and authorization error
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error" : err.name + ": " + err.message})
    }else if (err) {
        res.status(400).json({"error" : err.name + ": " + err.message})
        console.log(err)
    }
});
   
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});