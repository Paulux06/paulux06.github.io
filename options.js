var optionsPanelOpened = false; // is options panel open
var languageMode = false; // is english or not
var nightMode = false; // is night mode or not

function setupOptions() {
    if (localStorage.getItem("night-mode") == "true")
        darkMode();
    else
        whiteMode();
}

function showOptions() {
    var options = document.getElementById("main-options-container")
    options.style.top = "20px";
}

function hideOptions() {
    var options = document.getElementById("main-options-container")
    options.style.top = "-"+options.getBoundingClientRect().height.toString()+"px";
    hideOptionsPanel();
}

function showOptionsPanel() {
    document.getElementById("main-options-container").style.transform = "rotate(72deg)";
    var panel = document.getElementById("main-options-panel")
    panel.style.right = "20px";
    optionsPanelOpened = true;
}

function hideOptionsPanel() {
    document.getElementById("main-options-container").style.transform = "rotate(0deg)";
    var panel = document.getElementById("main-options-panel")
    panel.style.right = "-"+panel.getBoundingClientRect().width.toString()+"px";
    optionsPanelOpened = false;
}

function toogleOptionsPanel() {
    if(optionsPanelOpened)
        hideOptionsPanel();
    else
        showOptionsPanel();
}

function toogleNightMode() {
    if (nightMode)
        whiteMode();
    else
        darkMode();
}

function whiteMode() {
    document.documentElement.style.setProperty("--color-white", "#FFFFFF");
    document.documentElement.style.setProperty("--color-black", "#000000");
    document.documentElement.style.setProperty("--color-grey-light", "#E0E0E0");
    document.documentElement.style.setProperty("--color-grey-normal", "#707070");
    document.documentElement.style.setProperty("--color-grey-dark", "#404040");
    document.documentElement.style.setProperty("--color-brightness", "0.2");
    nightMode = false;
    localStorage.setItem("night-mode", "false");
    document.getElementById("night-mode-btn").style.transform = "translateX(0%)";
    document.getElementById("night-mode-btn").style.backgroundColor = "var(--color-grey-dark)";
    document.getElementById("night-mode-btn").parentElement.style.borderColor = "var(--color-grey-dark)";
}
function darkMode() {
    document.documentElement.style.setProperty("--color-white", "#202020");
    document.documentElement.style.setProperty("--color-black", "#FFFFFF");
    document.documentElement.style.setProperty("--color-grey-light", "#202020");
    document.documentElement.style.setProperty("--color-grey-normal", "#707070");
    document.documentElement.style.setProperty("--color-grey-dark", "#E0E0E0");
    document.documentElement.style.setProperty("--color-brightness", "1");
    nightMode = true;
    localStorage.setItem("night-mode", "true");
    document.getElementById("night-mode-btn").style.transform = "translateX(113%)";
    document.getElementById("night-mode-btn").style.backgroundColor = "var(--color-primary-5)";
    document.getElementById("night-mode-btn").parentElement.style.borderColor = "var(--color-primary-5)";
}

function toogleLanguageMode() {

}