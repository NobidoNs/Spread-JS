class Table {
  constructor (tableSelector, rowsSelector, columnsSelector) {
    this.rows = 17
    this.cols = 17
    this._a = 1
    this.all = []
    this.f = false
    this.rowsSelector = rowsSelector
    this.columnsSelector = columnsSelector
    // this.tableObj = document.querySelector(tableSelector)
    this.tableObj = $(`#${tableSelector}`)

    // this.allRects = document.querySelectorAll()
    console.log(this.tableObj)
    // console.log(this.allRects)
  }

  clone() {
    const tbl = new this.constructor()
    // this.copy(tbl)
    tbl.init(this)
    return tbl
  }

  // copy(tbl) {
  //   tbl.a = 5
  //   tbl.rows = this.rows
  //   // tbl.cols = this.cols
  // }

  // get cols() {
  //   return this.cols
  // }

  get a() {
    return this._a
  }

  // set a(w) {
  //   this._a = w
  // }

  init(tbl) {
    this._a = tbl.a
    this.all = [...tbl.all]
  }

  generate = () => {
    let tableHTML = ''
    // const rowsNumber = parseInt(document.querySelector(this.rowsSelector).value) + 1
    // const columnsNumber = parseInt(document.querySelector(this.columnsSelector).value) + 1

    const rows = this.rows
    const cols = this.cols

    for (let i = 0; i <= rows; i++) {
      let tr = '<tr>'
      let td = ''
      for (let j = 0; j <= cols; j++) {
        const cell = (j % 3)+(i % 3)*3
        // const y = i % 3 + 1
        // const x = j % 3 + 1
        // const cell2 = `${x},${y}`

        if (cell == 4) {
          this.all.push("yellow")
          td = `<td style="background-color: yellow;"></td>`;
        } else if (i == 0 || j == 0 || i == rows || j == cols || cell % 2 == 0) {
          this.all.push("black")
          td = `<td style="background-color: black;"></td>`;
        } else {
          this.all.push("white")
          td = `<td onclick="tap(${j},${i})"></td>`;
        }

        // if i != 1

        tr += td
      }

      tr += '</tr>'
      tableHTML += tr
    }
    this.tableObj.html(tableHTML)
  }


  whatIsColor = (x,y) => {
    let n = y * (this.cols+1) + x
    let color = this.all[n]
    // console.log(this.all[n])
    return color
  }

  chColor = (x, y, color, table) => {
    let n = y * (this.cols+1) + x
    if (n <= 324) {
      let el = first[n]; // todo: global letiable
      $(el).css('background-color', color);
      table1.all[n] = color
    }
  }

  tapOnTable = async(x, y) => {
    let x_med_sq = Math.floor(x / 3)
    let y_med_sq = Math.floor(y / 3)
    let re = haveColor(this, x_med_sq, y_med_sq)
    let color = re[1]
    let fl = re[0]
    const table2 = this.clone()
    if ((this.all[y * 18 + x] == "white" && fl == false) || (fl == true && color == plColor && this.all[y * 18 + x] == "white")) {
      let n = y * (this.cols + 1) + x
      // this.chColor(x, y, plColor, table2)
      table2.all[n] = plColor
      this.f = true
      // console.log("6")
      for (let y = 0; y <= 20; y++) {
        const fl = await check2(table2)
        if (fl == false) {
          this.draw(table2)
          await pause(1000)
        }
        else {
          break
        }
      }
      this.draw(table2)
      this.init(table2)
      // console.log("5")
      this.chPlayer()
    }
  }

  colorJamp = (x_med_sq, y_med_sq, table) => {
    recoloring(this, x_med_sq, y_med_sq)
    for (let y = 0; y <= 2; y++) {
      for (let x = 0; x <= 2; x++) {
        let x1 = x_med_sq*3 + x
        let y1 = y_med_sq*3 + y
        let n = y1 * (this.cols + 1) + x1
        if (this.all[n] == "white") {
          this.all[n] = plColor
          // this.chColor(x1, y1, plColor)
          return null
        }
      }
    }
  }
  chPlayer = () => {
    if (this.f == true) {
      for (let i = 0; i <= plColors.length - 1; i++) {
        if (plColor == plColors[i]) {
          if (i == plColors.length - 1) {
            plColor = plColors[0]
          } else {
            plColor = plColors[i+1]
            return plColor
          }
        }
      }
    }
  }
  draw = (table) => {
    // console.log(this.all.length)
    for (let n = 0; n < table.all.length - 1; n++) {
      let y = Math.floor(n / (table.cols + 1))
      let x = n - y*(table.cols + 1)
      let cl = table.all[n]
      this.all[n] = cl
      this.chColor(x, y, cl, table)
      // console.log("x =", x, "y =", y)
    }
  }
  fullRestart = async(colorOfWin, table) => {
    one = true
    await pause(3000)
    for (let x = 0; x <= 17; x++) {
      for (let y = 0; y <= 17; y++) {
        for (let p = 0; p <= plColors.length - 1; p++) {
          if (table.whatIsColor(x, y) == plColors[p]) {
            n = y * (table.cols + 1) + x
            table.all[n] = "white"
            table.draw(table)
          }
        }
      }
    }
    
    PopUpShow(colorOfWin)
  }
}

const table1 = new Table('myTable') //'.table', '.rows', '.columns'
let plColors = []
let plColor = "red"
table1.generate()

let first = $("td");
let one = true
let onReady = false
let redScore = 0
let blueScore = 0
let greenScore = 0
let violetScore = 0

async function tap(row,col) {
  const x = row;
  const y = col;
  if (onReady) return
  console.log('taped', x, y)
  onReady = true
  await table1.tapOnTable(x, y)
  onReady = false
}

function haveColor(table, x_med_sq, y_med_sq) {  // +
  for (let y = 0; y <= 2; y++) {
    for (let x = 0; x <= 2; x++) {
      let x_pos = x_med_sq*3 + x
      let y_pos = y_med_sq*3 + y
      for (let p = 0; p <= plColors.length - 1; p++) {
        if (table.whatIsColor(x_pos, y_pos) == plColors[p]) {
          let color = table.whatIsColor(x_pos, y_pos)
          return [true, color]
        }
      }
    }
  }
  return [false, null]
}



function onlyColorfull(table, x_medium_sq, y_medium_sq) {  // +
  let ret = true
  const x_sq = x_medium_sq + 1
  const y_sq = y_medium_sq + 1
  for (let y = 0; y <= 2; y++) {
    for (let x = 0; x <= 2; x++) {
      // x_pos = 3 * x_sq - x - 1
      // y_pos = 3 * y_sq - y - 1
      x_pos = (x_sq-1) * 3 + x
      y_pos = (y_sq-1) * 3 + y
      if (table.whatIsColor(x_pos,y_pos) == "white") {
        ret = false
      }
    }
  }
  return ret
}

function BOOM(table, x_med_sq, y_med_sq) {
  let x_centr = x_med_sq * 3 + 1
  let y_centr = y_med_sq * 3 + 1
  let x_to_activated = [2, -2, 0, 0]
  let y_to_activated = [0, 0, 2, -2]
  clear_medium_sq(table, x_med_sq, y_med_sq)
  let loops = 0
  for (let i = 0; i <= 3; i++) {
    let x1 = x_centr - x_to_activated[loops]
    let y1 = y_centr - y_to_activated[loops]

    let two_x_medium_sq = Math.floor(x1 / 3)
    let two_y_medium_sq = Math.floor(y1 / 3)
    let z = table.whatIsColor(x1, y1) 
    let n = y1 * (table.cols + 1) + x1


    if (z == "white") {
      table.all[n] = plColor
      recoloring(table, two_x_medium_sq, two_y_medium_sq)
    } else {
      for (let p = 0; p <= plColor.length - 1; p++) {
        if (z == plColors[p]) {
          table.colorJamp(two_x_medium_sq, two_y_medium_sq, plColor, table)
        }
      }
    }
    loops += 1
  }
  setBlueScore()
  setRedScore()
  gameEndCheck(table)
  one = false
}

// +
async function check2(table) {
  let ret3 = true
  let zn_x = []
  let zn_y = []
  let ret = false
  let ret2 = false
  for (let y = 0; y <= 5; y++) {
    for (let x = 0; x <= 5; x++) {
      ret = onlyColorfull(table, x, y)
      if (ret == true) {
        zn_x.push(x)
        zn_y.push(y)
        ret2 = true
        console.log(zn_x)
      }
    }
  }

  if (ret2 == true) {
    l = zn_x.length
    for (let a = 0; a <= l - 1; a++) { 
      // BOOM(zn_x[a], zn_y[a])
      // console.log("1")
      BOOM(table, zn_x[a], zn_y[a])
      // console.log("2")
      // console.log(zn_x[a], zn_y[a])
    }
    return new Promise((resolve) => resolve(false))
  }
  // if (ret2 == false) {
  //   return new Promise((resolve) => resolve(false))
  // }
return new Promise((resolve) => resolve(true))
}

// +
pause = async(time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

// +
function gameEndCheck(table) {
  let RLoose = true
  let BLoose = true
  let GLoose = true
  let VLoose = true
  let rest = false
  let flags = [RLoose, BLoose, GLoose, VLoose]
  for (let x = 0; x <= 17; x++) {
    for (let y = 0; y <= 17; y++) {
      for (let p = 0; p <= plColors.length - 1; p++) {
        if (table.whatIsColor(x, y) == plColors[p]) {
          flags[p] = false
        }
      }
    }
  }
  if (flags[0] == true) {
    console.log("Blue win")
    COW = "blue"  // Color Of Win
    rest = true
  } 
  if (flags[1] == true) {
    console.log("Red win")
    rest = true
    COW = "red"
  }
  if (rest == true) {
    rest = false
    // otv = restButton()
    // if (otv == true) {
    //   fullRestart()
    table.fullRestart(COW, table)
  }
}


// function restButton()

function clear_medium_sq(table, x_med_sq, y_med_sq) {
  for (let y = 0; y <= 2; y++) {
    for (let x = 0; x <= 2; x++) {
      let x1 = (x_med_sq * 3) + x
      let y1 = (y_med_sq * 3) + y
      let z = table.whatIsColor(x1, y1)
      for (let p = 0; p <= plColors.length - 1; p++) {
        if (z == plColors[p]) {
          n = y1 * (table.cols + 1) + x1
          table.all[n] = "white"
          // table.chColor(x1, y1, "white")
        }
      }
    }
  }
}


function recoloring(table, x_med_sq, y_med_sq) {
  let scoresColor = [blueScore, redScore, greenScore, violetScore]
  for (let y = 0; y <= 2; y++) {
    for (let x = 0; x <= 2; x++) {
      x1 = (x_med_sq*3) + x
      y1 = (y_med_sq*3) + y
      a = table.whatIsColor(x1, y1)
      for (let p = 0; p <= plColors.length - 1; p++) {
        if (a == plColors[p]) {
          n = y1 * (table.cols + 1) + x1
          table.all[n] = plColor

          if (plColor == plColors[p] && a == plColors[p]) {
            scoresColor[p] += 1
          }
        }
      }
    }
  }
}

function twoPlayers() {
  PopUpButtonHide()
  plColors = ["red", "blue"]
}

function threePlayers() {
  PopUpButtonHide()
  plColors = ["red", "blue", "green"]
}

function fourPlayers() {
  PopUpButtonHide()
  plColors = ["red", "blue", "green", "violet"]
}

function PopUpButtonHide(){
  $("#popuppl").hide();
  blueScore = 0
  redScore = 0
}

function PopUpHide(){
  $("#popupst").hide();
  blueScore = 0
  redScore = 0
}

function PopUpShow(inp){
  out = inp + " Win"
  $("#popupst").show();
  $("#whoIsWin").html(out)
}

function PopUpPlayersShow(){
  $("#popuppl").show();
}

function setBlueScore() {
  $("#blueScore").html(blueScore)
}

function setRedScore() {
  $("#redScore").html(redScore)
}