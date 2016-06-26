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
