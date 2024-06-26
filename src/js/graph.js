import $ from 'jquery'
import { scores, colorsCount } from './const'

// All Shows and Hides
export const chColor = (x, y, color, table) => {
  const first = $('td')
  let n = y * table.cols + x
  let el = first[n] // todo: global letiable
  $(el).css('background-color', color)
  table.all[n] = color
}

export function draw(table1, table2) {
  for (let n = 0; n < table2.all.length - 1; n++) {
    let y = Math.floor(n / table1.cols)
    let x = n - y * table1.cols
    let cl = table2.all[n]
    chColor(x, y, cl, table1)
  }
}

export function hideAll() {
  this.hideAllScores()
  this.PopUpMapHide()
  this.PopUpPlayersHide()
  this.popUpStartHide()
  this.genHide()
  this.TbHide()
  this.DemoTbHide()
}

export function PopUpWinShow(inp) {
  const out = inp + ' Win'
  popUpStartShow()
  $('#whoIsWin').html(out)
}

export function showScores(count) {
  const delCount = colorsCount - count
  const { blueScore, redScore, greenScore, violetScore } = scores
  const plScores = [blueScore, redScore, greenScore, violetScore]
  const plNames = ['blueScore', 'violetScore', 'greenScore', 'redScore']
  const revPlNames = ['violetScore', 'greenScore', 'redScore', 'blueScore']
  $('#popupsc').show()
  for (let i = 0; i <= delCount - 1; i++) {
    $(`#${revPlNames[i]}`).hide()
  }
  for (let i = 0; i <= plNames.length; i++) {
    const out = plNames[i] + ' ' + plScores[i]
    $(`#${plNames[i]}`).html(out)
  }
}
export function hideAllScores() {
  $('#popupsc').hide()
}

export function DemoTbHide() {
  $('#myDemoTable').hide()
}
export function DemoTbShow() {
  $('#myDemoTable').show()
}
export function genHide() {
  $('#popupge').hide()
  $('#inp').hide()
}
export function genShow() {
  $('#popupge').show()
  $('#inp').show()
}
export function TbHide() {
  $('#myTable').hide()
}
export function TbShow() {
  $('#myTable').show()
}
export function PopUpMapHide() {
  $('#popupmp').hide()
}
export function PopUpMapShow() {
  $('#popupmp').show()
}
export function PopUpPlayersShow() {
  $('#popuppl').show()
}

export function PopUpPlayersHide() {
  $('#popuppl').hide()
}

export function popUpStartHide() {
  $('#popupst').hide()
}

export function popUpStartShow() {
  $('#popupst').show()
}
