const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// RECOVERY
app.get('/attractions', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/templates/attractions.html'));
});

// STAY
app.get('/stay', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/templates/stay.html'));
});

// CAFE
app.get('/cafe', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/templates/cafe.html'));
});

// MARKET
app.get('/market', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/templates/market.html'));
});

// TRAVEL
app.get('/travel', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/templates/travel.html'));
});

// HOME
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/templates/index.html'));
});

// Language API
app.get('/api/lang/:langCode', (req, res) => {
    const filePath = path.join(__dirname, `../locales/${req.params.langCode}.json`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(404).json({ error: 'Language not found' });
        res.status(200).json(JSON.parse(data));
    });
});

module.exports = app;

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});