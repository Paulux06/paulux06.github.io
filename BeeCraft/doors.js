var loaded = false;
var logo = document.createElement("div");

window.onload = function()
{
    closeDoors();
    loadHome();
    setTimeout(openDoors, 3000);
    window.scrollTo({ top: 0});
}

function closeDoors()
{
    //get elements
    document.getElementById("doors").style.display = "block";
    setTimeout(() => {
        var left_door = document.getElementById("left-door");
        var right_door = document.getElementById("right-door");
        logo = document.getElementById("beecraft-logo");

        //close doors
        left_door.style.width = "50vw";
        right_door.style.width = "50vw";

        //spawn logo
        setTimeout(() => {
            logo.style.opacity = "1";
            setTimeout(() => {
                logo.classList.add("rotating");
            }, 50);
        }, 200);
    }, 100);
}

function openDoors()
{
    logo.style.opacity = "0";
    document.getElementById("left-door").style.width = "0px";
    document.getElementById("right-door").style.width = "0px";

    setTimeout(() => {
        logo.classList.remove(["rotating"]);
    }, 250);
    setTimeout(() => {
        document.getElementById("doors").style.display = "none";
        loadPage();
    }, 500);
}