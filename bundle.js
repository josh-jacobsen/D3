(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// var barRender = require('./barRender');

// Scatter chart

// set variables for scatter chart

var scatterWidth = 1000;
var scatterHeight = 500;

var scatterMargin = {top: 10, bottom: 10, left: 10, right: 10}

var scatterInnerWidth = scatterWidth - scatterMargin.left - scatterMargin.right;
var scatterInnerHeight = scatterHeight - scatterMargin.top - scatterMargin.bottom;

var scatterrMin = 1;
var scatterrMax = 20;
var scatterxColumn = "time_weeks";
var scatteryColumn = "percent_complete";
var scatterrColumn = "project_cost"
var scattercolorColumn = "category"

// define scatter SVG
var scatterSvg = d3.select(".scatter").append("svg")
  .attr("width", scatterWidth)
  .attr("height", scatterHeight)
  .attr("id", "scatter")

// create group of circles to transform and translate
var scatterG = scatterSvg.append("g")
  .attr("transform", "translate(" + scatterMargin.left + "," + scatterMargin.top + ")");

var scatterxScale = d3.scale.linear().range([0, scatterInnerWidth])
var scatteryScale = d3.scale.linear().range([scatterInnerHeight, 0])
var scatterrScale = d3.scale.linear().range([scatterrMin, scatterrMax])
var scatterColorScale = d3.scale.category10();

// render the scatter graph
function scatterRender(data) {
    scatterxScale.domain(d3.extent(data, function (d) {return d[scatterxColumn] }))
    scatteryScale.domain(d3.extent(data, function (d) {return d[scatteryColumn] }))
    scatterrScale.domain(d3.extent(data, function (d) {return d[scatterrColumn]}))

    // Bind data
    var circles = scatterG.selectAll("circle").data(data)

    //Enter
    circles.enter().append("circle");

    //Update
    circles
      .attr("cx", function (d) {return scatterxScale(d[scatterxColumn]);})
      .attr("cy", function (d) {return scatteryScale(d[scatteryColumn]);})
      .attr("r", function (d) {return scatterrScale(d[scatterrColumn]);})
      .attr("stroke", function (d) {return scatterColorScale(d[scattercolorColumn])})
    console.log(circles.attr("stroke"));

    //Exit
    circles.exit.remove();
};

function scatterType(d) {
  d.percent_complete = Number(d.percent_complete);
  d.project_cost = Number(d.project_cost)
  d.time_weeks = Number(d.time_weeks)
  return d
};



// Bar chart

var barOuterWidth = 1000;
var barOuterHeight = 500;

var barMargin = {top: 10, bottom: 10, left: 10, right: 10}

var barInnerWidth = barOuterWidth - barMargin.left - barMargin.right;
var barInnerHeight = barOuterHeight - barMargin.top - barMargin.bottom;

var barxColumn = "year";
var baryColumn = "budget";

var barSvg = d3.select(".bar").append("svg")
  .attr("width", barOuterWidth)
  .attr("height", barOuterHeight)
  .attr("id", "bar")

// var rect = barSvg.append("rect")
//   .attr("height", 50)
//   .attr("width", 50)
//   .attr("fill", "blue")
//
// var barG = barSvg.append("g")


var barG = barSvg.append("g")
  .attr("transform", "translate(" + barMargin.left + "," + barMargin.top + ")");

var barxScale = d3.scale.ordinal().rangeBands([0, barInnerWidth]);
var baryScale = d3.scale.linear().range([barInnerHeight, 0]);

function barRender(data) {
  barxScale.domain(     data.map(function (d) {return d[barxColumn]; }));
  baryScale.domain([0, d3.max(data, function (d) { return d[baryColumn]; } )]);

  // bind data
  var bars = barG.selectAll("rect").data(data);

  // enter
  bars.enter().append("rect")
    .attr("width", barxScale.rangeBand());

  // Update

  bars
    .attr("x", function (d) {return barxScale(d[barxColumn]); })
    .attr("y", function (d) {return baryScale(d[baryColumn]); })
    .attr("height", function (d) {return barInnerHeight - baryScale(d[baryColumn])})
}

function barType(d){
  d.year = +d.year;
  d.budget = +d.budget;
  return d;
}


// function calls to create graphs

d3.csv("../data/project_data.csv", scatterType, scatterRender)
d3.csv("../data/yearOnYear.csv", barType, barRender)

},{}]},{},[1]);
