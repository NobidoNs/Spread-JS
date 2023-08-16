// Test import of styles
// https://stackoverflow.com/questions/53558916/babel-7-referenceerror-regeneratorruntime-is-not-defined
import "core-js/stable";
import "regenerator-runtime/runtime";

// import '@/styles/index.scss'
import '@/styles/style.css'
import '@/styles/styles.css'

import $ from "jquery"
import Table from "./js/Table"
import DemoMap from "./js/DemoMap"
// import * as consts from "./js/const"
import * as graph from "./js/graph"
import {global} from "./js/Global"

let table1 = null
let first = [];
let onReady = false
let demo = false
let demoTable = null

window.tap = async function(row,col) {
  const x = row;
  const y = col;
  if (onReady) return
  onReady = true
  if (demo == true) {
    demoTable.tapOnDemoTable(x, y)
    onReady = false
  } else {
    global.steps += 1
    await table1.tapOnTable(x, y)
    onReady = false
  }
}

window.threeXthree = function () {
  graph.popUpStartHide()
  graph.hideAllScores()
  graph.PopUpPlayersShow()
  graph.PopUpMapHide()
  table1 = new Table('myTable', 8, 8)
  table1.generate()
  first = $("td");
  graph.TbShow()
  global.standartAll = [...table1.all]
}

window.sixXsix = function() {
  graph.popUpStartHide()
  graph.hideAllScores()
  graph.PopUpPlayersShow()
  graph.PopUpMapHide()
  table1 = new Table('myTable', 17, 17)
  table1.generate()
  first = $("td");
  graph.TbShow()
  global.standartAll = [...table1.all]
}

window.CreateMap = function() {
  graph.hideAll();
  graph.genShow()
}

window.generate = function () {
  const c = getCols()
  const r = getRow()
  if (r <= 0 || c <= 0 || (r == 1 || c < 3)) return null
  $("#popupdo").show();
  graph.genHide()
  StartCreate(r, c)
}

function StartCreate(r, c) {
  graph.DemoTbShow()
  demoTable = new DemoMap('myDemoTable', r, c)
  demoTable.mapGenerate()
  demo = true
  first = $("td")
}

window.done = function() {
  doneHiden()
  demoTable.cosmetyc()
  const r = parseInt(getRow())
  const c = parseInt(getCols())
  demo = false
  table1 = new Table('myTable', r, c)
  table1.all = [...demoTable.all]
  global.standartAll = [...demoTable.all]
  table1.createFromAll()
  const tableObj = $(`#myDemoTable`)
  tableObj.html("<div hidden></div>")
  first = $("td")
  graph.TbShow()
  graph.PopUpPlayersShow()
}

function doneHiden() {
  $("#popupdo").hide();
  // graph.PopUpPlayersShow()
}

window.twoPlayers = function() {
  players(1)
}
window.threePlayers = function() {
  players(2)
}
window.fourPlayers = function() {
  players(3)
}
function players(inp) {
  graph.showAllScores()
  graph.PopUpPlayersHide()
  const plCl = ["red", "blue", "green", "violet"]
  global.plColors = []
  for (let i = 0; i <= inp; i++) {
    global.plColors.push(plCl[i])
  }
}

function getRow() {
  let r = (document.getElementById('row').value) * 3 - 1
  return r
}

function getCols() {
  return (document.getElementById('col').value) * 3 - 1
}

window.PopUpStart = function (){
  graph.popUpStartHide()
  table1.fullRestart()
  graph.PopUpPlayersShow()
}

window.selectMap = function (){
  graph.PopUpPlayersHide()
  graph.PopUpMapShow()
  graph.TbHide()
  table1.fullRestart()
  table1.deleteTable()
  // $("#popupsc").show();
}