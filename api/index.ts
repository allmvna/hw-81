import express from 'express';
import cors from 'cors';
import linksRouter from "./routes/links/links";
import mongoDb from "./mongoDb";
import mongoose from "mongoose";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/links', linksRouter);


const run = async () => {
    await mongoose.connect('mongodb://localhost/app');

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });

    process.on('exit', err => {
        mongoDb.disconnect();
    })
};

run().catch(e => console.error(e));


