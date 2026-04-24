const express = require('express');
const axios = require('axios');
const app = express();

app.get('/dinle', async (req, res) => {
    // Best FM'in doğrudan MP3 akış linki (Tarayıcı dostu)
    const targetStreamUrl = "https://ssldyg.radyotvonline.com/best/bestfm.stream/chunklist_w1539746395.m3u8";
    // Alternatif olarak şu ham linki deneyelim:
    const backupUrl = "http://46.20.7.126:80/;stream.mp3"; 

    try {
        const response = await axios({
            method: 'get',
            url: "https://radyo.yayin.com.tr:8032/stream", // Bu çok daha stabil bir MP3 linkidir
            responseType: 'stream'
        });

        res.setHeader('Content-Type', 'audio/mpeg');
        response.data.pipe(res);
    } catch (error) {
        res.status(500).send("Yayın alınamadı.");
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Proxy hazır.`));
