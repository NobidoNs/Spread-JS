import $ from "jquery"
import {scores} from "./const"
import {global} from "./Global"

// All Shows and Hides
export const chColor = (x, y, color, table) => {
  const first = $("td");
  let n = y * table.cols + x
  let el = first[n]; // todo: global letiable
  $(el).css('background-color', color);
  table.all[n] = color
}

export function draw(table1, table2) {
  for (let n = 0; n < table2.all.length - 1; n++) {
    let y = Math.floor(n / table1.cols)
    let x = n - y*table1.cols
    let cl = table2.all[n]
    chColor(x, y, cl,table1)
  }
}

export function PopUpWinShow(inp){
  const out = inp + " Win"
  popUpStartShow()
  $("#whoIsWin").html(out)
}

export function showAllScores() {
  const {blueScore, redScore, greenScore, violetScore} = scores
  const plScores = [blueScore, redScore, greenScore, violetScore]
  const plNames = ["blueScore", "redScore", "greenScore", "violetScore"]
  $("#popupsc").show()
  for (let i = 0; i <= 4; i++) {
    const out = plNames[i] + " " + plScores[i]
    $(`#${plNames[i]}`).html(out)
  }
}

export function PopUpStart(table, demo){
  popUpStartHide()
  if (demo == false) {
    table.fullRestart()
  }
  $("#popupsc").show();
}

export function PopUpPlayersShow(){
  $("#popuppl").show();
}

export function PopUpPlayersHide(){
  $("#popuppl").hide();
}

export function popUpStartHide() {
  $("#popupst").hide()
}

export function popUpStartShow() {
  $("#popupst").show()
}
