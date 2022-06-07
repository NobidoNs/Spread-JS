// Test import of styles
import '@/styles/index.scss'
import $ from "jquery"
import Table from "./js/Table"
import DemoMap from "./js/DemoMap"
import {scores} from "./js/const"
import {plColor} from "./js/const"
import graph from "./js/graph"
import utils from "./js/utils"

let table1 = null
let plColors = []
let first = [];
let onReady = false
let demo = false
let standartAll = null
let demoTable = null

const tap = async (row,col) => {
  const x = row;
  const y = col;
  if (onReady) return
  console.log('taped', x, y)
  onReady = true
  if (demo == true) {
    demoTable.tapOnDemoTable(x, y)
    onReady = false
  } else {
    await table1.tapOnTable(x, y, plColors, plColor)
    onReady = false
  }
}

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
  graph.PopUpPlayersShow()
  standartAll = [...table1.all]
}

function sixXsix() {
  PopUpMapHide();
  table1 = new Table('myTable', 17, 17)
  table1.generate()
  first = $("td");
  graph.PopUpPlayersShow()
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
  graph.PopUpPlayersShow()
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
  graph.showAllScores()
  graph.PopUpPlayersHide()
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