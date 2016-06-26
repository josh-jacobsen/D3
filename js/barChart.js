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
