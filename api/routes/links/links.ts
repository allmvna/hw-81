import express from "express";
import Link from "../../models/Links";

const linksRouter = express.Router();

const generateShortUrl = async () => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const length = Math.random() < 0.5 ? 6 : 7;
    while (true) {
        const shortUrl = [...Array(length)]
            .map(() => charset[Math.floor(Math.random() * charset.length)])
            .join("");
        if (!(await Link.findOne({ shortUrl }))) {
            return shortUrl;
        }
    }
};

linksRouter.post('/', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            res.status(400).send({ error: 'URL is required' });
        } else {
            const shortUrl = await generateShortUrl();
            const newLink = new Link({ shortUrl, originalUrl: url });

            await newLink.save();
            res.status(201).json({
                shortUrl,
                originalUrl: url,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

linksRouter.get('/:shortUrl', async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const link = await Link.findOne({ shortUrl });
        if (!link) {
            res.status(404).send({ error: 'Short URL not found' });
        } else {
            res.status(301).redirect(link.originalUrl);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

export default linksRouter;
