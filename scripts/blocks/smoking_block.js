ko.bindingHandlers.smokingBlock = {
  init: function (element, valueAccessor) {
    d3.select(element)
      .append("svg")
      .attr("width", 400)
      .attr("height", 200);
  },
  update: function (element, valueAccessor) {
    var value = ko.unwrap(valueAccessor());

    var diff = Math.abs(value.populationAMean - value.populationBMean);

    var data = [];
    for (var i = 0; i < Math.floor(diff); i++)
      data.push(1);
    if (diff - Math.floor(diff) > 0)
      data.push(diff - Math.floor(diff));

    svg = d3.select(element).select("svg");
    svg.style("background", "red");

    var updater = svg.selectAll(".cups")
       .data(data);
    
    updater.enter()
      .append("rect")
      .attr("x", function(d, i) { return i * 15; } )
      .attr("y", 10)
      .attr("width", 10)
      .attr("height", 0)
      .attr("class", "cups")
      .attr("background", "pink");

    updater
      .transition()
      .delay(function(d, i) { return i * 500; })
      .attr("y", function(d) { return 10 - d * 10; } )
      .attr("height", function(d) { return d * 10; } );

    updater.exit()
        .transition()
        .attr("y", 10)
        .attr("height", 0)
        .remove();
  }
};