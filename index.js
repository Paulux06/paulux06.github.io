var header = document.createElement("div");
var root = getComputedStyle(document.documentElement);

window.addEventListener("mousewheel", (event) => {
    if (event.deltaY > 2)
        header.style.top = "-50px";
    if (event.deltaY < -2)
        header.style.top = "10px";
})

window.onload = () => {
    connexionSetup();
    goHome();
    header = document.getElementById("header-container");
}