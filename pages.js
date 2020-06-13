var explorerOptions = [
    { title: 'Index.html', func: function(){display("./main/main.html");}, level: 0},
    { title: 'TI.html', func: function(){display("./TI/index.html");}, level: 1},
    { title: 'Apps.html', func: function(){display("./TI/apps/index.html");}, level: 2},
    { title: 'Files.html', func: function(){display("./TI/files/index.html");}, level: 2},
    { title: 'Projets.html', func: function(){display("./projects/index.html");}, level: 1},
    { title: 'Processors.html', func: function(){display("./projects/processors/index.html");}, level: 2}
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

function display(path)
{
    clear();
    var main = document.getElementById('page-content');
    var content = document.createElement('iframe');
    content.src = path;
    content.id = "page-content";
    main.appendChild(content);
}