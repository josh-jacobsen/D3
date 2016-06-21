// var d3 = require("d3"),
//     jsdom = require("jsdom");
//
// var document = jsdom.jsdom(),
//     svg = d3.select(document.body).append("svg");

// var mySvg = d3.select(".main").append("svg")
//   .attr("width", 450)
//   .attr("height", 450)
//   .attr("id", "mySvg")
//
// var myRect = mySvg.append("rect")
//   .attr("width", 70)
//   .attr("height", 70)
//   .attr("x", 50)
//   .attr("y", 170)
//   .attr("fill", "red")
//   .attr("stroke", "green")
//   .attr("stroke-width", 10)
//
// var myData = [1, 2, 3, 4, 5, 6, 7]
//
// var myScale = d3.scale.linear()
//   .domain([1, 8])
//   .range([110, 300])

// mySvg.selectAll("rect")
//   .data(myData)
//   .enter().append("rect")
//   .attr("x", myScale)
//   // .attr("x", function (d) {return myScale(d); })
//   .attr("y", 50)
//   .attr("width", 20)
//   .attr("height", 20)
//

// var svg = d3.select(".main").append("svg")
//   .attr("width", 600)
//   .attr("height", 600)
//   .attr("id", "mySvg")

var outerWidth = 500;
var outerHeight = 600;
var circleRadius = 7;

var scatterSvg = d3.select(".scatter").append("svg")
  .attr("width", outerWidth)
  .attr("height", outerHeight)
  .attr("id", "scatter")

var xScale = d3.scale.linear().range([0, outerWidth])
var yScale = d3.scale.linear().range([outerHeight, 0])


function render(data) {
    // var projectLength = d3.extent(data, function (d) {return d.time_weeks})
    // var percentComplete = d3.extent(data, function (d) {return d.percent_complete})
    // console.log("project length", projectLength,"percent complete", percentComplete);

    xScale.domain(d3.extent(data, function (d) {return d.time_weeks; }))
    yScale.domain(d3.extent(data, function (d) {return d.percent_complete; }))

    console.log(data);
    // Bind data
    var circles = scatterSvg.selectAll("circle").data(data)

    //Enter
    circles.enter().append("circle")
      .attr("r", circleRadius)

    //Update
    circles
      .attr("cx", function (d) {return xScale(d.time_weeks);})
      .attr("cy", function (d) {return yScale(d.percent_complete);})

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

// d3.csv("../data/project_data.csv", type, function (data) {
//   var projectLength = d3.extent(data, function (d) {return d.time_weeks})
//   var percentComplete = d3.extent(data, function (d) {return d.percent_complete})
//   console.log("project length", projectLength,"percent complete", percentComplete);
// })
