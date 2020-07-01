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
    options.onclick = function(ev)
    {
        if (options.style.overflow = "hidden")
        {
            if (options.style.height == "80px")
                options.style.height = "300px";
            else
                options.style.height = "80px";
        }
    }
}