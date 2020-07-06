window.onload = function()
{
    // HTML items
    var topbar = this.document.getElementById("topbar");
    var explorer = this.document.getElementById("explorer");
    var page = this.document.getElementById("page");
    var pageContent = this.document.getElementById("page-content");

    topbar.style.backgroundColor = this.DARKGRAY_DARKER;
    explorer.style.backgroundColor = this.DARKGRAY_DARKERER;
    explorer.style.borderColor = this.DARKGRAY_DARK;
    page.style.backgroundColor = this.DARKGRAY_DARKER;
    pageContent.style.backgroundColor = this.DARKGRAY_DARKER;

    //topbar content
    var topbarOptions = [
        "Fichiers", "Editer", "Selection", "Vue", "Aller", "Terminal", "Aide"
    ];
    for (let i = 0; i < topbarOptions.length; i++) {
        topbar.appendChild(
            this.Object.create(this.topbarOption).init(topbarOptions[i], this.DARKGRAY_NORMAL)
        );
    }

    //explorer content
    for (let i = 0; i < explorerOptions.length; i++) {
        const current = explorerOptions[i];
        explorer.appendChild(
            this.Object.create(this.explorerFile).init(
                current.title, current.func, this.DARKGRAY_LIGHT, i, selectEOption, current.level
            )
        );
    }

    display('./main/main.html');
}