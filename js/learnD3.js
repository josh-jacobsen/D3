var scatterWidth = 500;
var scatterHeight = 600;
var rMin = 5;
var rMax = 20;
var xColumn = "time_weeks";
var yColumn = "percent_complete";
var rColumn = "project_cost"
var colorColumn = "category"

var scatterSvg = d3.select(".scatter").append("svg")
  .attr("width", scatterWidth)
  .attr("height", scatterHeight)
  .attr("id", "scatter")

var xScale = d3.scale.linear().range([0, scatterWidth])
var yScale = d3.scale.linear().range([scatterHeight, 0])
var rScale = d3.scale.linear().range([rMin, rMax])
var colorScale = d3.scale.category10();


function render(data) {

    xScale.domain(d3.extent(data, function (d) {return d[xColumn] }))
    yScale.domain(d3.extent(data, function (d) {return d[yColumn] }))
    rScale.domain(d3.extent(data, function (d) {return d[rColumn]}))

    console.log(data);
    // Bind data
    var circles = scatterSvg.selectAll("circle").data(data)

    //Enter
    circles.enter().append("circle");

    //Update
    circles
      .attr("cx", function (d) {return xScale(d.time_weeks);})
      .attr("cy", function (d) {return yScale(d.percent_complete);})
      .attr("r", function (d) {return rScale(d.project_cost);})

    //Exit
    circles.exit.remove();
};

function type(d) {
  d.percent_complete = Number(d.percent_complete);
  d.project_cost = Number(d.project_cost)
  d.time_weeks = Number(d.time_weeks)
  return d
};

d3.csv("../data/project_data.csv", type, render)
