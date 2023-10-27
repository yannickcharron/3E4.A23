import http from 'http';
import express from 'express';
import chalk from 'chalk';

import { Server } from 'socket.io';

import IOEVENTS from './public/io-events.js';
import dayjs from 'dayjs';

const PORT = 1337;

const app = express();
const httpServer = http.createServer(app);
const socketServer = new Server(httpServer);

app.use(express.static('public'));
app.use(express.static('web'));

httpServer.listen(PORT, () => {
    console.log(chalk.blue(`Server listening on ${PORT}`));
});


//TODO: Connexion des clients
socketServer.on(IOEVENTS.CONNECTION, client => {
    //console.log(client.id);
    //Tout le code de communication pour un client se retrouve ici

    registerNewClient(client);
    
    client.on(IOEVENTS.SEND, message => {
        const messageToBroadcast = {
            sender: client.data,
            text: message.text,
            timestamp: dayjs()
        };
        //socketServer.emit == broadcast à tous les clients
        socketServer.emit(IOEVENTS.RECEIVED, messageToBroadcast);
    });

    client.on(IOEVENTS.CHANGE_USERNAME, username => {
        client.data.username = username;
        sendUserIdentities();
    })

    client.on(IOEVENTS.DISCONNECT, reason => {
        console.log(reason);
        sendUserIdentities();
    })

});


async function registerNewClient(client) {

    client.data.id = client.id;
    client.data.username = 'Anonyme';
    client.data.avatar = randomAvatarImage();

    sendUserIdentities();
}


async function sendUserIdentities() {

    const clientsConnected = await socketServer.fetchSockets();

    const allUsers = clientsConnected.map(c => c.data);
    
    socketServer.emit(IOEVENTS.REFRESH_USERS, allUsers);
    
}

function randomAvatarImage() {
    const avatarNumber = Math.floor(Math.random() * 8 + 1);
    return `./images/avatar${avatarNumber}.png`;
}