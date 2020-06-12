var topbarOption = {
    init: function(name="Option", color="#FFF")
    {
        var topbarOption = document.createElement('p');
        topbarOption.innerHTML = name;
        topbarOption.id = "topbarOption";
        topbarOption.style.color = color;
        return topbarOption;
    }
}

var explorerFile = {
    init: function(title, func, color, index, selectionFunc, level)
    {
        var explorerOp = document.createElement('p');
        explorerOp.innerHTML = title;
        explorerOp.id = "explorerFile";
        explorerOp.style.color = color;
        explorerOp.onmousedown = function () { func(); selectionFunc(index); };
        return explorerOp;
    }
}