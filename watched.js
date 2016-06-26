(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Bar chart

var barOuterWidth = 960;
var barOuterHeight = 500;
var barMargin = {top: 25, bottom: 25, left: 50, right: 25}
var barPadding = 0.2;

var barInnerWidth = barOuterWidth - barMargin.left - barMargin.right;
var barInnerHeight = barOuterHeight - barMargin.top - barMargin.bottom;

var barxColumn = "year";
var baryColumn = "budget";

var xAxisLabelText = "Year"
var xAxisLabelOffset = 10;

var yAxisLabelText = "Budget";
var yAxisLabelOffset = 10;

var barSvg = d3.select(".bar").append("svg")
  .attr("width", barOuterWidth)
  .attr("height", barOuterHeight)
  .attr("id", "bar")

var barG = barSvg.append("g")
  .attr("transform", "translate(" + barMargin.left + "," + barMargin.top + ")");

var barXAxisG = barG.append("g")
  .attr("transform", "translate(0," + barInnerHeight + ")");

var barXAxisLabel = barXAxisG.append("text")



var barYAxisG = barG.append("g");

var barxScale = d3.scale.ordinal().rangeBands([0, barInnerWidth], barPadding);
var baryScale = d3.scale.linear().range([barInnerHeight, 0]);

var barXAxis = d3.svg.axis().scale(barxScale).orient("bottom");
var barYAxis = d3.svg.axis().scale(baryScale).orient("left");

function barRender(data) {
  barxScale.domain(     data.map(function (d) {return d[barxColumn]; }));
  baryScale.domain([0, d3.max(data, function (d) { return d[baryColumn]; } )]);

  barXAxisG.call(barXAxis)
  barYAxisG.call(barYAxis)

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
    .attr("fill", "blue")
}

function barType(d){
  d.year = +d.year;
  d.budget = +d.budget;
  return d;
}

module.exports = {
  barRender: barRender,
  barType: barType
}

},{}],2:[function(require,module,exports){
// Bar chart

var barOuterWidth = 960;
var barOuterHeight = 500;
var barMargin = {top: 50, bottom: 50, left: 50, right: 50}
var barPadding = 0.2;

var barxColumn = "budget";
var baryColumn = "year";
var xAxisLabelText = "NZDF Budget (millions)"
var xAxisLabelOffset = 45;

var barInnerWidth = barOuterWidth - barMargin.left - barMargin.right;
var barInnerHeight = barOuterHeight - barMargin.top - barMargin.bottom;

var barSvg = d3.select(".horizontalBar").append("svg")
  .attr("width", barOuterWidth)
  .attr("height", barOuterHeight)
  .attr("id", "horizontalBar")

var barG = barSvg.append("g")
  .attr("transform", "translate(" + barMargin.left + "," + barMargin.top + ")");

// create x axis group
var barXAxisG = barG.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + barInnerHeight + ")");

// create x axis label
var xAxisLabel = barXAxisG.append("text")
  .style("text-anchor", "middle")
  .attr("transform", "translate(" + (barInnerWidth / 2) + "," + xAxisLabelOffset + ")")
  .attr("class", "label")
  .text(xAxisLabelText)

var barYAxisG = barG.append("g")
  .attr("class", "y axis")


var barxScale = d3.scale.linear().range([0, barInnerWidth]);
var baryScale = d3.scale.ordinal().rangeBands([0, barInnerHeight], barPadding);

var barXAxis = d3.svg.axis().scale(barxScale).orient("bottom")
  .ticks(10)
  .outerTickSize(1)
var barYAxis = d3.svg.axis().scale(baryScale).orient("left");

function horizontalRender(data) {
  barxScale.domain([0, d3.max(data, function (d) { return d[barxColumn]; } )]);
  baryScale.domain(    data.map(function (d) {return d[baryColumn];}));

  barXAxisG.call(barXAxis)
  barYAxisG.call(barYAxis)

  // bind data
  var bars = barG.selectAll("rect").data(data);

  // enter
  bars.enter().append("rect")
    .attr("height", baryScale.rangeBand());

  // Update

  bars
    .attr("x", 0)
    .attr("y", function (d) {return baryScale(d[baryColumn]); })
    .attr("width", function (d) {return barxScale(d[barxColumn])})
    .attr("fill", "orange")
}

function horizontalType(d){
  d.year = +d.year;
  d.budget = +d.budget;
  return d;
}

module.exports = {
  horizontalRender: horizontalRender,
  horizontalType: horizontalType
}

},{}],3:[function(require,module,exports){
var scatterChart = require('./scatterChart');
var barChart = require('./barChart');
var horizontalBar = require('./horizontalBar');


d3.csv("../data/project_data.csv", scatterChart.scatterType, scatterChart.scatterRender)

d3.csv("../data/yearOnYear.csv", barChart.barType, barChart.barRender)

d3.csv("../data/yearOnYear.csv", horizontalBar.horizontalType, horizontalBar.horizontalRender)

},{"./barChart":1,"./horizontalBar":2,"./scatterChart":4}],4:[function(require,module,exports){

// set variables for scatter chart

var scatterWidth = 960;
var scatterHeight = 500;

var scatterMargin = {top: 10, bottom: 70, left: 50, right: 10}

var scatterInnerWidth = scatterWidth - scatterMargin.left - scatterMargin.right;
var scatterInnerHeight = scatterHeight - scatterMargin.top - scatterMargin.bottom;

var scatterrMin = 1;
var scatterrMax = 20;
var scatterxColumn = "time_weeks";
var scatteryColumn = "percent_complete";
var scatterrColumn = "project_cost"
var scattercolorColumn = "category"
var scatterXAxisLabelOffset = 50;
var scatterXAxisLabelText = "Time (Weeks)"

var scatterYAxisLabelOffset = 35;
var scatterYAxisLabelText = "Project Completion (%)"

// define scatter SVG
var scatterSvg = d3.select(".scatter").append("svg")
  .attr("width", scatterWidth)
  .attr("height", scatterHeight)
  .attr("id", "scatter")

// create group of circles to transform and translate
var scatterG = scatterSvg.append("g")
  .attr("transform", "translate(" + scatterMargin.left + "," + scatterMargin.top + ")");

// Create x axis grouping and append label
var scatterXAxisGroup = scatterG.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + scatterInnerHeight + ")")
var scatterXAxisLabel = scatterXAxisGroup.append("text")
  .style("text-anchor", "middle")
  .attr("transform", "translate(" + (scatterInnerWidth / 2) + "," + scatterXAxisLabelOffset + ")")
  .attr("class", "label")
  .text(scatterXAxisLabelText);

// create y axis grouping and append label
var scatterYAxisGroup = scatterG.append("g")
  .attr("class", "y axis")
var scatterYAxisLabel = scatterYAxisGroup.append("text")
  .attr("class", "label")
  .style("text-anchor", "middle")
  .attr("transform", "translate(-" + scatterYAxisLabelOffset + "," + (scatterInnerHeight / 2) + ") rotate(-90)")
  .text(scatterYAxisLabelText)

// map the range of the data to pixel space
var scatterxScale = d3.scale.linear().range([0, scatterInnerWidth])
var scatteryScale = d3.scale.linear().range([scatterInnerHeight, 0])
var scatterrScale = d3.scale.linear().range([scatterrMin, scatterrMax])
var scatterColorScale = d3.scale.category10();

// map the range of the axis to pixel space and set position
var scatterXAxis = d3.svg.axis().scale(scatterxScale).orient("bottom")
  .outerTickSize(1)
var scatterYAxis = d3.svg.axis().scale(scatteryScale).orient("left")
  .ticks(10)
  .tickFormat(d3.format("s"))
  .outerTickSize(1)

// render the scatter graph
function scatterRender(data) {
    scatterxScale.domain(d3.extent(data, function (d) {return d[scatterxColumn] }))
    scatteryScale.domain(d3.extent(data, function (d) {return d[scatteryColumn] }))
    scatterrScale.domain(d3.extent(data, function (d) {return d[scatterrColumn]}))

    // Call axeies
    scatterXAxisGroup.call(scatterXAxis)
    scatterYAxisGroup.call(scatterYAxis)

    // Bind data
    var circles = scatterG.selectAll("circle").data(data)

    //Enter
    circles.enter().append("circle");

    //Update
    circles
      .attr("cx", function (d) {return scatterxScale(d[scatterxColumn]);})
      .attr("cy", function (d) {return scatteryScale(d[scatteryColumn]);})
      .attr("r", function (d) {return scatterrScale(d[scatterrColumn]);})
      .attr("fill", function (d) {return scatterColorScale(d[scattercolorColumn])})

    //Exit
    circles.exit.remove();
};

function scatterType(d) {
  d.percent_complete = Number(d.percent_complete);
  d.project_cost = Number(d.project_cost)
  d.time_weeks = Number(d.time_weeks)
  return d
};

module.exports = {
  scatterRender: scatterRender,
  scatterType: scatterType
}

},{}]},{},[3]);
