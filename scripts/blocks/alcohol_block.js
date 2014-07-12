ko.bindingHandlers.alcoholBlock = {
  init: function (element, valueAccessor) {
    d3.select(element)
      .append("svg")
      .classed("block", true);
  },
  update: function (element, valueAccessor) {
    var value = ko.unwrap(valueAccessor());
    var diff = Math.abs(value.populationAMean - value.populationBMean);
    var data = [];

    for (var i = 0; i < Math.floor(diff); i++) {
      data.push(1);
    }

    if (diff - Math.floor(diff) > 0) {
      data.push(diff - Math.floor(diff));
    }
    
    svg = d3.select(element).select("svg");
    var updater = svg.selectAll(".cup")
     .data(data);

    updater.enter()
      .append("rect")
      .attr("x", function(d, i) { return i * 70; } )
      .attr("y", 80)
      .attr("width", 50)
      .attr("height", 0)
      .attr("class", "cup");

    updater
      .transition()
      .delay(function(d, i) { return i * 500; })
      .attr("y", function(d) { return 80 - d * 80; } )
      .attr("height", function(d) { return d * 80; } );

    updater.exit()
      .transition()
      .attr("y", 80)
      .attr("height", 0)
      .remove();
  }
};




