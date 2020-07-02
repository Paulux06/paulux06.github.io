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
    var options = document.getElementById("header-options");
    options.style.height = "80px";

    var toogleOptions = document.getElementById("header-toogle");
    toogleOptions.onclick = function(ev)
    {
        if (document.documentElement.clientWidth < 1280)
        {
            if (options.style.height == "80px")
                options.style.height = "340px";
            else
                options.style.height = "80px";
        }
        //console.log(options.style.height.substring(0, options.style.height.length-2));
    }

    var ipAdress = document.getElementById("ip-value");
    ipAdress.onclick = function(ev)
    {
        var txtar = document.createElement("textarea");
        txtar.value = ipAdress.innerHTML;
        document.body.appendChild(txtar);
        txtar.select();
        document.execCommand("copy");
        document.body.removeChild(txtar);
    }
}