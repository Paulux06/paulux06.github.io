function setup() {
    header(0);

    //add plx image
    var promo = document.createElement('div');
    promo.id = 'promo';
    promo.style.backgroundImage = "url('./ressources/plx.png')";
    promo.style.backgroundSize = '100% 100%';

    var button = document.createElement('div');
    button.id = 'button';
    
    var text = document.createElement('p');
    text.id = 'button';
    text.innerHTML = "Voir plus";

    var icon = new Image();
    icon.src = './ressources/button_icon.png';
    icon.id = 'button';

    button.appendChild(text); button.appendChild(icon);
    document.getElementById('content').appendChild(promo);
    setTimeout(() => {promo.appendChild(button);}, 500);

    button.onclick = function() {window.location.href = './projects/plx/index.html'};

    var space = document.createElement('div');
    space.id = 'space';
    document.getElementById('content').appendChild(space);
}