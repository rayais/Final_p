const express = require('express');
const config = require('./config/config');
const mainrouter = require('./router/mainrouter');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const path = require('path');

const httpPort = 5410; // Keep your existing HTTP port
const httpsPort = 3001; // New HTTPS port
const app = express();
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend's origin
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization', // Include Authorization in allowed headers
};

// SSL setup
const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'server.cert'))
};

// Use JSON parser and CORS
app.use(express.json());
config();
app.use(cors(corsOptions));

// Main routes
app.use('/', mainrouter);

// Start HTTP server
app.listen(httpPort, () => {
    console.log(`HTTP server running on http://localhost:${httpPort}`);
});

// Start HTTPS server
https.createServer(sslOptions, app).listen(httpsPort, () => {
    console.log(`HTTPS server running on https://localhost:${httpsPort}`);
});
