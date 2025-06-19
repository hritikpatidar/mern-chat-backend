import express from "express";
import dotenv from "dotenv";
import file_upload from "express-fileupload";
import cors from "cors";

import { connect_db } from "./src/helpers/db_connection.js";
import main_route from "./src/index.js";
import path from 'path';
import setupSocket from "./src/helpers/socket.js";

const app = express();
app.use(express.urlencoded({ extends: true }));
app.use(express.json());
app.use(file_upload());
app.use(cors())

app.use('/api', main_route);

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index1.html'); 
});

let port = process.env.PORT || 3000
const server = app.listen(port, () => {
    console.log(`Smartfit Server Is Running At Port: ${port}`);
    connect_db();
});

setupSocket(server) 
