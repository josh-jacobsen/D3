// var barRender = require('./barRender');
var scatterChart = require('./scatterChart');

var barChart = require('./barChart');


// Scatter chart

// set variables for scatter chart
//
// var scatterWidth = 1000;
// var scatterHeight = 500;
//
// var scatterMargin = {top: 10, bottom: 70, left: 10, right: 10}
//
// var scatterInnerWidth = scatterWidth - scatterMargin.left - scatterMargin.right;
// var scatterInnerHeight = scatterHeight - scatterMargin.top - scatterMargin.bottom;
//
// var scatterrMin = 1;
// var scatterrMax = 20;
// var scatterxColumn = "time_weeks";
// var scatteryColumn = "percent_complete";
// var scatterrColumn = "project_cost"
// var scattercolorColumn = "category"
// var scatterXAxisLabelOffset = 55;
// var scatterXAxisLabelText = "Time (Weeks)"
//
// // define scatter SVG
// var scatterSvg = d3.select(".scatter").append("svg")
//   .attr("width", scatterWidth)
//   .attr("height", scatterHeight)
//   .attr("id", "scatter")
//
// // create group of circles to transform and translate
// var scatterG = scatterSvg.append("g")
//   .attr("transform", "translate(" + scatterMargin.left + "," + scatterMargin.top + ")");
//
// var scatterXAxisGroup = scatterG.append("g")
//   .attr("transform", "translate(0," + scatterInnerHeight + ")")
//
// var scatterXAxisLabel = scatterXAxisGroup.append("text")
//   .style("text-anchor", "middle")
//   .attr("transform", "translate(" + (scatterInnerWidth / 2) + "," + scatterXAxisLabelOffset + ")")
//   .attr("class", "label")
//   .text(scatterXAxisLabelText);
//
//
// var scatterxScale = d3.scale.linear().range([0, scatterInnerWidth])
// var scatteryScale = d3.scale.linear().range([scatterInnerHeight, 0])
// var scatterrScale = d3.scale.linear().range([scatterrMin, scatterrMax])
// var scatterColorScale = d3.scale.category10();
//
// var scatterXAxis = d3.svg.axis().scale(scatterxScale).orient("bottom");
//
// // render the scatter graph
// function scatterRender(data) {
//     scatterxScale.domain(d3.extent(data, function (d) {return d[scatterxColumn] }))
//     scatteryScale.domain(d3.extent(data, function (d) {return d[scatteryColumn] }))
//     scatterrScale.domain(d3.extent(data, function (d) {return d[scatterrColumn]}))
//
//     // Call axeies
//     scatterXAxisGroup.call(scatterXAxis)
//
//     // Bind data
//     var circles = scatterG.selectAll("circle").data(data)
//
//     //Enter
//     circles.enter().append("circle");
//
//     //Update
//     circles
//       .attr("cx", function (d) {return scatterxScale(d[scatterxColumn]);})
//       .attr("cy", function (d) {return scatteryScale(d[scatteryColumn]);})
//       .attr("r", function (d) {return scatterrScale(d[scatterrColumn]);})
//       .attr("stroke", function (d) {return scatterColorScale(d[scattercolorColumn])})
//
//     //Exit
//     circles.exit.remove();
// };
//
// function scatterType(d) {
//   d.percent_complete = Number(d.percent_complete);
//   d.project_cost = Number(d.project_cost)
//   d.time_weeks = Number(d.time_weeks)
//   return d
// };

// Bar chart

// var barOuterWidth = 1000;
// var barOuterHeight = 500;
// var barMargin = {top: 25, bottom: 25, left: 25, right: 25}
// var barPadding = 0.2;
//
// var barInnerWidth = barOuterWidth - barMargin.left - barMargin.right;
// var barInnerHeight = barOuterHeight - barMargin.top - barMargin.bottom;
//
// var barxColumn = "year";
// var baryColumn = "budget";
//
// var barSvg = d3.select(".bar").append("svg")
//   .attr("width", barOuterWidth)
//   .attr("height", barOuterHeight)
//   .attr("id", "bar")
//
// var barG = barSvg.append("g")
//   .attr("transform", "translate(" + barMargin.left + "," + barMargin.top + ")");
//
// var barXAxisG = barG.append("g")
//   .attr("transform", "translate(0," + barInnerHeight + ")");
// var barYAxisG = barG.append("g");
//
// var barxScale = d3.scale.ordinal().rangeBands([0, barInnerWidth], barPadding);
// var baryScale = d3.scale.linear().range([barInnerHeight, 0]);
//
// var barXAxis = d3.svg.axis().scale(barxScale).orient("bottom");
// var barYAxis = d3.svg.axis().scale(baryScale).orient("left");
//
// function barRender(data) {
//   barxScale.domain(     data.map(function (d) {return d[barxColumn]; }));
//   baryScale.domain([0, d3.max(data, function (d) { return d[baryColumn]; } )]);
//
//   barXAxisG.call(barXAxis)
//   barYAxisG.call(barYAxis)
//
//   // bind data
//   var bars = barG.selectAll("rect").data(data);
//
//   // enter
//   bars.enter().append("rect")
//     .attr("width", barxScale.rangeBand());
//
//   // Update
//
//   bars
//     .attr("x", function (d) {return barxScale(d[barxColumn]); })
//     .attr("y", function (d) {return baryScale(d[baryColumn]); })
//     .attr("height", function (d) {return barInnerHeight - baryScale(d[baryColumn])})
// }
//
// function barType(d){
//   d.year = +d.year;
//   d.budget = +d.budget;
//   return d;
// }


// function calls to create graphs

// d3.csv("../data/project_data.csv", scatterType, scatterRender)

d3.csv("../data/project_data.csv", scatterChart.scatterType, scatterChart.scatterRender)

// d3.csv("../data/yearOnYear.csv", barType, barRender)

d3.csv("../data/yearOnYear.csv", barChart.barType, barChart.barRender)
