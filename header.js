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
    document.getElementById("header-promo-welcome").style.transform = "translate(0px, 0vh) rotate(0deg) scale(1)";

    document.documentElement.style.setProperty("--header-option-scale", "1");
    document.documentElement.style.setProperty("--header-button-scale", "1");
}