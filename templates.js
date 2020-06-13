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
        level++;
        explorerOp.style.paddingLeft = level.toString()+"vw";
        level--;
        level = 15.5 - level;
        explorerOp.style.width = level.toString()+"vw";
        explorerOp.onmousedown = function () { func(); selectionFunc(index); };
        return explorerOp;
    }
}