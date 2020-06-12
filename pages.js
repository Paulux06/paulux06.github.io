var explorerOptions = [
    { title: 'index.html', func: displayIndex},
    { title: 'TI.html', func: displayTI}
];

function selectEOption(index)
{
    document.getElementById('selector').style.transform = "translateY("+3.4*index+"vh)";
}

function clear() {
    var pg = document.getElementById('page');
    var pgct = document.getElementById('page-content');
    var npgct = document.createElement('div');
    npgct.id = "page-content";
    pg.removeChild(pgct);
    pg.appendChild(npgct);
}

function displayTI() {
    clear();
    var main = document.getElementById('page-content');
    var content = document.createElement('iframe')
    content.src = "./TI/files/index.html"
    content.id = "page-content"
    main.appendChild(content);
}

function displayIndex() {
    clear();
    var main = document.getElementById('page-content');
    var content = document.createElement('iframe')
    content.src = "./main.html"
    content.id = "page-content"
    main.appendChild(content);
}