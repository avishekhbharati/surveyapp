//REFRENCES: https://blog.harveydelaney.com/setting-up-a-mock-api-for-your-front-end-react-project/

const express = require('express');
const apiMocker = require('connect-api-mocker');

const port = 9000;
const app = express();
 
app.use('/api', apiMocker('mock-api'));
 
console.log(`Mock API Server is up and running at: http://localhost:${port}`);
app.listen(port);