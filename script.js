window.onload = function()
{
    // HTML items
    var content = this.document.getElementById("content");
    var topbar = this.document.getElementById("topbar");
    var main = this.document.getElementById("main");
    var explorer = this.document.getElementById("explorer");
    var page = this.document.getElementById("page");
    var popup = this.document.getElementById("popup");

    topbar.style.backgroundColor = this.DARKGRAY_DARKER;
    explorer.style.backgroundColor = this.DARKGRAY_DARKERER;
    explorer.style.borderColor = this.DARKGRAY_DARKER;
    page.style.backgroundColor = this.DARKGRAY_DARK;

    //topbar content
    var topbarOptions = [
        "Fichiers", "Editer", "Selection", "Vue", "Aller", "Lancer", "Terminal", "Aide"
    ];
    for (let i = 0; i < topbarOptions.length; i++) {
        topbar.appendChild( this.Object.create(this.topbarOption).init(topbarOptions[i], this.DARKGRAY_LIGHT) );
    }
}