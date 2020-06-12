var topbarOption = {
    init: function(name="Option", color="#FFF")
    {
        var topbarOption = document.createElement('p');
        topbarOption.innerHTML = name;
        topbarOption.id = "topbarOption";
        topbarOption.style.color = color;
        topbarOption.onmouseover = function () { topbarOption.style.backgroundColor = "rgba(255, 255, 255, 0.1)"; };
        topbarOption.onmouseleave = function () { topbarOption.style.backgroundColor = "rgba(0, 0, 0, 0)"; };
        return topbarOption;
    }
}

var explorerFile = {
    init: function(title, func, color, index, selectionFunc)
    {
        var explorerOp = document.createElement('p');
        explorerOp.innerHTML = title;
        explorerOp.id = "explorerFile";
        explorerOp.style.color = color;
        explorerOp.onmouseover = function () { explorerOp.style.backgroundColor = "rgba(255, 255, 255, 0.2)"; };
        explorerOp.onmouseleave = function () { explorerOp.style.backgroundColor = "rgba(0, 0, 0, 0)"; };
        explorerOp.onmousedown = function () { func(); selectionFunc(index); };
        return explorerOp;
    }
}