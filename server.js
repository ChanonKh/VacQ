const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

//Load env vars
dotenv.config({path:'./config/config.env'});

connectDB();

const hospitals = require('./routes/hospitals');
const auth = require('./routes/auth');
const appointments = require('./routes/appointments');

const app=express();
app.use(cors());

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Sanitize Data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//prevent XSS attacks
app.use(xss());

//Rate Limitting
const limiter = rateLimit({
    windowsMS:10*60*100, //10 mins
    max: 5
});
app.use(limiter);

//Prevent http param pollutions
app.use(hpp());

//Enable CORS
app.use(cors());

app.use('/api/v1/hospitals', hospitals);
app.use('/api/v1/auth', auth);
app.use('/api/v1/appointments',appointments);

const PORT=process.env.PORT || 5000;
const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT));
process.on('unhandledRejection',(err,promise) => {
    console.log(`Error: ${err.message}`);
    server.close(()=>process.exit(1));
});