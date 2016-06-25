
// set variables for scatter chart

var scatterWidth = 1000;
var scatterHeight = 500;

var scatterMargin = {top: 10, bottom: 70, left: 10, right: 10}

var scatterInnerWidth = scatterWidth - scatterMargin.left - scatterMargin.right;
var scatterInnerHeight = scatterHeight - scatterMargin.top - scatterMargin.bottom;

var scatterrMin = 1;
var scatterrMax = 20;
var scatterxColumn = "time_weeks";
var scatteryColumn = "percent_complete";
var scatterrColumn = "project_cost"
var scattercolorColumn = "category"
var scatterXAxisLabelOffset = 55;
var scatterXAxisLabelText = "Time (Weeks)"

// define scatter SVG
var scatterSvg = d3.select(".scatter").append("svg")
  .attr("width", scatterWidth)
  .attr("height", scatterHeight)
  .attr("id", "scatter")

// create group of circles to transform and translate
var scatterG = scatterSvg.append("g")
  .attr("transform", "translate(" + scatterMargin.left + "," + scatterMargin.top + ")");

var scatterXAxisGroup = scatterG.append("g")
  .attr("transform", "translate(0," + scatterInnerHeight + ")")

var scatterXAxisLabel = scatterXAxisGroup.append("text")
  .style("text-anchor", "middle")
  .attr("transform", "translate(" + (scatterInnerWidth / 2) + "," + scatterXAxisLabelOffset + ")")
  .attr("class", "label")
  .text(scatterXAxisLabelText);


var scatterxScale = d3.scale.linear().range([0, scatterInnerWidth])
var scatteryScale = d3.scale.linear().range([scatterInnerHeight, 0])
var scatterrScale = d3.scale.linear().range([scatterrMin, scatterrMax])
var scatterColorScale = d3.scale.category10();

var scatterXAxis = d3.svg.axis().scale(scatterxScale).orient("bottom");

// render the scatter graph
function scatterRender(data) {
    scatterxScale.domain(d3.extent(data, function (d) {return d[scatterxColumn] }))
    scatteryScale.domain(d3.extent(data, function (d) {return d[scatteryColumn] }))
    scatterrScale.domain(d3.extent(data, function (d) {return d[scatterrColumn]}))

    // Call axeies
    scatterXAxisGroup.call(scatterXAxis)

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
