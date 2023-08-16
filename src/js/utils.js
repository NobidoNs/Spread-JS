import * as graph from "./graph"
import {global} from "./Global"
import {scores} from "./const"

export function haveColor(table, x_med_sq, y_med_sq) {  
  for (let y = 0; y <= 2; y++) {
    for (let x = 0; x <= 2; x++) {
      let x_pos = x_med_sq*3 + x
      let y_pos = y_med_sq*3 + y
      for (let p = 0; p <= global.plColors.length - 1; p++) {
        let a = whatIsColor(table, x_pos, y_pos)
        if (a == global.plColors[p]) {
          let color = whatIsColor(table, x_pos, y_pos)
          return [true, color]
        }
      }
    }
  }
  return [false, null]
}
export async function pause(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export function whatIsColor(table, x, y) {
  let n = y * table.cols + x
  let color = table.all[n]
  return color
}

function onlyColorfull(table, x_medium_sq, y_medium_sq) {  
  let ret = true
  const x_sq = x_medium_sq + 1
  const y_sq = y_medium_sq + 1
  let black = 0
  for (let y = 0; y <= 2; y++) {
    for (let x = 0; x <= 2; x++) {
      const x_pos = (x_sq-1) * 3 + x
      const y_pos = (y_sq-1) * 3 + y
      if (whatIsColor(table, x_pos,y_pos) == "white") {
        ret = false
      }
      if (whatIsColor(table, x_pos,y_pos) == "black") {
        black += 1
      }
      if (black == 9) {
        ret = false
      }
    }
  }
  return ret
}

export function check(table) {
  let zn_x = []
  let zn_y = []
  let ret = false
  let yRange = table.getRows() / 3 - 1
  let xRange = table.getCols() / 3 - 1
  for (let y = 0; y <= yRange; y++) {
    for (let x = 0; x <= xRange; x++) {
      let r = onlyColorfull(table, x, y)
      if (r == true) {
        ret = true
        zn_x.push(x)
        zn_y.push(y)
      }
    }
  }
  const ret2 = [ret, zn_x, zn_y]
  return ret2
}

export function tapCheck(table, x, y) {
  let x_med_sq = Math.floor(x / 3)
  let y_med_sq = Math.floor(y / 3)
  let re = haveColor(table, x_med_sq, y_med_sq)
  let color = re[1]
  let fl = re[0]
  let n = y * table.cols + x
  if ((table.all[n] == "white" && fl == false) || 
  (fl == true && color == global.plColor && table.all[n] == "white")) {
    return true
  } else {
    return false
  }
}

export async function checker(table1, table2) {
  for (let y = 0; y <= 20; y++) {
    const fl2 = await check(table2)
    if (fl2[0] == true) {
      BOOMER(table2, fl2[1], fl2[2])
      graph.draw(table1, table2)
      await pause(1000)
    }
    else {
      break
    }
  }
}

async function BOOMER(table, zn_x, zn_y) {
  const l = zn_x.length
  for (let a = 0; a <= l - 1; a++) {
    BOOM(table, zn_x[a], zn_y[a])
  }
}

function BOOM(table, x_med_sq, y_med_sq) {
  let x_centr = x_med_sq * 3 + 1
  let y_centr = y_med_sq * 3 + 1
  let x_to_activated = [2, -2, 0, 0]
  let y_to_activated = [0, 0, 2, -2]
  clear_medium_sq(table, x_med_sq, y_med_sq)
  let loops = 0
  for (let i = 0; i <= 3; i++) {
    let x1 = x_centr - x_to_activated[i]
    let y1 = y_centr - y_to_activated[i]
    if (x1 < 0 || y1 < 0) {
      continue
    } 
    let two_x_medium_sq = Math.floor(x1 / 3)
    let two_y_medium_sq = Math.floor(y1 / 3)
    let z = whatIsColor(table, x1, y1) 
    let n = y1 * table.cols + x1

    if (z == "white") {
      table.all[n] = global.plColor
      recoloring(table, two_x_medium_sq, two_y_medium_sq)
    } else {
      for (let p = 0; p <= global.plColors.length - 1; p++) {
        if (z == global.plColors[p]) {
          table.colorJamp(two_x_medium_sq, two_y_medium_sq, global.plColor)
        }
      }
    }
  }
}

function clear_medium_sq(table, x_med_sq, y_med_sq) {
  for (let y = 0; y <= 2; y++) {
    for (let x = 0; x <= 2; x++) {
      let x1 = (x_med_sq * 3) + x
      let y1 = (y_med_sq * 3) + y
      let z = whatIsColor(table, x1, y1)
      for (let p = 0; p <= global.plColors.length - 1; p++) {
        if (z == global.plColors[p]) {
          const n = y1 * table.cols + x1
          table.all[n] = "white"
        }
      }
    }
  }
}

export function recoloring(table, x_med_sq, y_med_sq) {
  let scoresColor = {
  "blue":scores.blueScore, 
  "red":scores.redScore, 
  "green":scores.greenScore, 
  "violet":scores.violetScore
  }
  const cl = ["blueScore", "redScore", "greenScore", "violetScore"]

  for (let y = 0; y <= 2; y++) {
    for (let x = 0; x <= 2; x++) {
      const x1 = (x_med_sq*3) + x
      const y1 = (y_med_sq*3) + y
      const a = whatIsColor(table, x1, y1)
      for (let p = 0; p <= global.plColors.length - 1; p++) {
        if (a == global.plColors[p]) {
          const n = y1 * table.cols + x1
          table.all[n] = global.plColor

          if (global.plColor != global.plColors[p]) {
            scoresColor[global.plColor] += 1
            scores.blueScore = scoresColor.blue
            scores.redScore = scoresColor.red
            scores.greenScore = scoresColor.green
            scores.violetScore = scoresColor.violet
          }
        }
      }
    }
  }
  graph.showAllScores()
}

function kick(colors) {
  const clean = global.plColors.filter((item) => (colors.includes(item)))
  global.plColors = clean
}

export function gameEndCheck(table) {
  if (global.steps < global.plColors.length) {
    return false
  }
  let colors = []
  for (let y = 0; y < table.getRows(); y++) {
    for (let x = 0; x < table.getCols(); x++) {
      let cl = whatIsColor(table, x, y)
      if (global.plColors.includes(cl)) {
        if (colors.includes(cl) == false) {
          colors.push(cl)
        }
      }
    }
  }
  kick(colors)
  if (colors.length == 1) {
    const ret = [true, colors[0]]
    return ret
  } else {
    return false
  }

}