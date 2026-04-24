const express = require('express');
const axios = require('axios');
const app = express();

app.get('/dinle', async (req, res) => {
    const targetStreamUrl = "https://listen.powerapp.com.tr/powerturkdans/abr/playlist.m3u8";
    try {
        const response = await axios({
            method: 'get',
            url: targetStreamUrl,
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://www.powerapp.com.tr/'
            }
        });
        res.setHeader('Content-Type', 'audio/mpeg');
        response.data.pipe(res);
    } catch (error) {
        res.status(500).send("Yayın alınamadı.");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy ${PORT} portunda hazır.`));
