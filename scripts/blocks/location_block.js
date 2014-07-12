ko.bindingHandlers.locationBlock = {
  init: function (element, valueAccessor) {
    d3.select(element)
      .append("svg")
      .classed("block", true);
  },
  update: function (element, valueAccessor) {
    var value = ko.unwrap(valueAccessor());
    var message = "";

    var diff = Math.round(value.populationAMean - value.populationBMean);
    var absDiff = Math.abs(diff);

    if (diff <= 0 ) {
      message = "you live " + absDiff + "km closer to the city"
    } else {
      message = "you live " + absDiff + "km further away from the city"
    }

    svg = d3.select(element).select("svg");

    var textUpdater = svg.selectAll(".block-message")
      .data([absDiff]);

    textUpdater.enter()
      .append("text")
       .attr("x", 400)
       .attr("y", 130)
       .attr("class", "block-message")
       .text(message);

    textUpdater
      .transition()
      .text(message);

    textUpdater.exit()
      .transition()
      .text()
      .remove();

    var updater = svg.selectAll(".road")
      .data([absDiff]);

    updater.enter()
      .append("rect")
        .attr("x", 30)
        .attr("y", 80)
        .attr("width", 0)
        .attr("height", 20)
        .attr("class", "road")
        .attr("background", "black");

    updater
      .transition()
      .attr("width", function(d) { return d * 30; } );

    updater.exit()
        .transition()
        .attr("width", 0)
        .remove();

  }
};
