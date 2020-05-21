window.onload = function() {
    this.header(0)
    document.getElementById('content').style.backgroundColor = this.LIGHTGRAY_LIGHT;
    for (let i = 0; i < 10; i++) {
        var p = document.createElement('p')
        p.innerHTML = i.toString()
        document.getElementById('content').appendChild(p)
    }
    this.showContent();
}