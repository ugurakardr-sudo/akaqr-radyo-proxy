const express = require('express');
const axios = require('axios');
const app = express();

app.get('/dinle', async (req, res) => {
    // Metro FM'in ham yayın adresi
    const targetStreamUrl = "http://46.20.3.201/;stream.mp3";
    
    try {
        const response = await axios({
            method: 'get',
            url: targetStreamUrl,
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': '*/*'
            }
        });

        // Tarayıcıya bunun bir ses akışı olduğunu söylüyoruz
        res.setHeader('Content-Type', 'audio/mpeg');
        response.data.pipe(res);
    } catch (error) {
        res.status(500).send("Yayın sunucusuna bağlanılamadı.");
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Proxy ${PORT} portunda hazır.`));
