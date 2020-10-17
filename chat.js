function loadChat() {
    clearContent();
    if (loadingBusy) return;
    CURRENT_SECTION = "chat";
    if (client.pseudo == "") {
        // ne peut pas acceder au chat
        var messageBox = document.createElement("div");
        var message = document.createElement("h3");
        var connectTextDiv = document.createElement("div");
        var logoDiv = document.createElement("div");
        var connecText = document.createElement("h3");
        var logo = document.createElement("img");
        messageBox.classList.add("centering-div");
        message.classList.add("errorlabel");
        message.innerHTML = "Désolé, il faut vous connecter pour avoir accès au chat.";
        connectTextDiv.classList.add("title-container");
        connecText.innerHTML = "Se connecter";
        connecText.onclick = tooglePanel;
        connecText.classList.add("redirect");
        logoDiv.classList.add("title-container");
        logo.classList.add("error-logo");
        logo.src = "./resources/icons/logo_big.png"
        messageBox.appendChild(message);
        connectTextDiv.appendChild(connecText);
        messageBox.appendChild(connectTextDiv);
        logoDiv.appendChild(logo);
        messageBox.appendChild(logoDiv);
        MAIN_PAGE_CONTAINER.appendChild(messageBox);
        return;
    }
    //generer la page
    var chatContainer = document.createElement("div");
    var chatCentering = document.createElement("div");
    var inputContainer = document.createElement("div");
    var textinput = document.createElement("input");
    var buttonInput = document.createElement("input");
    var chatDiv = document.createElement("div");

    chatCentering.classList.add("chat-centering")
    chatContainer.classList.add("chat-container");
    inputContainer.classList.add("chat-input-container");
    textinput.classList.add("input");
    textinput.classList.add("chat-textinput");
    textinput.id = "chat-textinput";
    buttonInput.classList.add("button");
    buttonInput.classList.add("chat-buttoninput");
    buttonInput.onclick = ()=>{sendMessage(chatDiv);};
    buttonInput.type = "button";
    chatDiv.classList.add("chat-box");
    chatDiv.id = "chat-box";
    textinput.value = "";
    buttonInput.value = "Envoyer";

    inputContainer.appendChild(textinput);
    inputContainer.appendChild(buttonInput);
    chatContainer.appendChild(chatDiv);
    chatContainer.appendChild(inputContainer);
    chatCentering.appendChild(chatContainer);
    MAIN_PAGE_CONTAINER.appendChild(chatCentering);

    updateChat(chatDiv);
}

function clearChat(chatbox) {
    while(chatbox.firstChild) {
        chatbox.removeChild(chatbox.firstChild);
    }
}

function updateChat(chatbox) {
    database.ref().child('chat').once('value').then((info) => {
        if (info == null) {clearChat(chatbox); return;}
        var data = JSON.parse(JSON.stringify(info));
        var keys = Object.keys(data);
        var messages = []

        for (let i = 0; i < keys.length; i++) {
            var authorIndex = data[keys[i]]["author"]
            var auth = "Anonyme"
            for (let i = 0; i < serverAccounts.length; i++) {
                if (serverAccounts[i].index == authorIndex) {
                    auth = serverAccounts[i].pseudo;
                    break;
                }
            }
            messages.push( {
                    author: auth+":",
                    content: data[keys[i]]["content"],
                    time: parseInt(data[keys[i]]["time"])
                }
            )
        }
        //sort messages by time
        for (let i = 0; i < messages.length; i++) {
            var minimum = messages[i].time; var minimum_index = i;
            //get the minimum
            for (let j = i+1; j < messages.length; j++) {
                if(messages[j].time < minimum) {
                    minimum = messages[j].time;
                    minimum_index = j;
                }
            }
            //swap minimum to the bottom of the list
            var tmp = messages[i];
            messages[i] = messages[minimum_index];
            messages[minimum_index] = tmp;
        }
        //convert time to date
        for (let i = 0; i < messages.length; i++) {
            messages[i].time = getDate(messages[i].time);
        }
        //display the new chat
        drawChat(chatbox, messages);
    })
    setTimeout(()=>{updateChat(chatbox);}, 4000);
}

function drawChat(chatbox, messages) {
    clearChat(chatbox);
    for (let i = 0; i < messages.length; i++) {
        var msg = messages[i]
        var msgContainer = document.createElement("div");
        var msgSpacer = document.createElement("div");
        var msgContent = document.createElement("p");
        var msgAuthor = document.createElement("p");
        var msgTime = document.createElement("p");
        msgContainer.classList.add("chat-msg-container");
        if (messages[i].author == client.pseudo+":") msgContainer.classList.add("coloredback");
        else msgContainer.classList.add("whiteback");
        msgContent.classList.add("chat-msg-content");
        msgAuthor.classList.add("chat-msg-author");
        msgTime.classList.add("chat-msg-time");
        msgAuthor.innerHTML = msg.author;
        msgContent.innerHTML = msg.content;
        msgTime.innerHTML = msg.time;
        msgSpacer.classList.add("chat-msg-spacer");
        msgContainer.appendChild(msgAuthor);
        msgContainer.appendChild(msgContent);
        msgContainer.appendChild(msgTime);
        msgSpacer.appendChild(msgContainer);
        chatbox.appendChild(msgSpacer);
        if(i == messages.length-1) { // last element (scroll to it)
            var bcr = msgSpacer.getBoundingClientRect();
            var bcrP = chatbox.getBoundingClientRect();
            chatbox.scrollTop = bcr.y+bcr.height-(bcrP.y+bcrP.height);
        }
    }
}

function sendMessage(chatbox) {
    if (document.getElementById("chat-textinput").value == "") return;
    firebase.database().ref().child('chat').once('value').then((info)=>{
        var data = JSON.parse(JSON.stringify(info));
        var textBox = document.getElementById("chat-textinput");
        var newMessage = {
            "author": client.index,
            "content": textBox.value,
            "time": Math.round(new Date().getTime() / 1000)
        };
        var Chat = JSON.parse(JSON.stringify(data));
        if (Chat != null) {
            var msgIndex = 0;
            var found = false;
            var keys = Object.keys(data);
            while(!found) {
                msgIndex = Math.round(Math.random()*10000);
                found = true;
                for (let i = 0; i < keys.length; i++) {
                    if(parseInt(keys[i]) == msgIndex) found = false;
                }
            }
            Chat[msgIndex] = newMessage;
        }
        if (Chat == null) Chat = {'0': newMessage};
        database.ref().child("chat").set(Chat);
        textBox.value = "";
        updateChat(chatbox)
    })
}

function getDate(time) {
    const DAYLONG = 24 * 60 * 60
    var d = new Date(1970, 0, 1);
    d.setSeconds(time+7200);
    var cur = new Date();
    if (cur.getTime()-d.getTime() < DAYLONG) {
        var date = d.toString();
        for (let i = 0; i < date.length; i++) {
            if (date[i] == ":") {
                return date.substring(i-2, i+3);
            }
        }
    } else {
        var dd = d.getDate();
        var mm = d.getMonth();
        if (dd < 10) dd = '0'+ dd;
        if (mm < 10) mm = '0' + mm;
        return dd+"/"+mm;
    }
}