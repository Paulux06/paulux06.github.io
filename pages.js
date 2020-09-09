function clearPage()
{
    var page = document.getElementById("content-container");
    while (page.firstChild)
        page.removeChild(page.firstChild);
}