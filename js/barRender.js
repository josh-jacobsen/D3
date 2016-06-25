module.exports = {
  barRender: barRender
}


function barRender(data) {
  barxScale.domain(     data.map(function (d) {return d[barxColumn]; }));
  baryScale.domain([0, d3.max(data, function (d) { return d[baryColumn]; } )]);

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
}
