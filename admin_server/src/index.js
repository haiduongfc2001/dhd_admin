const db = require('./config/db');
const express = require('express');
const cors = require('cors');

const app = express();

require('dotenv').config();

const ProductRoute = require('./routes/ProductRoute');
const UserRegisterRoute = require('./routes/UserRegisterRoute');
const UserRoute = require('./routes/UserRoute');
const AdminRoute = require('./routes/AdminRoute');
const path = require("path");

// Connect to db
db.connect();

// Enable CORS
app.use(cors());

// phục vụ các tệp tin tĩnh từ thư mục tài nguyên
app.use(express.static(path.join(__dirname, '/public')));

// For user route
app.use('/', ProductRoute);
app.use('/', UserRegisterRoute);
app.use('/', UserRoute);
app.use('/admin', AdminRoute);

app.listen(5000, () => {
    console.log('Server is running...');
});
