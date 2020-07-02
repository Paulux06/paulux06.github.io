var config = {
    apiKey: a(),
    authDomain: h()+".firebaseapp.com",
    databaseURL: "https://"+h()+".firebaseio.com",
    storageBucket: h()+".appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

database.ref().child('Chat').on('value', snap => console.log(snap.val()));