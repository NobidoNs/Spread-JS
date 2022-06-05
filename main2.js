class Table {
    constructor (tableSelector, rowsSelector, columnsSelector) {
      this.rows = rowsSelector+1
      this.cols = columnsSelector+1
      this._a = 1
      this.all = []
      this.f = false
      this.rowsSelector = rowsSelector
      this.columnsSelector = columnsSelector
      this.counter = 0
      // this.tableObj = document.querySelector(tableSelector)
      this.tableObj = $(`#${tableSelector}`)
  
      // this.allRects = document.querySelectorAll()
      console.log(this.tableObj)
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
  
    getCols() {
      return this.cols
    }
  
    getRows() {
      return this.rows
    }
  
    // set a(w) {
    //   this._a = w
    // }
  
    init(tbl) {
      this._a = tbl.a
      this.cols = tbl.getCols()
      this.rows = tbl.getRows()
      this.all = [...tbl.all]
    }
  
    generate = () => {
      let tableHTML = ''
      // const rowsNumber = parseInt(document.querySelector(this.rowsSelector).value) + 1
      // const columnsNumber = parseInt(document.querySelector(this.columnsSelector).value) + 1
  
  
      for (let i = 0; i <= this.rowsSelector; i++) {
        let tr = '<tr>'
        let td = ''
        for (let j = 0; j <= this.columnsSelector; j++) { 
          const cell = (j % 3)+(i % 3)*3
          // const y = i % 3 + 1
          // const x = j % 3 + 1
          // const cell2 = `${x},${y}`
  
          if (cell == 4) {
            td = `<td style="background-color: yellow; onclick="tap(${j},${i})""></td>`;
          } else if (i == 0 || j == 0 || i == this.rowsSelector || j == this.columnsSelector || cell % 2 == 0) {
            td = `<td style="background-color: black;" onclick="tap(${j},${i})"></td>`;
          } else {
            td = `<td onclick="tap(${j},${i})"></td>`;
          }
  
          // if i != 1
  
          tr += td
        }
      
        tr += '</tr>'
        tableHTML += tr
      }
      this.all = this.prepare()
      this.tableObj.html(tableHTML)
    }
  
    createFromAll = () => {
      let tableHTML = ''
  
  
      for (let i = 0; i <= this.rowsSelector; i++) {
        let tr = '<tr>'
        let td = ''
        for (let j = 0; j <= this.columnsSelector; j++) { 
          const cell = i * this.cols + j
          const color = this.all[cell]
          if (color == "yellow" || color == "black") {
            td = `<td style='background-color: ${color}; onclick="tap(${j},${i})"'></td>`;
          } else {
            td = `<td onclick="tap(${j},${i})"></td>`;
          }
  
          tr += td
        }
      
        tr += '</tr>'
        tableHTML += tr
      }
      this.tableObj.html(tableHTML)
    }
  
    whatIsColor = (x,y) => {
      let n = y * this.cols + x
      let color = this.all[n]
      return color
    }
  
    chColor = (x, y, color, table) => {
      let n = y * this.cols + x
      let el = first[n]; // todo: global letiable
      $(el).css('background-color', color);
      table1.all[n] = color
    }
  
    tapOnTable = async(x, y) => {
      let x_med_sq = Math.floor(x / 3)
      let y_med_sq = Math.floor(y / 3)
      let re = haveColor(this, x_med_sq, y_med_sq)
      let color = re[1]
      let fl = re[0]
      let n = y * this.cols + x
      const table2 = this.clone()
      if ((this.all[n] == "white" && fl == false) || (fl == true && color == plColor && this.all[n] == "white")) {
        // this.chColor(x, y, plColor, table2)
        table2.all[n] = plColor
        this.f = true
  
        for (let y = 0; y <= 20; y++) {
          const fl2 = await check2(table2)
          if (fl2 == true) {
            this.draw(table2)
            await pause(1000)
          }
          else {
            break
          }
        }
  
        if (this.counter >= plColors.length) {
          const isEnd = gameEndCheck(table2)
          if (isEnd == true) {
            PopUpWinShow(COW, table2)
            // table1.fullRestart(COW, table2)
            return 
          }
        }
        this.draw(table2)
        this.init(table2)
        this.chPlayer()
        this.counter += 1
      }
    }
  
    colorJamp = (x_med_sq, y_med_sq, table) => {
      recoloring(this, x_med_sq, y_med_sq)
      for (let y = 0; y <= 2; y++) {
        for (let x = 0; x <= 2; x++) {
          let x1 = x_med_sq*3 + x
          let y1 = y_med_sq*3 + y
          let n = y1 * this.cols + x1
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
      for (let n = 0; n < table.all.length - 1; n++) {
        let y = Math.floor(n / this.cols)
        let x = n - y*this.cols
        let cl = table.all[n]
        this.all[n] = cl
        this.chColor(x, y, cl, table)
      }
    }
    prepare = () => {
      const all = []
      for (let i = 0; i <= this.rowsSelector; i++) {
        for (let j = 0; j <= this.columnsSelector; j++) {
          const cell = (j % 3)+(i % 3)*3
  
          if (cell == 4) {
            all.push("yellow")
          } else if (i == 0 || j == 0 || i == this.rowsSelector || j == this.columnsSelector || cell % 2 == 0) {
            all.push("black")
          } else {
            all.push("white")
          }
        }
      }
      return all 
    }
  
  
  
    fullRestart = async(table) => {
      this.all = [...standartAll]
      table.all = [...standartAll]
      this.counter = 0
      this.createFromAll()
      // table.draw(table)
      first = $("td")
      redScore = 0
      blueScore = 0
      greenScore = 0
      violetScore = 0
      showAllScores()
      PopUpPlayersShow()
    }
    // Class End
  }
  
  class DemoMap {
    constructor (tableSelector, rowsSelector, columnsSelector) {
      this.rows = parseInt(rowsSelector)+1
      this.cols = parseInt(columnsSelector)+1
      this.rowsSelector = rowsSelector
      this.columnsSelector = columnsSelector
      this.all = []
      this.tableObj = $(`#${tableSelector}`)
    }
    mapGenerate = () => {
      let tableHTML = ''
  
      for (let i = 0; i <= this.rowsSelector; i++) {
        let tr = '<tr>'
        let td = ''
        for (let j = 0; j <= this.columnsSelector; j++) { 
          const cell = (j % 3)+(i % 3)*3
  
          if (cell == 4) {
            td = `<td style="background-color: yellow;" onclick="tap(${j},${i})"></td>`;
          } else if (i == 0 || j == 0 || i == this.rowsSelector || j == this.columnsSelector || cell % 2 == 0) {
            td = `<td style="background-color: black;" onclick="tap(${j},${i})"></td>`;
          } else {
            td = `<td onclick="tap(${j},${i})"></td>`;
          }
  
          tr += td
        }
      
        tr += '</tr>'
        tableHTML += tr
      }
      this.all = this.prepare()
      this.tableObj.html(tableHTML)
    }
  
    tapOnDemoTable = async(x, y) => {
      let x_med_sq = Math.floor(x / 3)
      let y_med_sq = Math.floor(y / 3)
      this.fillBlack(x_med_sq, y_med_sq)
    }
  
    fillBlack = (x1, y1) => {
      for (let y = 0; y <= 4; y++) {
        for (let x = 0; x <= 4; x++) {
          let x_pos = (x1*3-1) + x
          let y_pos = (y1*3-1) + y
          this.chColor(x_pos, y_pos, "black")
        }
      }
    }
  
    getAll = () => {
      let r = this.all
      return r
    }
  
    chColor = (x, y, color) => {
      let n = y * this.cols + x
      let el = first[n]; // todo: global letiable
      $(el).css('background-color', color);
      this.all[n] = color
    }
  
    prepare = () => {
      const all = []
      for (let i = 0; i <= this.rowsSelector; i++) {
        for (let j = 0; j <= this.columnsSelector; j++) {
          const cell = (j % 3)+(i % 3)*3
  
          if (cell == 4) {
            all.push("yellow")
          } else if (i == 0 || j == 0 || i == this.rowsSelector || j == this.columnsSelector || cell % 2 == 0) {
            all.push("black")
          } else {
            all.push("white")
          }
        }
      }
      return all 
    }
  
    cosmetyc = () => {
      for (let x = 0; x <= this.rows; x++) {
        for (let y = 0; y <= this.cols; y++) {
          let cl = this.whatIsColor(x, y)
          if (cl == "yellow") {
            const pos = [x, y-1, x, y+1, x-1, y, x+1, y]
            let colors = []
            let rec = 0
            let br = false
            let bl = 0
            for (let p = 0; p <= pos.length / 2 - 1; p++) {
              colors.push(this.whatIsColor(pos[p], pos[p+1]))
            }
            for (let p = 0; p <= pos.length - 1; p++) {
              if (colors[p] == "black") {
                bl += 1
              }
              if (bl == 4) {
                br = true
              }
            }
            if (br == true) {
              this.chColor(x, y, "black")
            }
          }
        }
      }
    }
  
    whatIsColor = (x,y) => {
      let n = y * this.cols + x
      let color = this.all[n]
      return color
    }
  }
  
  let table1 = null
  let plColors = []
  let plColor = "red"
  let rowses = null
  let colses = null
  
  let first = [];
  let one = true
  let onReady = false
  let redScore = 0
  let blueScore = 0
  let greenScore = 0
  let violetScore = 0
  let demo = false
  let standartAll = null
  
  async function tap(row,col) {
    const x = row;
    const y = col;
    if (onReady) return
    console.log('taped', x, y)
    onReady = true
    if (demo == true) {
      demoTable.tapOnDemoTable(x, y)
      onReady = false
    } else {
      await table1.tapOnTable(x, y)
      onReady = false
    }
  }
  
  function haveColor(table, x_med_sq, y_med_sq) {  // +
    for (let y = 0; y <= 2; y++) {
      for (let x = 0; x <= 2; x++) {
        let x_pos = x_med_sq*3 + x
        let y_pos = y_med_sq*3 + y
        for (let p = 0; p <= plColors.length - 1; p++) {
          let a = table.whatIsColor(x_pos, y_pos)
          if (a == plColors[p]) {
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
    let black = 0
    for (let y = 0; y <= 2; y++) {
      for (let x = 0; x <= 2; x++) {
        // x_pos = 3 * x_sq - x - 1
        // y_pos = 3 * y_sq - y - 1
        x_pos = (x_sq-1) * 3 + x
        y_pos = (y_sq-1) * 3 + y
        if (table.whatIsColor(x_pos,y_pos) == "white") {
          ret = false
        }
        if (table.whatIsColor(x_pos,y_pos) == "black") {
          black += 1
        }
        if (black == 9) {
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
      let n = y1 * table.cols + x1
  
  
      if (z == "white") {
        table.all[n] = plColor
        recoloring(table, two_x_medium_sq, two_y_medium_sq)
      } else {
        for (let p = 0; p <= plColors.length - 1; p++) {
          if (z == plColors[p]) {
            table.colorJamp(two_x_medium_sq, two_y_medium_sq, plColor, table)
          }
        }
      }
      loops += 1
    }
    showAllScores()
    one = false
  }
  
  // +
  // check and coll boom if need
  async function check2(table) {
    let zn_x = []
    let zn_y = []
    let ret = false
    let ret2 = false
    let yRange = table.getCols() / 3 - 1
    let xRange = table.getRows() / 3 - 1
    for (let y = 0; y <= yRange; y++) {
      for (let x = 0; x <= xRange; x++) {
        ret = onlyColorfull(table, x, y)
        if (ret == true) {
          zn_x.push(x)
          zn_y.push(y)
          ret2 = true
        }
      }
    }
  
    if (ret2 == true) {
      l = zn_x.length
      for (let a = 0; a <= l - 1; a++) { 
        BOOM(table, zn_x[a], zn_y[a])
      }
      return new Promise((resolve) => resolve(true))
    }
    // if (ret2 == false) {
    //   return new Promise((resolve) => resolve(false))
    // }
  return new Promise((resolve) => resolve(false))
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
    let RLoose = false
    let BLoose = false
    let GLoose = false
    let VLoose = false
    let looses = 0
    let sp = []
    const players = plColors.length
    const rowses = table1.getRows()
    const colses = table1.getCols()
    const normalColors = ["red", "blue", "green", "violet"]
    let rest = false
    let flags = [RLoose, BLoose, GLoose, VLoose]
    let f = []
    for (let i = 0; i <= plColors.length - 1; i++) {
      for (let y = 0; y <= normalColors.length - 1; y++) {
        if (plColors[i] == normalColors[y]) {
          flags[y] = true
        }
      }
    }
    for (let i = 0; i <= 4; i++) {
      if (flags[i] == false) {
        f.push(i)
      }
    }
    for (let i = 0; i <= f.length; i++) {
      if (f.length == 0) break
      flags.splice(f[f.length-1], 1)
      f.pop()
    }
    // if (plColors.length < 3) {
    //   GLoose = false
    // }
    // if (plColors.length < 4) {
    //   VLoose = false
    // }
    for (let x = 0; x < rowses; x++) {
      for (let y = 0; y < colses; y++) {
        for (let p = 0; p <= plColors.length - 1; p++) {
          const cl = table.whatIsColor(x, y)
          if (cl == plColors[p]) {
            flags[p] = false
          }
        }
      }
    }
  
    for (let i = 0; i <= 4; i++) {
      if (flags[i] == true) {
        looses += 1
        sp.push(i)
      } 
      if (players-1 == looses) {
        console.log(plColor,"win")
        COW = plColor  // Color Of Win
        rest = true
      }
    }
  
    for (let i = 0; i <= sp.length; i++) {
      if (sp.length == 0) break
      plColors.splice(sp[sp.length-1], 1)
      sp.pop()
    }
    return rest
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
            n = y1 * table.cols + x1
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
            n = y1 * table.cols + x1
            table.all[n] = plColor
  
            if (plColor != plColors[p]) {
              scoresColor[p] += 1
              blueScore = scoresColor[0]
              redScore = scoresColor[1]
              greenScore = scoresColor[2]
              violetScore = scoresColor[3]
            }
          }
        }
      }
    }
  }
  
  // $().ready(function () {
  //   $("#popuppl").hide();
  //   $("#popupst").hide();
  // })
  
  function done() {
    doneHiden()
    demoTable.cosmetyc()
    const r = parseInt(getRow())
    const c = parseInt(getCols())
    demo = false
    table1 = new Table('myTable', r, c)
    table1.all = [...demoTable.all]
    standartAll = [...demoTable.all]
    table1.createFromAll()
    const tableObj = $(`#myDemoTable`)
    tableObj.html("<div hidden></div>")
    first = $("td")
  }
  
  
  function threeXthree() {
    PopUpMapHide();
    table1 = new Table('myTable', 8, 8)
    table1.generate()
    first = $("td");
    PopUpPlayersShow()
    standartAll = [...table1.all]
  }
  
  function sixXsix() {
    PopUpMapHide();
    table1 = new Table('myTable', 17, 17)
    table1.generate()
    first = $("td");
    PopUpPlayersShow()
    standartAll = [...table1.all]
  }
  
  function StartCreate(r, c) {
    demoTable = new DemoMap('myDemoTable', r, c)
    demoTable.mapGenerate()
    demo = true
    first = $("td")
  }
  
  function CreateMap() {
    PopUpMapHide();
    $("#popupge").show()
    $("#inp").show()
  }
  
  function PopUpMapHide() {
    $("#popupmp").hide();
  }
  
  function generate() {
    const c = getCols()
    const r = getRow()
    if (r <= 0 || c <= 0 || (r == 1 || c < 3)) return null
    $("#popupdo").show();
    $("#popupge").hide()
    $("#inp").hide()
    StartCreate(r, c)
  }
  
  function doneHiden() {
    $("#popupdo").hide();
    PopUpPlayersShow()
  }
  
  function twoPlayers() {
    players(1)
  }
  function threePlayers() {
    players(2)
  }
  function fourPlayers() {
    players(3)
  }
  function players(inp) {
    showAllScores()
    PopUpPlayersHide()
    const plCl = ["red", "blue", "green", "violet"]
    plColors = []
    for (let i = 0; i <= inp; i++) {
      plColors.push(plCl[i])
      console.log(plColors)
    }
  }
  
  function getRow() {
    let r = (document.getElementById('row').value) * 3 - 1
    return r
  }
  
  function getCols() {
    return (document.getElementById('col').value) * 3 - 1
  }
  
  // All Shows and Hides
  
  function PopUpWinShow(inp){
    out = inp + " Win"
    popUpStartShow()
    $("#whoIsWin").html(out)
  }
  
  function showAllScores() {
    const plScores = [blueScore, redScore, greenScore, violetScore]
    const plNames = ["blueScore", "redScore", "greenScore", "violetScore"]
    $("#popupsc").show()
    for (let i = 0; i <= 4; i++) {
      const out = plNames[i] + " " + plScores[i]
      $(`#${plNames[i]}`).html(out)
    }
  }
  
  function PopUpStart(){
    popUpStartHide()
    if (demo == false) {
      table1.fullRestart(table1)
    }
    $("#popupsc").show();
  }
  
  function PopUpPlayersShow(){
    $("#popuppl").show();
  }
  
  function PopUpPlayersHide(){
    $("#popuppl").hide();
  }
  
  function popUpStartHide() {
    $("#popupst").hide()
  }
  
  function popUpStartShow() {
    $("#popupst").show()
  }