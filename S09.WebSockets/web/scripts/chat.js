import IOEVENTS from '../../io-events.js';

const socket = io(); //Il pourrait avoir un paramètre à io qui serait l'URL du serveur
//socket == serveur


$(document).ready(() => {

    $("#btnSend").click(() => {
        sendMessage();
    });

    $("#txtMessage").keypress(e => {
       if(e.keyCode === 13) { //Enter
            sendMessage();
       }
    });

    $("#btnUpdateUsername").click(() => {
        socket.emit(IOEVENTS.CHANGE_USERNAME, $("#txtUsername").val());
    })

});

function sendMessage() {
    const messageToSend = {
        text: $("#txtMessage").val() 
    } 

    socket.emit(IOEVENTS.SEND, messageToSend);
    $("#txtMessage").val("");
}

//TODO: Réceptions des évenements
socket.on(IOEVENTS.RECEIVED, message => {
    
    const isFromMe = message.sender.id === socket.id;

    const messageLi = createMessageUI(message, isFromMe);
    $("#chat-messages").append(messageLi);
});

socket.on(IOEVENTS.REFRESH_USERS, allUsers => {
    $(".users").empty();
    allUsers.forEach(user => {
        $(".users").append(createUserUI(user));
    });

});


function createMessageUI(message, isFromMe) {
    let messageLi = "";

    if(!isFromMe) {
        messageLi = 
            `<li class="chat-left">
                <div class="chat-avatar">
                <img src="${message.sender.avatar}" alt="${message.sender.username}">
                <div class="chat-name">${message.sender.username}</div>
                </div>  
                <div class="chat-text">${message.text}</div>
                <div class="chat-hour">${dayjs(message.timestamp).format('HH:mm')}<span class="fa fa-check-circle"></span></div>
            </li>`;
    } else {
        messageLi = 
            `<li class="chat-right">
                <div class="chat-hour">${dayjs(message.timestamp).format('HH:mm')}<span class="fa fa-check-circle"></span></div>
                <div class="chat-text">${message.text}</div>
                <div class="chat-avatar">
                    <img src="${message.sender.avatar}" alt="${message.sender.username}">
                    <div class="chat-name">${message.sender.username}</div>
                </div>
            </li>`
    }
   
    return messageLi;
}

function createUserUI(user){

    const userLi = 
        `<li class="person" data-chat="ID">
            <div class="user">
                <img src="${user.avatar}" alt="${user.username}">
            </div>
            <p class="name-time">
                <span class="name">${user.username}</span>
            </p>
        </li>`;

    
    return userLi;

}


