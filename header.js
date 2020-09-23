var headerOptions = [
    {title: "Accueil", onclick: ()=>{loadAccueil();}},
    {title: "Projets", onclick: ()=>{loadProjects();}},
    {title: "Vidéos" , onclick: ()=>{loadAccueil();}}
]

function setupHeader() {
    document.getElementById("header-promo-color1").style.width = "20vw";
    document.getElementById("header-promo-color2").style.width = "20vw";
    document.getElementById("header-promo-color3").style.width = "20vw";
    document.getElementById("header-promo-color4").style.width = "20vw";
    document.getElementById("header-promo-color5").style.width = "20vw";

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