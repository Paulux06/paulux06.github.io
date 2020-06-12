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