/* eslint-disable prettier/prettier */
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const https = require('https');
const port = 3000;

const options = {
    key: fs.readFileSync('private.key'),
    cert: fs.readFileSync('certificate.crt')
};


app.use(cors());

app.get('/images', (req, res) => {
    const imageDir = '../AppPages/media/images/home';

    fs.readdir(imageDir, (err, files) => {
        if (err) {
            res.status(500).send('Error reading images directory');
        } else {
            const images = files.filter(file => path.extname(file).toLowerCase() === '.jpg' || path.extname(file).toLowerCase() === '.png');
            res.json(images);
        }
    });
});

app.get('/md', (req, res) => {
    res.sendFile(path.join(__dirname, '../AppPages/media/images/home/Options/mall.png'));
});

const server = https.createServer(options, app);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
