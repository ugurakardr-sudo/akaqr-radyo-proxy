const express = require('express');
const axios = require('axios');
const app = express();

app.get('/dinle', async (req, res) => {
    // KRAL POP - En stabil ve engellenmeyen link budur
    const targetStreamUrl = "https://dogus-live.daioncdn.net/kralpop/kralpop.m3u8";
    
    try {
        const response = await axios({
            method: 'get',
            url: targetStreamUrl,
            responseType: 'stream',
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        res.setHeader('Content-Type', 'audio/mpeg');
        response.data.pipe(res);
    } catch (error) {
        res.status(500).send("Yayin su an aktif degil, linki kontrol edin.");
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Proxy Kral Pop ile yayinda.`));
