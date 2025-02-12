const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;
const API_KEY = '57515059ce2101a5953a36e6a283173b';

app.use(cors());

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    
    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    console.log(`Received request for city: ${city}`);

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        console.log(`Weather data received for ${city}:`, response.data);

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error.response?.data || error.message);
        res.status(500).json({ error: 'City not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
