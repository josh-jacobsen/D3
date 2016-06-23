// var scatterWidth = 1000;
// var scatterHeight = 500;
//
// var margin = {top: 10, bottom: 10, left: 10, right: 10}
//
// var scatterInnerWidth = scatterWidth - margin.left - margin.right;
// var scatterInnerHeight = scatterHeight - margin.top - margin.bottom;
//
// var rMin = 1;
// var rMax = 20;
// var xColumn = "time_weeks";
// var yColumn = "percent_complete";
// var rColumn = "project_cost"
// var colorColumn = "category"
//
// var scatterSvg = d3.select(".scatter").append("svg")
//   .attr("width", scatterWidth)
//   .attr("height", scatterHeight)
//   .attr("id", "scatter")
//
// var g = scatterSvg.append("g")
//   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
// var xScale = d3.scale.linear().range([0, scatterInnerWidth])
// var yScale = d3.scale.linear().range([scatterInnerHeight, 0])
// var rScale = d3.scale.linear().range([rMin, rMax])
// var colorScale = d3.scale.category10();
//
//
// function render(data) {
//
//     xScale.domain(d3.extent(data, function (d) {return d[xColumn] }))
//     yScale.domain(d3.extent(data, function (d) {return d[yColumn] }))
//     rScale.domain(d3.extent(data, function (d) {return d[rColumn]}))
//
//     console.log(data);
//     // Bind data
//     var circles = g.selectAll("circle").data(data)
//
//     //Enter
//     circles.enter().append("circle");
//
//     //Update
//     circles
//       .attr("cx", function (d) {return xScale(d[xColumn]);})
//       .attr("cy", function (d) {return yScale(d[yColumn]);})
//       .attr("r", function (d) {return rScale(d[rColumn]);})
//       .attr("fill", function (d) {return colorScale(d[colorColumn])})
//
//     //Exit
//     circles.exit.remove();
// };
//
// function type(d) {
//   d.percent_complete = Number(d.percent_complete);
//   d.project_cost = Number(d.project_cost)
//   d.time_weeks = Number(d.time_weeks)
//   return d
// };
//
// d3.csv("../data/project_data.csv", type, render)
//

var barOuterWidth = 1000;
var barOuterHeight = 500;

var margin = {top: 10, bottom: 10, left: 10, right: 10}

var barInnerWidth = barOuterWidth - margin.left - margin.right;
var barInnerHeight = barOuterHeight - margin.top - margin.bottom;

var xColumn = "year";
var yColumn = "budget";

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

var xScale = d3.scale.ordinal().rangeBands([0, barInnerWidth]);
var yScale = d3.scale.linear().range([barInnerHeight, 0]);

function render(data) {
  xScale.domain(     data.map(function (d) {return d[xColumn]; }));
  yScale.domain([0, d3.max(data, function (d) { return d[yColumn]; } )]);

  // bind data
  var bars = barSvg.selectAll("rect").data(data);

  // enter
  bars.enter().append("rect")
    .attr("width", xScale.rangeBand());

  // Update
  
  bars
    .attr("x", function (d) {return xScale(d[xColumn]); })
    .attr("y", function (d) {return yScale(d[yColumn]); })
    .attr("height", function (d) {return barInnerHeight - yScale(d[yColumn])})



}


function type(d){
  d.year = +d.year;
  d.budget = +d.budget;
  return d;
}

d3.csv("../data/yearOnYear.csv", type, render)
