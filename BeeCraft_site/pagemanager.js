var titleImage = document.createElement("div");
var title = document.createElement("div");
var bee = document.createElement("div");
var content = document.createElement("div");

var footerText = [
    "©2020",
    "BeeCraft tout droits reservés.",
    "BeeCraft n'est en aucun cas affilié à Mojang AB."
]
var homeDialogs = [
    {question: "Pourquoi ce serveur et pas un autre ?", answers: [
        "Parce que si tu viens pas tu vas mourrir d'une piqure d'abeille dans 5 ans maximum.",
        "Non plus sérieusement nous avons un mode de fonctionnement qui change des serveurs que vous pouvez trouver sur internet, le staff du serveur est très à l'écoute.",
        "Vous ne pourrez pas vous ennuyer grâce aux nombreuses quêtes que vous pourrez accomplir. L'économie n'est pas définie à l'avance par le staff, \
        ce sont les joueurs qui doivent la maintenir à leurs risques et périls !"
    ]},
    {question: "Qu'est-ce que la boutique ?", answers: [
        "(Fait comme si ce texte n'était pas copié-collé)",
        "Parce que si tu viens pas tu vas mourrir d'une piqure d'abeille dans 5 ans maximum.",
        "Non plus sérieusement nous avons un mode de fonctionnement qui change des serveurs que vous pouvez trouver sur internet, le staff du serveur est très à l'écoute.",
        "Vous ne pourrez pas vous ennuyer grâce aux nombreuses quêtes que vous pourrez accomplir. L'économie n'est pas définie à l'avance par le staff, \
        ce sont les joueurs qui doivent la maintenir à leurs risques et périls !"
    ]},
]

window.onload = function()
{
    titleImage = document.getElementById("title-image");
    content = document.getElementById("content");
    title = document.getElementById("title-text");
    bee = document.getElementById("title-icon");
    showHome();
}

function showHome()
{
    titleImage.style.height = "25vw";
    changeTitleTo("BeeCraft")
    clearContent();
    closeMenu();
    showBee();
    setTimeout(() => {
        createHome();
        createFooter();
    }, 250);
}

function showShop()
{
    titleImage.style.height = "8.5vw";
    changeTitleTo("Boutique")
    clearContent();
    closeMenu();
    hideBee();
    setTimeout(() => {
        createShop();
        createFooter();
    }, 250);
}

function clearContent()
{
    content.style.opacity = "0.5";
    setTimeout(() => {
        //clear the div
        var childCount = content.childNodes.length;
        for (let i = 0; i < childCount; i++) {
            const element = content.childNodes[0];
            element.remove();
        }
        content.style.opacity = "1";
    }, 250);
}

function hideBee() {bee.style.width = "0px";}
function showBee() {bee.style.width = "6vw";}

function changeTitleTo(newTitle)
{
    title.style.opacity = "0";
    setTimeout(() => {
        title.innerHTML = newTitle;
        title.style.opacity = "1";
    }, 250);
}

function createFooter()
{
    var footer = document.createElement("div")
    footer.id = "footer";
    for (let i = 0; i < footerText.length; i++) {
        var text = document.createElement("p");
        text.id = "footer";
        text.innerHTML = footerText[i];
        footer.appendChild(text);
    }
    content.appendChild(footer);
}

function createHome()
{
    for (let i = 0; i < homeDialogs.length; i++) {
        const dialog = homeDialogs[i];
        var dialogDIV = document.createElement("div");
        dialogDIV.id = "dialog";

        var dialogQuestion = document.createElement("div");
        dialogQuestion.id = "dialog-question";

        var dialogTitle = document.createElement("h3");
        dialogTitle.id = "dialog-title";
        dialogTitle.innerHTML = dialog.question;

        var dialogAnswer = document.createElement("div");
        dialogAnswer.id = "dialog-answer";

        for (let j = 0; j < dialog.answers.length; j++) {
            var dialogText = document.createElement("p");
            dialogText.id = "dialog-text";
            dialogText.innerHTML = dialog.answers[j];

            dialogAnswer.appendChild(dialogText);
        }
        dialogQuestion.appendChild(dialogTitle);
        dialogDIV.appendChild(dialogQuestion);
        dialogDIV.appendChild(dialogAnswer);
        content.appendChild(dialogDIV);
    }
}

function createShop()
{
    var text = document.createElement("p")
    text.innerHTML = "Désolé, le shop n'est pas encore disponible. =(";
    content.appendChild(text);
}