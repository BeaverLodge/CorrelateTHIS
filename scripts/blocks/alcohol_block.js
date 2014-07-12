ko.bindingHandlers.alcoholBlock = {
  init: function (element, valueAccessor) {
    var svg = d3.select(element)
      .append("svg")
      .classed("block", true)
      .classed("alcohol", true);

    svg.append("rect")
       .classed("background", true)
       .attr("height", 180)
       .attr("width", 800)
       .attr("fill", "#5C3B5F");
  },
  update: function (element, valueAccessor) {
    var value = ko.unwrap(valueAccessor());
    var diff = Math.abs(value.populationAMean - value.populationBMean);
    var data = [];
    var glassData = [];
    for (var i = 0; i < Math.floor(diff); i++) {
      data.push(1);
      glassData.push(1);
    }
    if (diff - Math.floor(diff) > 0) {
      data.push(diff - Math.floor(diff));
      glassData.push(1);
    }
    
    var msDelay = 500;
    var glassHeight = 80;
    var glassWidth = 50;
    var svg = d3.select(element).select("svg");

    var cups = svg.selectAll(".glass")
      .data(glassData);

    cups.enter()
      .append("rect")
      .attr("class", "glass")
      .attr('fill', '#ffffff')
      .attr('stroke', '#dbc5c5')
      .attr('stroke-width', 4)
      .attr("width", glassWidth)
      .attr("height", glassHeight)
      .attr("x", function(d, i) { return i * glassWidth; } );

    var contents = svg.selectAll(".contents")
      .data(data);
      
    contents.enter()
      .append("rect")
      .attr("class", "contents")
      .attr("x", function(d, i) { return i * glassWidth + 4; } )
      .attr("y", glassHeight - 8)
      .attr("width", glassWidth - 8)
      .attr("height", 0)
      .attr("fill", '#ff7f00');

    contents
      .transition()
      .delay(function(d, i) { return i * msDelay; })
      .attr("y", function(d) { return glassHeight - d * glassHeight; } )
      .attr("height", function(d) { return d * glassHeight; } );

    contents.exit()
      .transition()
      .attr("y", glassHeight - 8)
      .attr("height", 0)
      .remove();
  }
};















