var data = [1, 2, 3, 4, 5]

var scale = d3.scale.linear()
  .domain([1, 5])
  .range([0, 200])


var svg1 = d3.select("#one").append("svg")
  .attr("width", 300)
  .attr("height", 300)
  .attr("class", "boxy")
  .attr("id", "svg1")

var svg2 = d3.select("#two").append("svg")
  .attr("width", 300)
  .attr("height", 300)
  .attr("class", "boxy")
  .attr("id", "svg2")

var rect1 = svg1.append("rect")
  .attr("x", 150)
  .attr("y", 150)
  .attr("width", 100)
  .attr("height", 100)
  .attr("fill", "red")

var rect2 = svg2.append("rect")
  .attr("x", 150)
  .attr("y", 150)
  .attr("width", 100)
  .attr("height", 100)
  .attr("fill", "red")

svg2.selectAll("rect")
  .data(data)
  .enter().append("rect")
  .attr("x", scale)
  .attr("y", 50)
  .attr("width", 20)
  .attr("height", 20)
