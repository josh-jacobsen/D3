// var d3 = require("d3"),
//     jsdom = require("jsdom");
//
// var document = jsdom.jsdom(),
//     svg = d3.select(document.body).append("svg");

var mySvg = d3.select(".main").append("svg")
  .attr("width", 450)
  .attr("height", 450)
  .attr("id", "mySvg")

var myRect = mySvg.append("rect")
  .attr("width", 70)
  .attr("height", 70)
  .attr("x", 50)
  .attr("y", 170)
  .attr("fill", "red")
  .attr("stroke", "green")
  .attr("stroke-width", 10)

var myData = [1, 2, 3, 4, 5, 6, 7]

var myScale = d3.scale.linear()
  .domain([1, 8])
  .range([110, 300])

mySvg.selectAll("rect")
  .data(myData)
  .enter().append("rect")
  .attr("x", myScale)
  // .attr("x", function (d) {return myScale(d); })
  .attr("y", 50)
  .attr("width", 20)
  .attr("height", 20)


function render(data) {
  console.log(data);

};

function type(d) {
  return d
};



var scatterSvg = d3.select(".scatter").append("svg")
  .attr("width", outerWidth)
  .attr("height", outerHeight)



d3.csv("../data/petals.csv", type, render)
