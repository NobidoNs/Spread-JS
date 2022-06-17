import $ from "jquery"
import * as consts from "./const"
import * as graph from "./graph"
import * as utils from "./utils"
import {global} from "./Global"

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


    this.tableObj = $(`#${tableSelector}`)

    console.log(this.tableObj)
  }

  clone() {
    const tbl = new this.constructor()
    tbl.init(this)
    return tbl
  }

  get a() {
    return this._a
  }

  getCols() {
    return this.cols
  }

  getRows() {
    return this.rows
  }

  init(tbl) {
    this._a = tbl.a
    this.cols = tbl.getCols()
    this.rows = tbl.getRows()
    this.all = [...tbl.all]
  }

  generate = () => {
    let tableHTML = ''

    for (let i = 0; i <= this.rowsSelector; i++) {
      let tr = '<tr>'
      let td = ''
      for (let j = 0; j <= this.columnsSelector; j++) { 
        const cell = (j % 3)+(i % 3)*3

        if (cell == 4) {
          td = `<td style="background-color: yellow; onclick="tap(${j},${i})""></td>`;
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

  tapOnTable = async(x, y) => {
    let n = y * this.cols + x
    const table2 = this.clone()
    if (utils.tapCheck(this, x, y)) {
      table2.all[n] = global.plColor
      this.f = true
      await utils.checker(this, table2)

      if (this.counter >= 1) {
        let {blueScore, redScore, greenScore, violetScore} = consts.scores
        let isEnd = false
        console.log(redScore)
        if (blueScore+redScore+greenScore+violetScore != 0) {
          isEnd = utils.gameEndCheck(table2)
        }
        if (isEnd != false) {
          graph.PopUpWinShow(isEnd[1], table2)
          return 
        }
      }
      graph.draw(this, table2)
      this.init(table2)
      this.chPlayer()
      this.counter += 1
    }
  }

  colorJamp = (x_med_sq, y_med_sq) => {
    utils.recoloring(this, x_med_sq, y_med_sq)
    for (let y = 0; y <= 2; y++) {
      for (let x = 0; x <= 2; x++) {
        let x1 = x_med_sq*3 + x
        let y1 = y_med_sq*3 + y
        let n = y1 * this.cols + x1
        if (this.all[n] == "white") {
          this.all[n] = global.plColor
          return null
        }
      }
    }
  }

  chPlayer = () => {
    if (this.f == true) {
      for (let i = 0; i <= global.plColors.length - 1; i++) {
        if (global.plColor == global.plColors[i]) {
          if (i == global.plColors.length - 1) {
            global.plColor = global.plColors[0]
          } else {
            global.plColor = global.plColors[i+1]
            return global.plColor
          }
        }
      }
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



  fullRestart = async() => {
    this.all = [...global.standartAll]
    this.counter = 0
    this.createFromAll()
    let first = $("td")
    consts.scores.redScore = 0
    consts.scores.blueScore = 0
    consts.scores.greenScore = 0
    consts.scores.violetScore = 0
    graph.showAllScores()
    graph.PopUpPlayersShow()
  }

}
export default Table;
