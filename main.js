// console.log("correct");
// var canvas = document.getElementById("myCanvas");
// var ctx = canvas.getContext("2d");
var row = 18
var col = 18
var rectHeight = 30
var rectWidth = 30
var margin = 10
var sq = []
var lineHeight = 2
var lineWidth = 700
var indent = 10
var tableObject = null
var rows = 18;
var cols = 18;

function changeColor(x, y, color1) {
    var color = color1
}

// function drawAllRects() {
//     for (var y = 0; y < col; y++) {
//         for (var x = 0; x < row; x++) {
//             var xPos = (rectWidth + margin) * x
//             var yPos = (rectHeight + margin) * y

//             ctx.beginPath();
//             ctx.rect(xPos+indent, yPos+indent, rectHeight, rectWidth);
//             ctx.fillStyle = "#FF0000"; //color
//             ctx.fill(); 
//             ctx.closePath();
//         }
//     }

// }

function tableGenerate() {
  for (var i = 0; i < rows; i++) {
    // 3: Create a new row
    var row = document.createElement("tr");
    // 4: Append that row to the table
    table.appendChild(row);
  
    // 5: Now loop through either rows or cols to add the cells
    for (var j = 0; j < cols; j++) {
      // Create a cell element, that's a <td>, and append it to the row
      var cell = document.createElement("td");
  
      // 6: Append to the row
      row.appendChild(cell);
  
      // Give the cell some text

      x = i*15
      y = j*15

      cell.innerText = ;
    }
  }
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



function createSq() {
    for (var i = 0; i < row; i++) { // create sq
        a = []
        for (var j = 0; j < col; j++) {
            paste = i*j
            a.push(paste)
        }
        sq.push(a)
    }
}


var table = document.getElementById("newTable");
tableGenerate()

// createSq()
// // drawAllRects()   
// lines()





