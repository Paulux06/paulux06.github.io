function header(level) {
    document.body.style.backgroundColor = LIGHTGRAY_LIGHT;

    var header = document.getElementById('header');
    header.style.backgroundColor = DARKGRAY_DARK;

    var homeDIV = document.createElement('div');
    homeDIV.id = 'home';
    var home = new Image();
    home.id = 'home';
    home.src = './ressources/home.png';
    homeDIV.appendChild(home);
    header.appendChild(homeDIV);
    home.onload = function() {
        setTimeout(() => {
            home.style.opacity = 1;
        }, 20);
    }
    var buttons = [
        ['Acceuil', loadHome],
        ['Projets', loadProjects],
        ['Réseaux', loadNetworks],
        ['À propos', loadMore],
    ];
    var delay = 50;

    setTimeout(() => {
        for (let i = 0; i < buttons.length; i++) {
            setTimeout(() => {
                createButton(buttons[i][0], buttons[i][1]);
            }, delay * i);
        }
    }, delay * 2);
}

function createButton(title='', func=function(){}) {
    var header = document.getElementById('header');
    var button = document.createElement('h2');
    button.innerHTML = title;
    button.onclick = func;
    button.addEventListener('mouseover', function(event) {button.style.color = MINT_DARK});
    button.addEventListener('mouseout', function(event) {button.style.color = MINT_NORMAL});
    button.id = 'button';
    button.style.color = MINT_NORMAL;
    button.style.borderColor = MINT_NORMAL;
    header.appendChild(button);
    setTimeout(() => {
        button.style.opacity = 1;
    }, 20);
}

function loadHome() {
    hideContent()

    showContent()
}

function loadProjects() {
    hideContent()

    showContent()
}

function loadNetworks() {
    hideContent()

    showContent()
}

function loadMore() {
    hideContent()
    showContent()
}

function hideContent() {
    document.getElementById('content').style.opacity = 0;
}
function showContent() {
    setTimeout(() => {
        document.getElementById('content').style.opacity = 1;
    }, 200);
}