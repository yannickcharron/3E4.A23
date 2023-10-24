import http from 'http';
import express from 'express';
import chalk from 'chalk';

import { Server } from 'socket.io';

import IOEVENTS from './public/io-events.js';
import dayjs from 'dayjs';

const PORT = 8787;

const app = express();
const httpServer = http.createServer(app);
const socketServer = new Server(httpServer);

app.use(express.static('public'));
app.use(express.static('web'));

httpServer.listen(PORT, () => {
    console.log(chalk.blue(`Server listening on ${PORT}`));
});


//TODO: Connexion des clients


async function newUser(socket) {

}


async function sendUserIdentities() {
    
}

function randomAvatarImage() {
    const avatarNumber = Math.floor(Math.random() * 8 + 1);
    return `./images/avatar${avatarNumber}.png`;
}