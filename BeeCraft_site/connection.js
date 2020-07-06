var connectMode = false;
var clientInfos = undefined;

function showConnectionTab()
{
    document.getElementById("page").style.filter = "blur(0px)";
    document.getElementById("connection-container").style.display = "block";
    setTimeout(() => {
        document.getElementById("connection-container").style.opacity = "1";
        document.getElementById("connection-box").style.transform = "translateY(0vh)";
        document.getElementById("page").style.filter = "blur(10px)";
    }, 30);
    if (clientInfos != undefined)
        document.getElementById("connection-deco-div").style.display = "block";
    else
        document.getElementById("connection-deco-div").style.display = "none";
}

function hideConnectionTab()
{
    document.getElementById("page").style.filter = "blur(0px)";
    document.getElementById("connection-container").style.opacity = "0";
    document.getElementById("connection-box").style.transform = "translateY(-25vh)";
    setTimeout(() => {
        document.getElementById("connection-container").style.display = "none";
        document.getElementById("page").style.filter = "none";
    }, 250);
    clearInputs();
}

function showPseudo()
{
    document.getElementById("connection-inscrit-button").style.background = "var(--gradient)";
    document.getElementById("connection-connect-button").style.background = "var(--gradient_dark)";
    if (document.documentElement.clientWidth > 1279)
        document.getElementById("connection-div-pseudo").style.height = "80px";
    else
        document.getElementById("connection-div-pseudo").style.height = "150px";
    connectMode = false;
}

function hidePseudo()
{
    document.getElementById("connection-connect-button").style.background = "var(--gradient)";
    document.getElementById("connection-inscrit-button").style.background = "var(--gradient_dark)";
    document.getElementById("connection-div-pseudo").style.height = "0px";
    connectMode = true;
}

function showLog(message)
{
    var log = document.getElementById("connection-log")
    log.innerHTML = message;
    log.style.height = "20px";
    setTimeout(() => {if(log.style.height == "20px") log.style.height = "0px";}, 2000);
}

function disconnectClient()
{
    clientInfos = undefined;
    setClientName("Connecte-toi !");
    showLog("Vous avez bien été déconnecté.");
    setTimeout(hideConnectionTab, 1000);
}

function setClientName(newName)
{
    document.getElementById("connection-text").innerHTML = newName;
}

function clearInputs()
{
    document.getElementById("connection-email").value = "";
    document.getElementById("connection-pseudo").value = "";
    document.getElementById("connection-password").value = "";
}

function sign_in()
{
    database.ref().child("Accounts").once('value').then((info) => {
        var data = JSON.parse(JSON.stringify(info));
        if (data == null) 
        {
            showLog("Désolé, une erreur s'est produite.");
            return;
        }
        var keys = Object.keys(data);
        var email_input = document.getElementById("connection-email").value;
        var pseudo_input = document.getElementById("connection-pseudo").value;
        var password_input = document.getElementById("connection-password").value;
        if (connectMode)
        {
            var inscrit = false;
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (data[key]["Email"] == email_input)
                {
                    inscrit = true;
                    console.log(getEncrypted(password_input, parseInt(key.toString())) + ' | ' + data[key]["Password"])
                    console.log(getEncrypted(password_input, key) == data[key]["Password"])
                    if (getEncrypted(password_input, key).trim == data[key]["Password"].trim)
                    {
                        showLog("Connexion réussie, bienvenue "+data[key]["Name"]+" !");
                        clearInputs();
                        setTimeout(hideConnectionTab, 1000);
                        clientInfos = {
                            name: data[key]["Name"],
                            email: data[key]["Email"],
                            index: key
                        }
                        setClientName(data[key]["Name"])
                    }
                    else
                    {
                        showLog("Mauvais mot de passe, veillez réessayer.")
                        setClientName("Connecte-toi !")
                        clientInfos = undefined;
                    }
                }
            }
            if (!inscrit)
            {
                showLog("Vous ne vous êtes pas encore inscrit.")
                setTimeout(showPseudo, 1000);
            }
        }
        else
        {
            if (pseudo_input.length < 1)
            {
                showLog("Veillez entrer un pseudo.")
                return;
            }
            if (email_input.length < 1)
            {
                showLog("Veillez entrer un Email.")
                return;
            }
            if (password_input.length < 1)
            {
                showLog("Veillez entrer un mot de passe.")
                return;
            }
            var alreadyUsed = false;
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (data[key]["Email"] == email_input)
                {
                    alreadyUsed = true;
                    showLog("Cet Email est déja pris, essayez de vous connecter !")
                    setTimeout(hidePseudo, 1000);
                }
                if (data[key]["Name"] == pseudo_input)
                {
                    alreadyUsed = true;
                    showLog("Ce pseudo est déja pris, essayez de vous connecter !")
                    setTimeout(hidePseudo, 1000);
                }
            }
            if (!alreadyUsed)
            {
                if (password_input.length > 4)
                {
                    for (let i = 0; i < password_input.length; i++) {
                        if(password_input[i] == "\\" || password_input[i] == "\'")
                        {
                            showLog("Désolé, les charactères ' et \\ sont interdits dans les mots de passe.")
                            password_input = "";
                            return;
                        }
                        
                    }
                    var IDfound = false;
                    var accountIndex = 0;
                    var key = 0;
                    while(!IDfound)
                    {
                        accountIndex = Math.round(Math.random() * 100000);
                        key=accountIndex;
                        for (let i = 0; i < keys.length; i++) {
                            IDfound = (parseInt(keys[i], 10) != accountIndex)
                            if (!IDfound)
                                break;
                        }
                    }
                    var newAccount = {
                        "Name": pseudo_input,
                        "Password": getEncrypted(password_input, key),
                        "Email": email_input
                    };
                    var Accounts = JSON.parse(JSON.stringify(data));
                    Accounts[accountIndex] = newAccount;
                    database.ref().child("Accounts").set(Accounts);
                    showLog("Votre compte à été créé, bienvenue "+pseudo_input+" !");
                    setTimeout(() => {hidePseudo(); sign_in();}, 500);
                }
                else
                showLog("Ce mot de passe est trop court ! Un peu de tenue !")
            }
        }
    });
}