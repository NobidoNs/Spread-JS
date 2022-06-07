import $ from "jquery"

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

  chColor = (x, y, color) => {
    const first = $("td")
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
            colors.push(this.whatIsColor(pos[rec], pos[rec+1]))
            rec += 2
          }
          for (let p = 0; p <= colors.length - 1; p++) {
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
export default DemoMap;