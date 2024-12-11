const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// Define a route to fetch the XML data
app.get('/events', async (req, res) => {
    try {
        const response = await axios.get('https://www.lcsd.gov.hk/datagovhk/event/events.xml');
        res.set('Content-Type', 'text/xml');
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching the events:', error);
        res.status(500).json({ message: 'Error fetching the events' });
    }
});

app.get('/venues', async (req, res) => {
    try {
        const response = await axios.get('https://www.lcsd.gov.hk/datagovhk/event/venues.xml');
        res.set('Content-Type', 'text/xml');
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching the venues:', error);
        res.status(500).json({ message: 'Error fetching the venues' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});