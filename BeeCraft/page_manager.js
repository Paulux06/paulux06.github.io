var dialogs = [
    {
        title: "Pourquoi ce serveur et pas un autre ?",
        subtitle: [
            "Parce que si tu viens pas tu vas mourrir d'une piqure d'abeille dans 5 ans maximum.",
            "Non plus sérieusement nous avons un mode de fonctionnement qui change des serveurs que vous pouvez trouver sur internet, \
            et le staff du serveur est très à l'écoute !",
            "Vous ne pourrez pas vous ennuyer grâce aux nombreuses quêtes que vous pourrez accomplir. L'économie n'est pas définie à l'avance par le staff, \
            ce sont les joueurs qui doivent la maintenir à leurs risques et périls !"
        ],
        icon: "./ressources/beecraft_bee.png",
        side: true //True: icon at right, False: icon at left
    },
    {
        title: "Pourquoi ce serveur et pas un autre ?",
        subtitle: [
            "Parce que si tu viens pas tu vas mourrir d'une piqure d'abeille dans 5 ans maximum.",
            "Non plus sérieusement nous avons un mode de fonctionnement qui change des serveurs que vous pouvez trouver sur internet, \
            et le staff du serveur est très à l'écoute !",
            "Vous ne pourrez pas vous ennuyer grâce aux nombreuses quêtes que vous pourrez accomplir. L'économie n'est pas définie à l'avance par le staff, \
            ce sont les joueurs qui doivent la maintenir à leurs risques et périls !"
        ],
        icon: "./ressources/beecraft_bee.png",
        side: false //True: icon at right, False: icon at left
    },
    {
        title: "Pourquoi ce serveur et pas un autre ?",
        subtitle: [
            "Parce que si tu viens pas tu vas mourrir d'une piqure d'abeille dans 5 ans maximum.",
            "Non plus sérieusement nous avons un mode de fonctionnement qui change des serveurs que vous pouvez trouver sur internet, \
            et le staff du serveur est très à l'écoute !",
            "Vous ne pourrez pas vous ennuyer grâce aux nombreuses quêtes que vous pourrez accomplir. L'économie n'est pas définie à l'avance par le staff, \
            ce sont les joueurs qui doivent la maintenir à leurs risques et périls !"
        ],
        icon: "./ressources/beecraft_bee.png",
        side: true //True: icon at right, False: icon at left
    },
    {
        title: "Pourquoi ce serveur et pas un autre ?",
        subtitle: [
            "Parce que si tu viens pas tu vas mourrir d'une piqure d'abeille dans 5 ans maximum.",
            "Non plus sérieusement nous avons un mode de fonctionnement qui change des serveurs que vous pouvez trouver sur internet, \
            et le staff du serveur est très à l'écoute !",
            "Vous ne pourrez pas vous ennuyer grâce aux nombreuses quêtes que vous pourrez accomplir. L'économie n'est pas définie à l'avance par le staff, \
            ce sont les joueurs qui doivent la maintenir à leurs risques et périls !"
        ],
        icon: "./ressources/beecraft_bee.png",
        side: false //True: icon at right, False: icon at left
    }
]

function loadHome()
{
    var container = document.getElementById("dialogs-container")
    for(let i = 0; i < dialogs.length; i++)
    {
        const dialogObject = dialogs[i];
        var dialogDIV = document.createElement("div");
        var leftDIV = document.createElement("div");
        var rightDIV = document.createElement("div");
        var title = document.createElement("h3");
        var subtitle = document.createElement("div");
        var icon = document.createElement("img");
        var info = document.createElement("p");

        dialogDIV.id = "dialog-div";
        leftDIV.id = "dialog-left-panel";
        rightDIV.id = "dialog-right-panel";
        title.id = "dialog-title";
        subtitle.id = "dialog-subtitle-div";
        icon.id = "dialog-icon";
        icon.src = dialogObject.icon;
        info.id = "dialog-info"
        dialogDIV.classList.add("dialog");

        title.innerHTML = dialogObject.title;

        for (let j = 0; j < dialogObject.subtitle.length; j++) {
            var text = document.createElement("p");
            text.id = "dialog-subtitle-text";
            text.innerHTML = dialogObject.subtitle[j];
            subtitle.appendChild(text);
        }

        if (dialogObject.side)
        {
            leftDIV.appendChild(title);
            leftDIV.appendChild(subtitle);
            rightDIV.appendChild(icon);
            info.innerHTML = "right";
        }
        else
        {
            rightDIV.appendChild(title);
            rightDIV.appendChild(subtitle);
            leftDIV.appendChild(icon);
            info.innerHTML = "left";
        }
        
        dialogDIV.appendChild(leftDIV);
        dialogDIV.appendChild(rightDIV);
        dialogDIV.appendChild(info);

        container.appendChild(dialogDIV);
    }
}

function loadShop()
{
    
}

function loadVotes()
{
    
}

window.addEventListener('scroll', function(ev)
{
    var dialogList = document.getElementsByClassName("dialog")
    for (let i = 0; i < dialogList.length; i++) {
        const dialog = dialogList[i];
        const rect = dialog.getBoundingClientRect();
        var animation_name = "";
        for (let j = 0; j < dialog.childNodes.length; j++) {
            const child = dialog.childNodes[j];
            if (child.id == "dialog-info")
             animation_name = (child.innerHTML == "right") ? "right-slide-normal": "left-slide-normal";
        }

        if (rect.top - document.documentElement.clientHeight < - 10) //dialog show at screen
        {
            dialog.classList.add(animation_name)
        }
        else
        {
            dialog.classList.remove(animation_name)
        }
    }
    var h = 100 - window.scrollY / 30;
    document.getElementById("head-pic").style.height = h.toString()+"vh"
    document.getElementById("more-button-container").style.bottom = 100+window.scrollY/3+"px"
})