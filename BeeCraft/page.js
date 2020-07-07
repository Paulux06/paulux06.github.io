var scrollAmount = 0;

function loadPage()
{
    var branding = document.getElementById("branding");
    var header = document.getElementById("header-container");
    var more_button = document.getElementById("more-button-container");
    var ip = document.getElementById("ip-container");

    branding.classList.add("bottom-slide-slow");
    header.classList.add("top-slide-quick");
    more_button.classList.add("bottom-slide-normal");
    ip.classList.add("left-slide-normal");
}

function goto_shop()
{
    closeDoors();
    loadShop();
    setTimeout(openDoors, 1000);
}

function showMore()
{
    window.scrollBy(0, document.documentElement.clientHeight * 0.75);
}