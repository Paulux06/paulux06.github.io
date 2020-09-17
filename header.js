var headerOptions = [
    {title: "Accueil", onclick: ()=>{loadAccueil();}},
    {title: "Projets", onclick: ()=>{loadAccueil();}},
    {title: "Vidéos" , onclick: ()=>{loadAccueil();}}
]

function setupHeader() {
    var title = document.getElementById("header-promo-pseudo");
    setTimeout(()=>{
        title.style.transform = "translate(0px, 0vh) rotate(0deg) scale(0.8)";
    }, 100);
    setTimeout(()=>{
        title.style.transform = "translate(0px, 0vh) rotate(0deg) scale(1)";
    }, 1200);
    document.getElementById("header-promo-color1").style.width = "20vw";
    document.getElementById("header-promo-color2").style.width = "20vw";
    document.getElementById("header-promo-color3").style.width = "20vw";
    document.getElementById("header-promo-color4").style.width = "20vw";
    document.getElementById("header-promo-color5").style.width = "20vw";
    document.getElementById("header-promo-welcome").style.transform =
        "translate(0px, 0vh) rotate(0deg) scale(1)";
    document.getElementById("header-icon").style.transform =
        "translate(0px, 0px) rotate(0deg) scale(1)";

    var banner = document.getElementById("option-banner-container");
    var delay = 300;
    for (let i = 0; i < headerOptions.length; i++) {
        const opt = headerOptions[i];
        setTimeout(()=>{
            var container = document.createElement("div");
            container.classList.add("option-banner-div");
            var text = document.createElement("p");
            text.classList.add("option-banner-text");
            text.onclick = opt.onclick;
            text.innerHTML = opt.title;
            container.appendChild(text);
            banner.appendChild(container);
        }, i*delay)
    }

    document.documentElement.style.setProperty("--header-option-scale", "1");
    document.documentElement.style.setProperty("--header-button-scale", "1");
}