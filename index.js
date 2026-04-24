const express = require('express');
const axios = require('axios');
const app = express();

app.get('/dinle', async (req, res) => {
    // Daha önce sende çalışan Best FM linki
    const targetStreamUrl = "https://ssldyg.radyotvonline.com/best/bestfm.stream/playlist.m3u8";
    
    try {
        const response = await axios({
            method: 'get',
            url: targetStreamUrl,
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });

        // m3u8 akışları için uygun başlık
        res.setHeader('Content-Type', 'application/x-mpegURL');
        response.data.pipe(res);
    } catch (error) {
        res.status(500).send("Radyo baglantisi kurulamadi.");
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Proxy ${PORT} portunda Best FM ile hazir.`));
