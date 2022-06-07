import $ from "jquery"
import {scores} from "const"
import graph from "./graph"
import utils, { checker } from "./utils"

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

  whatIsColor = (x,y) => {
    let n = y * this.cols + x
    let color = this.all[n]
    return color
  }

  tapOnTable = async(x, y, plColors, plColor) => {
    let n = y * this.cols + x
    const table2 = this.clone()
    if (utils.tapCeck(plColors, plColor, x, y)) {
      table2.all[n] = plColor
      this.f = true
      utils.checker(table2, plColors, plColor)

      if (this.counter >= 1) {
        let {blueScore, redScore, greenScore, violetScore} = scores
        let isEnd = false
        if (blueScore+redScore+greenScore+violetScore != 0) {
          isEnd = utils.gameEndCheck(table2, plColors)
        }
        if (isEnd != false) {
          graph.PopUpWinShow(isEnd[1], table2)
          return 
        }
      }
      this.draw(table2)
      this.init(table2)
      this.chPlayer(plColors, plColor)
      this.counter += 1
    }
  }

  colorJamp = (x_med_sq, y_med_sq, plColor) => {
    utils.recoloring(this, x_med_sq, y_med_sq)
    for (let y = 0; y <= 2; y++) {
      for (let x = 0; x <= 2; x++) {
        let x1 = x_med_sq*3 + x
        let y1 = y_med_sq*3 + y
        let n = y1 * this.cols + x1
        if (this.all[n] == "white") {
          this.all[n] = plColor
          return null
        }
      }
    }
  }

  chPlayer = (plColors, plColor) => {
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



  fullRestart = async(standartAll) => {
    this.all = [...standartAll]
    this.counter = 0
    this.createFromAll()
    let first = $("td")
    scores.redScore = 0
    scores.blueScore = 0
    scores.greenScore = 0
    scores.violetScore = 0
    graph.showAllScores()
    graph.PopUpPlayersShow()
  }

}
export default Table;
