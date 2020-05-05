var scrl_lvl = 0;

function header(level) {
    var headerDiv = document.getElementById('header');

    var folder = '';
    for (let i = 0; i < level; i++) {
        folder += '../';
    }

    //create header
    var menus = [
        {title: 'Acceuil', redirect: 'index.html'},
        {title: 'Mes projets', redirect: 'projects/index.html'},
        {title: 'Speed Coding', redirect: 'speed_coding/index.html'},
        {title: 'Réseaux', redirect: 'reseaux/index.html'}
    ];
    for (let i = 0; i < menus.length; i++) {
        var redirect = menus[i].redirect;
        menus[i].redirect = folder + redirect;
    }
    var icon = new Image();
    icon.src = folder + 'ressources/icon.png';
    icon.id = 'icon';

    var iconDiv = document.createElement('div');
    iconDiv.id = "icon";
    var menuDiv = document.createElement('div');
    menuDiv.id = "menu";

    iconDiv.appendChild(icon);
    for (let i = 0; i < menus.length; i++) {
        var menuOption = document.createElement('div');
        menuOption.id = 'menuOption';
        var text = document.createElement('a');
        text.id = 'menuOption';
        text.innerHTML = menus[i].title;
        text.href = menus[i].redirect;
        menuOption.style.width = text.style.width;
        menuOption.appendChild(text)
        menuDiv.appendChild(menuOption);
    }

    headerDiv.appendChild(iconDiv); headerDiv.appendChild(menuDiv);

    document.addEventListener('wheel', function(event) {
        scrl_lvl += event.deltaY;
        if(scrl_lvl < -50) {
            scrl_lvl = -50;
            document.getElementById('header').style.transform = 'translateY(0%)';
        }
        if(scrl_lvl > 50) {
            scrl_lvl = 50;
            document.getElementById('header').style.transform = 'translateY(-100%)';
        }
    })
}