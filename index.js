var computedStyle = null;
var MAIN_PAGE_CONTAINER = document.createElement("div");
var ANIMATION_LENGTH_QUICK = 0;
var ANIMATION_LENGTH_NORMAL = 0;
var ANIMATION_LENGTH_SLOW = 0;
var loadingBusy = false;

window.onload = () => {
    computedStyle = getComputedStyle(document.documentElement);
    MAIN_PAGE_CONTAINER = document.getElementById("main-page-container");
    ANIMATION_LENGTH_QUICK = parseInt(computedStyle.getPropertyValue("--animation-length-quick"));
    ANIMATION_LENGTH_NORMAL = parseInt(computedStyle.getPropertyValue("--animation-length-normal"));
    ANIMATION_LENGTH_SLOW = parseInt(computedStyle.getPropertyValue("--animation-length-slow"));
    connexionSetup();
    setupHeader();
    setTimeout(loadAccueil, 500);
}

function clearContent() {
    while(MAIN_PAGE_CONTAINER.firstChild) {
        MAIN_PAGE_CONTAINER.removeChild(MAIN_PAGE_CONTAINER.firstChild);
    }
}