var config = {
    apiKey: a(),
    projectId: h(),
    authDomain: h()+".firebaseapp.com",
    databaseURL: "https://"+h()+".firebaseio.com",
    storageBucket: h()+".appspot.com",
    messagingSenderId: kl()+ml(),
    appId: fd()+ju(),
    measurementId: dr()+dd()+sq()
};
// Initialize Firebase
firebase.initializeApp(config);
firebase.analytics();
var database = firebase.database();
function getEncrypted(x,t) {return gt(x,t);}

//database.ref().child("accounts").on('value', snap => console.log(JSON.stringify(snap.val())));

/*
Exemple:
    get entire database:
        firebase.database().ref().once('value').then(snap => console.log(JSON.stringify(snap)));
    get child [Chat] of database:
        firebase.database().ref().child('Chat').once('value').then(snap => console.log(JSON.stringify(snap)));
*/