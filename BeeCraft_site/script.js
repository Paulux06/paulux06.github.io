var headerOffsetTop = 0;

window.addEventListener("scroll", function(event) {
    var headerSpacer = document.getElementById("header-spacer");
    var header = document.getElementById("header");
    var isFixed = (header.style.position == "fixed");
    if (!isFixed)
        headerOffsetTop = header.offsetTop;
    if (headerOffsetTop < window.pageYOffset && !isFixed)
    {
        document.body.style.paddingTop = header.style.height;
        header.style.position = "fixed";
        headerSpacer.style.display = "block";
    }
    if (headerOffsetTop > window.pageYOffset && isFixed)
    {
        document.body.style.paddingTop = 0;
        header.style.position = "initial";
        headerSpacer.style.display = "none";
    }
})

window.onload = function()
{
    document.getElementById("header-options").style.height = "80px";
    getVoteNmb();
    showHome();
    hidePseudo();
}
    
function toogleMenu()
{
    var options = document.getElementById("header-options");
    if (document.documentElement.clientWidth < 1280)
    {
        var high = options.childNodes.length * 20 + 80;
        if (options.style.height == "80px")
            options.style.height = high.toString()+"px";
        else
            options.style.height = "80px";
    }
}
function closeMenu()
{
    var options = document.getElementById("header-options").style.height = "80px";
}

function copyIP()
{
    var ipAdress = document.getElementById("ip-value")
    var txtar = document.createElement("textarea");
    txtar.value = ipAdress.innerHTML;
    document.body.appendChild(txtar);
    txtar.select();
    document.execCommand("copy");
    document.body.removeChild(txtar);
}