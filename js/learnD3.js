var scatterChart = require('./scatterChart');
var barChart = require('./barChart');
var horizontalBar = require('./horizontalBar');


d3.csv("../data/project_data.csv", scatterChart.scatterType, scatterChart.scatterRender)

d3.csv("../data/yearOnYear.csv", barChart.barType, barChart.barRender)

d3.csv("../data/yearOnYear.csv", horizontalBar.horizontalType, horizontalBar.horizontalRender)
