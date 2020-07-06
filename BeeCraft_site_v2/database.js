var ClientConnected = false;

var config = {
    apiKey: a(),
    authDomain: h()+".firebaseapp.com",
    databaseURL: "https://"+h()+".firebaseio.com",
    storageBucket: h()+".appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

function getEncrypted(x,t) {return gt(x,t);}

//database.ref().child("Chat").on('value', snap => console.log(JSON.stringify(snap.val())));

/*
Exemple:
    get entire database:
        firebase.database().ref().once('value').then(snap => console.log(JSON.stringify(snap)));

    get child [Chat] of database:
        firebase.database().ref().child('Chat').once('value').then(snap => console.log(JSON.stringify(snap)));
*/