var credits_expanded = false;
function setupCredits() {
    let arrow = document.getElementById("credits-arrow");
    arrow.addEventListener("mouseover", hoverArrow);
    arrow.addEventListener("mouseout", unhoverArrow);
    arrow.addEventListener("click", clickArrow);
    loadCredits(CONSTANTS.PAUL);
}

function hoverArrow() {
    SOUNDS.GUI.HOVER.play();
    let arrow = document.getElementById("credits-arrow");
    if (credits_expanded) {
        arrow.style.left = "-2px";
    } else {
        arrow.style.left = "calc(100vw - 8vh + 2px)";
    }
}

function unhoverArrow() {
    let arrow = document.getElementById("credits-arrow");
    if (credits_expanded) {
        arrow.style.left = "-10px";
    } else {
        arrow.style.left = "calc(100vw - 8vh + 10px)";
    }
}

function clickArrow() {
    SOUNDS.GUI.CLICK.play();
    let arrow = document.getElementById("credits-arrow");
    let content = document.getElementById("credits-content");
    if (credits_expanded) {
        arrow.style.borderTopLeftRadius = "4vh";
        arrow.style.borderBottomLeftRadius = "4vh";
        arrow.style.borderTopRightRadius = "0vh";
        arrow.style.borderBottomRightRadius = "0vh";
        arrow.style.left = "calc(100vw - 8vh + 10px)";
        arrow.style.backgroundImage = 'url("./resources/images/arrow_left.svg")';
        content.style.left = "100vw";
    } else {
        arrow.style.borderTopLeftRadius = "0vh";
        arrow.style.borderBottomLeftRadius = "0vh";
        arrow.style.borderTopRightRadius = "4vh";
        arrow.style.borderBottomRightRadius = "4vh";
        arrow.style.left = "0px";
        arrow.style.backgroundImage = 'url("./resources/images/arrow_right.svg")';
        content.style.left = "0vw";
    }
    credits_expanded = !credits_expanded;
}

function loadCredits(name) {
    SOUNDS.GUI.CLICK.play();
    let visu = document.getElementById("credits-visu");
    let paul = document.getElementById("credits-name-paul");
    let tom = document.getElementById("credits-name-tom");
    let robin = document.getElementById("credits-name-robin");
    let benj = document.getElementById("credits-name-benjamin");
    paul.style.backgroundColor = "#12233420"; tom.style.backgroundColor = "#12233420";
    benj.style.backgroundColor = "#12233420"; robin.style.backgroundColor = "#12233420";
    paul.style.transform = "scale(1)"; tom.style.transform = "scale(1)";
    benj.style.transform = "scale(1)"; robin.style.transform = "scale(1)";
    visu.style.opacity = "0";
    setTimeout(() => {
        switch (name) {
            case CONSTANTS.PAUL:
                visu.src = "./credits/paul.html";
                paul.style.backgroundColor = "#122334FF";
                paul.style.transform = "scale(1.05)";
                break;
            case CONSTANTS.TOM:
                visu.src = "./credits/tom.html";
                tom.style.backgroundColor = "#122334FF";
                tom.style.transform = "scale(1.05)";
                break;
            case CONSTANTS.ROBIN:
                visu.src = "./credits/robin.html";
                robin.style.backgroundColor = "#122334FF";
                robin.style.transform = "scale(1.05)";
                break;
            case CONSTANTS.BENJAMIN:
                visu.src = "./credits/benjamin.html";
                benj.style.backgroundColor = "#122334FF";
                benj.style.transform = "scale(1.05)";
                break;
            default:
                break;
        }
        visu.style.opacity = "1";
    }, 210);
}