console.log("correct");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var row = 18
var col = 18
var rectHeight = 30
var rectWidth = 30
var margin = 10
var sq = []
var lineHeight = 2
var lineWidth = 700
var indent = 10

function changeColor(x, y, color1) {
    var color = color1
}

function drawAllRects() {
    for (var y = 0; y < col; y++) {
        for (var x = 0; x < row; x++) {
            var xPos = (rectWidth + margin) * x
            var yPos = (rectHeight + margin) * y

            ctx.beginPath();
            ctx.rect(xPos+indent, yPos+indent, rectHeight, rectWidth);
            ctx.fillStyle = "#FF0000"; //color
            ctx.fill(); 
            ctx.closePath();
        }
    }

}


for (var i = 0; i < row; i++) { // create sq
    a = []
    for (var j = 0; j < col; j++) {
        paste = i*j
        a.push(paste)
    }
    sq.push(a)
}

function lines() {
    for (var yLains = 0; yLains < (col/3) + 1; yLains++) {
        for (var xLains = 0; xLains < (row/3) + 1; xLains++) {
            xPos = ((margin + rectWidth) * xLains * 3) + indent/2
            yPos = ((margin + rectHeight) * yLains * 3) + indent/2
            ctx.beginPath();
            ctx.rect(xPos, yPos, lineHeight, lineWidth);
            ctx.rect(xPos, yPos,lineWidth ,lineHeight);
            ctx.fillStyle = "#00ff00"; //color
            ctx.fill(); 
            ctx.closePath();

        }
    }
}

drawAllRects()
lines()

