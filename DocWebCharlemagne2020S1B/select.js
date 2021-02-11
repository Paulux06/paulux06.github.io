window.onmousemove = event => {
    var deltaX = (event.x*2-window.innerWidth)/window.innerWidth;
    var deltaY = (event.y*2-window.innerHeight)/window.innerHeight;
    var foreground = document.getElementById("select-foreground");
    var background = document.getElementById("select-background");
    foreground.style.transform = "translate("+(deltaX*-40)+"px, "+(deltaY*-40+20)+"px) scale(1.1)";
    background.style.transform = "translate("+deltaX*-20+"px, "+deltaY*-20+"px) scale(1.1)";
};