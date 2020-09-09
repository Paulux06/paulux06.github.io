
var canvas = document.createElement("canvas");
var screen = canvas.getContext("2d");
var dims = {x: window.innerWidth, y: window.innerHeight};
var scale = 20;
var speed = -8;
var i = 0;

window.onload = () => {
    canvas = document.getElementById("game-view");
    screen = canvas.getContext("2d");
    canvas.width = dims.x; canvas.height = dims.y;
    gameloop();
}

function gameloop()
{
    var size1 = Math.abs(Math.cos(i/100) * scale);
    var size2 = Math.abs(Math.cos(i/100+(Math.PI * 0.2)) * scale);
    var size3 = Math.abs(Math.cos(i/100+(Math.PI * 0.4)) * scale);
    var size4 = Math.abs(Math.cos(i/100+(Math.PI * 0.6)) * scale);
    var size5 = Math.abs(Math.cos(i/100+(Math.PI * 0.8)) * scale);
    i += speed;
    //clear canvas
    screen.fillStyle = "#2C7073";
    screen.fillRect(0, 0, dims.x, dims.y);

    // draw squares
    screen.fillStyle = "#3D7C77";
    screen.fillRect(Math.round(dims.x/2)-size2*2-size3-size1*2, Math.round(dims.y/2)-size1, size1*2, size1*2);
    screen.fillStyle = "#4C8579";
    screen.fillRect(Math.round(dims.x/2)-size2*2-size3, Math.round(dims.y/2)-size2, size2*2, size2*2);
    screen.fillStyle = "#62977D";
    screen.fillRect(Math.round(dims.x/2)-size3, Math.round(dims.y/2)-size3, size3*2, size3*2);
    screen.fillStyle = "#93AC83";
    screen.fillRect(Math.round(dims.x/2)+size3, Math.round(dims.y/2)-size4, size4*2, size4*2);
    screen.fillStyle = "#B0B783";
    screen.fillRect(Math.round(dims.x/2)+size3+size4*2, Math.round(dims.y/2)-size5, size5*2, size5*2);

    setTimeout(gameloop, 1000/50);
}