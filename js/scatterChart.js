
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
